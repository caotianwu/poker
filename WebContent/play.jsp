<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
    <base id="base" href="<%=basePath%>">
    <title>在线斗地主</title>
	
<style type="text/css">
<!--
#remainCard {
	position:absolute;
	left:364px;
	top:19px;
	width:320px;
	height:114px;
	z-index:1;
}
-->
</style>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/rules.js"></script>
<script type="text/javascript" src="js/ddz.js"></script>
<script type="text/javascript">
	document.onmouseup=function(event){
		if(!event){
		event=window.event;
		}
		if(event.button==2){
			document.oncontextmenu=function(){return false;};
			return;
		}
	}
	window.onload=function(){
		setUrl($("base").href+"ddz");
		setInterval("checkData()",2000);
	}
</script>
  </head>
  
  <body>
<div id="remainCard" align="center"></div>
<table width="1015" border="1" cellpadding="0" cellspacing="0">
  <!--DWLayoutTable-->
  <tr>
    <td width="509" height="325" valign="top">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <!--DWLayoutTable-->
      <tr>
        <td height="125" colspan="2" valign="top" align="right"><div style="color:red" id="frontMessage"></div></td>
        <td width="158">&nbsp;</td>
        </tr>
      
      <tr>
        <td width="108" height="150" valign="top">
        	<div id="frontName"></div>
          <div id="frontRemainCount"></div>
         </td>
        <td colspan="2" valign="top">
        	<div id="frontShow" style="width:175" align="left"></div>
        </td>
      </tr>
      
      <tr>
        <td height="50" valign="top"><div id="frontDz"></div></td>
        <td colspan="2" valign="top"><!--DWLayoutEmptyCell-->&nbsp;</td>
      </tr>
      <tr>
        <td height="1"></td>
        <td width="243"></td>
        <td></td>
        </tr>
      
      
      
    </table>    </td>
    <td width="506" valign="top">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <!--DWLayoutTable-->
      <tr>
        <td width="166" height="124">&nbsp;</td>
        <td colspan="2" valign="top"><div style="color:red" id="nextMessage"></div></td>
      </tr>
      <tr>
        <td height="153" colspan="2" align="right" valign="top">
        <div id="nextShow" style="width:165" align="right"></div></td>
        <td width="108" valign="top" align="right">
        <div id="nextName"></div>
			<div id="nextRemainCount"></div>
		</td>
      </tr>
      <tr>
        <td height="48" colspan="2" valign="top"><!--DWLayoutEmptyCell-->&nbsp;</td>
        <td valign="top"><div id="nextDz"></div></td>
      </tr>
      <tr>
        <td height="1"></td>
        <td width="165"></td>
        <td></td>
      </tr>
      
    </table>
    </td>
  </tr>
  <tr>
    <td height="275" colspan="2" valign="top">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <!--DWLayoutTable-->
      <tr>
        <td width="108" height="140" valign="top"><div id="myName"><%=p.getName() %></div></td>
        <td width="615" align="center" valign="top">
        	<div id="myShow" style="width:615;" align="center"></div>
        </td>
        <td width="292" valign="top"><div style="color:red" id="myMessage"></div></td>
      </tr>
      <tr>
        <td height="135" valign="bottom"><div id="myDz"></div></td>
        <td align="right" valign="bottom">
        	<div style="width:615;" align="right" id="myCard" onmouseup="cardClick()" onclick="check()">
        	</div></td>
        <td valign="top">
        <div id="buttons" align="center">
          <label>
          <input id="btn0" type="button" value="不叫" onclick="pass()" disabled/>
          </label>
		  &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
          <input id="btn1" type="button" value="1分" onclick="get(1)" disabled/>
          </label>
		  &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
           <input id="btn2" type="button" value="2分" onclick="get(2)" disabled/>
          </label>
		  &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
           <input id="btn3" type="button" value="3分" onclick="get(3)" disabled/>
          </label>
          <p>
            <label>
            <input id="btnStart" type="button" value="开始" onclick="doStart()" disabled/>
            </label>
		  &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
             <input id="btnPass" type="button" value="不出" onclick="pass()" disabled/>
            </label>
		  &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
             <input id="btnShow" type="button" value="出牌" onclick="show()" disabled/>
            </label>
          </p>
        </div>
          <div>
		  消息：<br />
		  <input type="text" id="msg"><button onclick="message($('msg').value)">发送消息</button>
		  </div></td>
      </tr>
      
      
      
    </table>    </td>
  </tr>
</table>
</body>
</html>