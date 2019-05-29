package com.ddz.service;

import java.util.ArrayList;
import java.util.List;
/*
 * 玩家对象
 */
public class Player {
	//随机ID
	private Integer id;
	//用户昵称
	private String name;
	//拥有的牌
	private List<Card> cards;
	//上把打出的牌
	private List<Card> currentShow;
	//发送的消息信息
	private String message;
	//是否轮到当前玩家出牌
	private Boolean turn;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<Card> getCurrentShow() {
		return currentShow;
	}
	public void setCurrentShow(List<Card> currentShow) {
		this.currentShow = currentShow;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public Boolean getTurn() {
		return turn;
	}
	public void setTurn(Boolean turn) {
		this.turn = turn;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Card> getCards() {
		return cards;
	}
	public void setCards(List<Card> cards) {
		this.cards = cards;
	}
	/*
	 * 出牌，牌与牌之间用';'隔开
	 * 每张牌有两部分组成，用':'分割
	 * 前面是花色，后面是值
	 */
	public void show(String strCards){
		String[] strCardsArray = strCards.split(":");
		List<Card> cardsShow = new ArrayList<Card>();
		int length = strCardsArray.length;
		for(int i=0;i<length;i++){
			int index = Integer.valueOf(strCardsArray[length-i-1]);
			cardsShow.add(cards.remove(index));
		}
		this.currentShow = cardsShow;
	}
}
