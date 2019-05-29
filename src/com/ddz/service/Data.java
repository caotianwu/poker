package com.ddz.service;

import java.util.List;
/**
 * JSon对应的实体对象，用作响应客户端
 * @author admin
 *
 */
public class Data {
	//当前玩家
	private Player currentPlayer;
	//上家
	private Player frontPlayer;
	//下家
	private Player nextPlayer;
	//底牌
	private List<Card> remainCards;
	//游戏状态：等待、开始、抢地主、打牌、中断、结束
	private int serverStatus;
	//本局分数
	private int score;
	//系统消息
	private String sysMessage;
	//该出牌的玩家ID
	private int turnId;
	//地主对应的玩家ID
	private int dzId;
	//上次出牌类型和值
	private String showType;
	//上次出牌玩家ID
	private int oldShowId;
	public String getShowType() {
		return showType;
	}
	public void setShowType(String showType) {
		this.showType = showType;
	}
	public int getDzId() {
		return dzId;
	}
	public void setDzId(int dzId) {
		this.dzId = dzId;
	}
	public int getTurnId() {
		return turnId;
	}
	public void setTurnId(int turnId) {
		this.turnId = turnId;
	}
	public Player getCurrentPlayer() {
		return currentPlayer;
	}
	public void setCurrentPlayer(Player currentPlayer) {
		this.currentPlayer = currentPlayer;
	}
	public Player getFrontPlayer() {
		return frontPlayer;
	}
	public void setFrontPlayer(Player frontPlayer) {
		this.frontPlayer = frontPlayer;
	}
	public Player getNextPlayer() {
		return nextPlayer;
	}
	public void setNextPlayer(Player nextPlayer) {
		this.nextPlayer = nextPlayer;
	}
	public List<Card> getRemainCards() {
		return remainCards;
	}
	public void setRemainCards(List<Card> remainCards) {
		this.remainCards = remainCards;
	}
	public int getServerStatus() {
		return serverStatus;
	}
	public void setServerStatus(int serverStatus) {
		this.serverStatus = serverStatus;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public String getSysMessage() {
		return sysMessage;
	}
	public void setSysMessage(String sysMessage) {
		this.sysMessage = sysMessage;
	}
	public int getOldShowId() {
		return oldShowId;
	}
	public void setOldShowId(int oldShowId) {
		this.oldShowId = oldShowId;
	}
	
}
