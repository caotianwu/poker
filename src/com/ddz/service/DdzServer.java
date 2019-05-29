package com.ddz.service;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class DdzServer {
	public static int STATUS_WAIT=0;
	public static int STATUS_READY=1;
	public static int STATUS_STARTED=2;
	public static int STATUS_QIANG=3;
	public static int STATUS_PLAYING=4;
	public static int STATUS_BREAK=5;
	public static int STATUS_OVER=6;
	//一副扑克牌
	private List<Card> poker;
	//底牌
	private List<Card> remainCards;
	//玩家列表
	private Player[] players;
	//游戏状态：等待、开始、抢地主、打牌、中断、结束
	private int status;
	//当前玩家ID（正在操作的）
	private int currentPlayerId;
	//地主ID
	private int dzId;
	//本局分数
	private int score;
	//上次出牌选手
	private int oldShowId;
	/*
	 * 所出牌的规则和值，格式：等级:类型:值
	 * 其中类型代码解释如下
	 * a单张(1)，b顺(5-)
	 * c对(2)，d双顺(6-)
	 * e三张(3)，f三带对(5)，g三带单(4)
	 * h三顺2(6)，i三顺2带单(8)，j三顺2带双(10)
	 * k三顺3(9)，l三顺3带单(12)，m三顺3带双(15)
	 * n三顺4(12)，o三顺4带单(16)，p三顺4带双(20)
	 * q三顺5(15)，r三顺5带单(20)
	 * s四带单(6)，t四带双(8)
	 * u四炸(4)，v双王(2)
	 */
	private String showType;
	public DdzServer(){
		initPlayers();
		status=STATUS_WAIT;
		currentPlayerId=0;
		this.dzId = -1;
	}
	private void initPlayers() {
		players = new Player[3];
	}
	//初始化扑克牌
	private void initPoker(){
		poker = new LinkedList<Card>();
		for(int j=0;j<4;j++){
			for(int i=1;i<=13;i++){
				int level = i<3?1:0;
				Card c = new Card(i,j,level,j+""+i+".jpg");
				poker.add(c);
			}
		}
		poker.add(new Card(1,Card.TYPE_WANG,2,"41.jpg"));
		poker.add(new Card(2,Card.TYPE_WANG,2,"42.jpg"));
	}
	//用户加入游戏
	public boolean addPlayer(Player p){
		boolean res = false;
		if(status!=STATUS_WAIT){
			return false;
		}
		for(int i=0;i<players.length;i++){
			if(players[i]==null){
				players[i]=p;
				p.setId(i);
				res=true;
				break;
			}
		}
		if(res){
			if(players[0]!=null&&
					players[1]!=null&&
					players[2]!=null){
				players[this.currentPlayerId].setTurn(true);
				this.status = DdzServer.STATUS_READY;
			}
		}
		return res;
	}
	//退出游戏
	public boolean out(int id){
		players[id]=null;
		if(this.status>=DdzServer.STATUS_STARTED&&
				this.status<DdzServer.STATUS_BREAK){
			this.status=DdzServer.STATUS_BREAK;
		}else{
			this.status = DdzServer.STATUS_WAIT; 
		}
		return true;
	}
	//开始游戏
	public boolean start(){
		if(this.status!=STATUS_READY&&this.status!=DdzServer.STATUS_OVER){
			return false;
		}
		for(int i=0;i<players.length;i++){
			if(players[i]==null){
				return false;
			}
		}
		this.init();
		Collections.shuffle(poker);
		this.players[0].setCards(Collections.synchronizedList(this.getSubList(poker,0, 17)));
		this.players[1].setCards(Collections.synchronizedList(this.getSubList(poker,17, 34)));
		this.players[2].setCards(Collections.synchronizedList(this.getSubList(poker,34, 51)));
		Collections.sort(this.players[0].getCards());
		Collections.reverse(this.players[0].getCards());
		Collections.sort(this.players[1].getCards());
		Collections.reverse(this.players[1].getCards());
		Collections.sort(this.players[2].getCards());
		Collections.reverse(this.players[2].getCards());
		this.remainCards = Collections.synchronizedList(this.getSubList(poker,51, 54));
		this.status=DdzServer.STATUS_QIANG;
		return true;
	}
	private void init() {
		this.initPoker();
		score=0;
		dzId=-1;
	}
	//轮换
	public void turn(){
		this.players[currentPlayerId].setTurn(false);
		this.currentPlayerId = (this.currentPlayerId+1)%3;
		this.players[currentPlayerId].setTurn(true);
	}
	//抢地主
	public void qiang(int id,int score){
		if(this.status!=DdzServer.STATUS_QIANG){
			return;
		}
		if(score==0){
			turn();
		}else if(score>this.score&&score!=3){
			this.score=score;
			this.dzId=id;
			turn();
		}else{
			dzId=id;
		}
		if(this.currentPlayerId==dzId){
			this.status=DdzServer.STATUS_PLAYING;
			List<Card> l =this.players[dzId].getCards(); 
			l.addAll(this.remainCards);
			Collections.sort(l);
			Collections.reverse(l);
			this.oldShowId=dzId;
		}
	}
	//出牌
	public void show(int playerId,String strCards){
		if(this.oldShowId==playerId){
			for(int i=0;i<this.players.length;i++){
				players[i].setCurrentShow(null);
			}
		}
		int indexOfSplit = strCards.indexOf('#');
		this.showType = strCards.substring(indexOfSplit+1);
		this.players[playerId].show(strCards.substring(0,indexOfSplit));
		if(players[playerId].getCards().size()==0){
			this.status = DdzServer.STATUS_OVER;
			return;
		}
		this.oldShowId = playerId;
		turn();
	}
	//不出
	public void pass() {
		this.players[currentPlayerId].setCurrentShow(null);
		turn();
	}
	
	public void showMessage(String message, Integer id) {
		this.players[id].setMessage(message);
	}
	public <T> List<T> getSubList(List<T> list,int start,int end){
		List<T> subList = new LinkedList<T>();
		for(int i=start;i<end;i++){
			subList.add(list.get(i));
		}
		return subList;
	}
	
	
	
	
	
	
	
	public String getShowType() {
		return showType;
	}
	public int getDzId() {
		return dzId;
	}
	public void setDzId(int dzId) {
		this.dzId = dzId;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public List<Card> getRemainCards() {
		return remainCards;
	}
	public void setRemainCards(List<Card> remainCards) {
		this.remainCards = remainCards;
	}
	public Player[] getPlayers() {
		return players;
	}
	public void setPlayers(Player[] players) {
		this.players = players;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	public int getOldShowId() {
		return oldShowId;
	}
	public int getCurrentPlayerId() {
		return currentPlayerId;
	}
	public void setCurrentPlayerId(int currentPlayerId) {
		this.currentPlayerId = currentPlayerId;
	}
//	public void delay(TimerTask tt){
//		Timer t = new Timer();
//		t.schedule(tt, 10000);
//	}
	
	
}
