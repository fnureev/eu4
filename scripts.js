    function getmodifier(modifiers, tech)
    {
        mod = 0;
        for (k in modifiers)
        {
            if(k <= tech)
            {
                mod += modifiers[k];
            }
        }
        return mod;
    }

    function getdieresult(k)
    {
        if(k <= -2)
            { return die_results['-2']; }
        if(k >= 13)
            { return die_results[13]; }

        return die_results[k];
    }

    function getunits(id)
    {
        techgroup = $('#techgroup'+id).val();
        tech = $('#tech'+id).val();

        infantry = units[techgroup]['infantry'];
        i = new Array; maxT = 0;
        for(k in infantry)
        {

            if(infantry[k].tech <= tech)
            {
                if(infantry[k].tech > maxT)
                {
                    maxT = infantry[k].tech;
                    i = new Array;
                }

                i[i.length] = infantry[k];
            }
        }

        cavalry = units[techgroup]['cavalry'];
        c = new Array; maxT = 0;
        for(k in cavalry)
        {
            if(cavalry[k].tech <= tech)
            {
                if(cavalry[k].tech > maxT)
                {
                    maxT = cavalry[k].tech;
                    c = new Array;
                }

                c[c.length] = cavalry[k];
            }
        }

        $('#unit'+id).html('');
        for(k in i)
        {
            $('#unit'+id).append('<option value = "'+i[k].name+'">'+i[k].type+' '+i[k].tech+': '+i[k].name+' '+i[k].offensive_fire+'/'+i[k].defensive_fire+' '+i[k].offensive_shock+'/'+i[k].defensive_shock+' '+i[k].offensive_morale+'/'+i[k].defensive_morale+'</option>');
        }
        for(k in c)
        {
            $('#unit'+id).append('<option value = "'+c[k].name+'">'+c[k].type+' '+c[k].tech+': '+c[k].name+' '+c[k].offensive_fire+'/'+c[k].defensive_fire+' '+c[k].offensive_shock+'/'+c[k].defensive_shock+' '+c[k].offensive_morale+'/'+c[k].defensive_morale+'</option>');
        }

        fight();
    }

    function fight()
    {
        $('#units tr:not(:first)').remove();
        id = 1;
        techgroup = $('#techgroup'+id).val();
        tech1 = $('#tech'+id).val()*1;
        unit = $('#unit'+id).val();
        unit1 = units[techgroup]['infantry'][unit] ||  units[techgroup]['cavalry'][unit];
        unit1_morale = getmodifier(morale, tech1)*(100+$('#morale'+id).val()*1)/100;

        id = 2;
        techgroup = $('#techgroup'+id).val();
        tech2 = $('#tech'+id).val()*1;
        unit = $('#unit'+id).val();
        unit2 = units[techgroup]['infantry'][unit] ||  units[techgroup]['cavalry'][unit];
        unit2_morale = getmodifier(morale, tech2)*(100+$('#morale'+id).val()*1)/100;


        if(typeof unit1 == 'undefined' || typeof unit2 == 'undefined')
        {
            return false;
        }

        for (var i = -3; i < 14; i++)
        {
            row = '<td>'+i+'</td>';

            damage = {};

            unit1_modifier = $('#strength1').val()*1 * $('#dicsipline1').val()*1/$('#dicsipline2').val()*1;
            unit2_modifier = $('#strength2').val()*1 * $('#dicsipline2').val()*1/$('#dicsipline1').val()*1;;

            die = i+unit1.offensive_fire*1-unit2.defensive_fire*1;
            row += '<td>'+die+'</td>';

            modifier = unit1.type == 'infantry' ? getmodifier(infantry_fire, tech1) : getmodifier(cavalry_fire, tech1);
            damage.unit1fire = (getdieresult(die)*unit1_modifier*modifier*1/getmodifier(tactics, tech2)*1);

            row += '<td>'+damage.unit1fire.toFixed(2)+'</td>';

            die = i+unit1.offensive_shock*1-unit2.defensive_shock*1;
            row += '<td>'+die+'</td>';
            modifier = unit1.type == 'infantry' ? getmodifier(infantry_shock, tech1) : getmodifier(cavalry_shock, tech1);
            damage.unit1shock = (getdieresult(die)*unit1_modifier*modifier*1/getmodifier(tactics, tech2)*1);
            row += '<td>'+damage.unit1shock.toFixed(2)+'</td>';

            die = i+unit2.offensive_fire*1-unit1.defensive_fire*1;
            row += '<td>'+die+'</td>';
            modifier = unit2.type == 'infantry' ? getmodifier(infantry_fire, tech2) : getmodifier(cavalry_fire, tech2);
            damage.unit2fire = (getdieresult(die)*unit2_modifier*modifier*1/getmodifier(tactics, tech1)*1);
            row += '<td>'+damage.unit2fire.toFixed(2)+'</td>';

            die = i+unit2.offensive_shock*1-unit1.defensive_shock*1;
            row += '<td>'+die+'</td>';
            modifier = unit2.type == 'infantry' ? getmodifier(infantry_shock, tech2) : getmodifier(cavalry_shock, tech2);
            damage.unit2shock = (getdieresult(die)*unit2_modifier*modifier*1/getmodifier(tactics, tech1)*1);
            row += '<td>'+damage.unit2shock.toFixed(2)+'</td>';

            die = i+unit2.offensive_morale*1-unit1.defensive_morale*1;
            morale_damage = getdieresult(die)*0.01/6*unit1_modifier*unit1_morale/getmodifier(tactics, tech1)*1;
            row += '<td>'+morale_damage.toFixed(2)+'</td>';
            die = i+unit1.offensive_morale*1-unit2.defensive_morale*1;
            morale_damage = getdieresult(die)*0.01/6*unit2_modifier*unit2_morale/getmodifier(tactics, tech2)*1;
            row += '<td>'+morale_damage.toFixed(2)+'</td>';

            compare = (damage.unit2fire+damage.unit2shock)/(damage.unit1fire+damage.unit1shock);
            //compare = (damage.unit1fire+damage.unit1shock)/(damage.unit2fire+damage.unit2shock);
            row += '<td>'+compare.toFixed(2)+'</td>';


            $('#units').append('<tr>'+row+'</tr>');
        }


        sum = 0;
        sum1 = 0;
        sum2 = 0;
        c = 0;

        $('#units tr:gt(0)').each(function ()
        {
            c++;
            sum += $(this).find('td:last').text()*1;
            sum1 += $(this).find('td').eq(-3).text()*1;
            sum2 += $(this).find('td').eq(-2).text()*1;
        });

        $('#units').append('<tr>'
                +'<td></td>'
                +'<td></td>'
                +'<td></td>'
                +'<td></td>'
                +'<td></td>'
                +'<td></td>'
                +'<td></td>'
                +'<td></td>'
                +'<td>Average</td>'
                +'<td>'+(sum1/c).toFixed(2)+'</td>'
                +'<td>'+(sum2/c).toFixed(2)+'</td>'
                +'<td>'+(sum/c).toFixed(2)+'</td>'
                +'</tr>');

    }
