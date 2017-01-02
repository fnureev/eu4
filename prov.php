<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Income</title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" media="screen" href="/css/main.css">
	<script src="/js/jquery-1.5.min.js" language="JavaScript" type="text/javascript"></script> 
	<script src="income.js" language="JavaScript" type="text/javascript"></script> 
	<script src="scripts.js" language="JavaScript" type="text/javascript"></script> 
<script>
$().ready(function()  
{
	summ();
});
</script>
</head>
<body>
<div>
	<font>Base:</font><BR>
	<font>BT:</font> <input type="text" id="bt" value="15" size="1" onChange="summ();"><BR>
	<font>Cost:</font> <input type="text" id="cost" value="2" size="1" onChange="summ();"><bR>
</div>
<div>
	<font>TP:</font><BR>
	<font>Mine:</font> <input type="text" id="tp1" value="0" size="1" onChange="summ();"><BR>
	<font>TRs:</font> <input type="text" id="tp2" value="50" size="1" onChange="summ();"><BR>
</div>

<div>
	<font>Efficiency:</font><BR>
	<font>Tax:</font> <input type="text" id="e1" value="100" size="1" onChange="summ();"><BR>
	<font>Prod:</font> <input type="text" id="e2" value="100" size="1" onChange="summ();"><BR>
	<font>Trade:</font> <input type="text" id="e3" value="100" size="1" onChange="summ();"><BR>
</div>

<div>
	<font>Var:</font><BR>
	<font>Bonus:</font> <input type="text" id="bonus" value="0" size="1" onChange="summ();"><BR>
	<font>TV:</font> <input type="text" id="tv" value="0" size="1" onChange="summ();"><BR>
	<font>Prod:</font> <input type="text" id="pr" value="0" size="1" onChange="summ();"><BR>
</div>

<div>
	<font>Income:</font><BR>
	<font>Tax:</font> <input type="text" id="tax" value="0" size="1" onChange="summ();"><BR>
	<font>Prod:</font> <input type="text" id="prod" value="0" size="1" onChange="summ();"><BR>
	<font>Trade:</font> <input type="text" id="trade" value="0" size="1" onChange="summ();"><BR>
	<font>Summ:</font> <input type="text" id="summ" value="0" size="1" onChange="summ();"><BR>
</div>


<style>
#units td:not(:first-child)
	{ border-left: 1px solid black; }
div font
	{ float: left; height: 16px;}
div input 
	{ border-bottom: 1px solid #ccc; text-align: right; float: right; height: 16px; }
td
	{ text-align :center; }
div 
	{ width: 130px; border: 1px solid #ccc; padding: 5px; float: left; margin-left: 4px; }

</style>
</body>
</html>

