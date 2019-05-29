package com.ddz.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ddz.service.DdzServer;
import com.ddz.service.Player;

public class AddServlet extends HttpServlet {
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		DdzServer ds = (DdzServer)this.getServletContext().getAttribute("server");
		if(ds.getStatus()==DdzServer.STATUS_WAIT){
			String name = request.getParameter("name");
			if(name!=null&&!"".equals(name)){
				Player p = new Player();
				p.setName(name);
				request.getSession().setAttribute("player", p);
				if(ds.addPlayer(p)){
					response.sendRedirect("play.jsp");
				}
			}else{
				out.println("<script>alert('请输入用户名');history.go(-1)</script>");
			}
		} else{
			out.println("<script>alert('本桌人已满');history.go(-1)</script>");
		}
	}
}