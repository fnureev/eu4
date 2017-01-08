//some magic formula:
// y = (int)x/10;
// 3*y * (5*y + x%10 - 4)
//

function developmentCost(d) {
    var y = Math.floor(d/10);
    return 3*y * (5*y + d%10 -4);
}

function getTotalCost(dev, discount) {
    var baseCost = 50;

    var percent = 0;
    var cost = 0;

    while (percent < 100) {
        var c = baseCost * ((100 + developmentCost(dev) + discount)/100);
        cost += c > 0 ? c : 1;

        dev++;
        percent += dev * 0.1666;
    }

    return Math.ceil(cost);
}


function run() {
    $('#development tr:not(:first)').remove();

    var result = [];
    var discount = $('#discount').val()*1;

    for (i = 3; i < 40; i++) {
        var o = {dev: i, 'cost': getTotalCost(i, discount)};
        result.push(o);
    }

    result.sort(function (a,b) {
        if (a.cost > b.cost) {
            return 1;
        }

        if (a.cost < b.cost) {
            return -1;
        }

        return 0;
    });

    for (let dev of result) {
        row = '<tr>';
        row += '<td>' + dev.dev + '</td>';
        row += '<td>' + dev.cost + '</td>';
        row += '</tr>'

        $('#development').append(row);
    }
}
