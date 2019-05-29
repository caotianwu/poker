package com.ddz.service;

public class Card implements Comparable{
	
	public static final int TYPE_FANGBAN=0;
	public static final int TYPE_MEIHUA=1;
	public static final int TYPE_HONGTAO=2;
	public static final int TYPE_HEITAO=3;
	public static final int TYPE_WANG=4;
	public static final int LEVEL_PUTONG=0;
	public static final int LEVEL_HUI=0;
	public static final int LEVEL_WANG=0;
	private int value;
	private int type;
	private int level;
	public Card(){
		this.level=0;
	}
	public Card(int value,int type,int level,String image){
		this.setValue(value);
		this.setLevel(level);
		this.setType(type);
		this.setImage(image);
	}
	public Card(int value,int type){
		this(value,type,0,null);
	}
	public Card(int value,int type,String image){
		this(value,type,0,image);
	}
	private String image;
	public int getValue() {
		return this.level*13+this.value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + type;
		result = prime * result + value;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Card other = (Card) obj;
		if (type != other.type)
			return false;
		if (value != other.value)
			return false;
		return true;
	}
	public static void main(String...args){
		Card c = new Card();
		c.setLevel(Card.LEVEL_PUTONG);
		c.setValue(7);
		c.setType(TYPE_HEITAO);
		System.out.println(c.toString());
	}
	@Override
	public int compareTo(Object o) {
		if(!(o instanceof Card)){
			return -1;
		}
		Card c = (Card)o;
		return ((this.level*13+this.value)*4+this.type)-
				((c.level*13+c.value)*4+c.type);
	}
}


