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
