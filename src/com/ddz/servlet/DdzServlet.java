package com.ddz.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.gaoxs.ajax.util.Object2Json;

import com.ddz.service.Data;
import com.ddz.service.DdzServer;
import com.ddz.service.Player;

public class DdzServlet extends HttpServlet {
	
	public DdzServlet() {
		super();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		Player p = (Player)request.getSession().getAttribute("player");
		PrintWriter out = response.getWriter();
		Data data = new Data();
		if(p==null){
			data.setSysMessage("你没有登录，或者你的会话已经结束请重新登录");
			String res = new Object2Json().getJsonString(data);
			out.print(res);
			out.close();
			return;
		}
		String op = request.getParameter("op");
		DdzServer ds = (DdzServer)this.getServletContext().getAttribute("server");
		if("start".equals(op)){			//开始游戏
			if(!ds.start()){
				data.setSysMessage("游戏开始失败，人数不足");
			}
			System.out.println(p.getName()+"  start");
		}else if("out".equals(op)){		//退出游戏
			int id = p.getId();
			ds.out(id);
			request.getSession().invalidate();
			out.print("null");
			System.out.println(p.getName()+"  out");
			return;
		}else if("message".equals(op)){	//发送消息
			String message = request.getParameter("message");
			ds.showMessage(message,p.getId());
			System.out.println(p.getName()+"  message"+message);
		}else if("show".equals(op)){	//出牌
			String strCards = request.getParameter("cards");
			ds.show(p.getId(), strCards);
			System.out.println(p.getName()+"  show  "+strCards);
		}else if("get".equals(op)){		//抢地主
			String strScore = request.getParameter("score");
			int score = Integer.parseInt(strScore);
			ds.qiang(p.getId(), score);
			System.out.println(p.getName()+"  get");
		}else if("pass".equals(op)){	//不出牌
			ds.pass();
			System.out.println(p.getName()+"  pass");
		}
		data.setServerStatus(ds.getStatus());
		data.setCurrentPlayer(p);
		data.setNextPlayer(ds.getPlayers()[(p.getId()+1)%3]);
		data.setFrontPlayer(ds.getPlayers()[(p.getId()+2)%3]);
		data.setRemainCards(ds.getRemainCards());
		data.setDzId(ds.getDzId());
		data.setTurnId(ds.getCurrentPlayerId());
		data.setScore(ds.getScore());
		data.setShowType(ds.getShowType());
		data.setOldShowId(ds.getOldShowId());
		String res = new Object2Json().getJsonString(data);
		out.print(res);
		out.close();
		
	}

	public void init() throws ServletException {
//		DdzServer[] tables = new DdzServer[20];
//		for(int i=0;i<tables.length;i++){
//			DdzServer ds = new DdzServer();
//			tables[i]=ds;
//		}
//		this.getServletContext().setAttribute("server",tables);
		DdzServer ds = new DdzServer();
		this.getServletContext().setAttribute("server", ds);
		
	}
}
