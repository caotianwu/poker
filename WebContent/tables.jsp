<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.ddz.service.Player"%>
<%
Player p = (Player)session.getAttribute("player");
if(p==null){
	response.sendRedirect("index.jsp");
	return;
}
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'tables.jsp' starting page</title>
  </head>
  
  <body>
	<table>
		
	</table>
  </body>
</html>
