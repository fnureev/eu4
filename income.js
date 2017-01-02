function summ()
{
	tr_bonus = $('#tp2').val()*1;

	produc = ($('#bt').val()*20+10+tr_bonus)/100;
	tv = $('#cost').val()*produc;

	tax = $('#bt').val()*$('#e1').val()/100;
	prod = tv*(1+$('#e2').val()/100);
	trade = prod*$('#e3').val()/100*$('#tp1').val()/100;

	$('#pr').val(produc.toFixed(2));
	$('#tv').val(tv.toFixed(2));
	$('#bonus').val(tr_bonus.toFixed(2));

	$('#tax').val(tax.toFixed(2));
	$('#prod').val(prod.toFixed(2));
	$('#trade').val(trade.toFixed(2));
	$('#summ').val((tax+prod+trade).toFixed(2));
}


/*
<?
$bn = 15; //Базовый налог
$t = 100; //Доля республики
$gp = ($bn*20+10+$t)/100; //производство товара
$c = 2; //стоимость товара
$tv = $c*$gp; //торговая ценность
$pe = 1; //эффективность производства
$te = 0.5; //эффективность торговли

$tax = $bn; //доход с налогов
$prod = $tv*$pe; //доход с производства
$trade = $prod*$te*(1-$t/100); //доход с торговли
$sum = $tax+$prod+$trade;

$rte = 1.8;
$rtrade = $prod*$rte*($t/100);

echo "Tax $tax<br>
Production $prod<br>
Trade $trade<br>
Sum $sum<br>
<br>
<br>
Resp trade $rtrade";
?>
*/
