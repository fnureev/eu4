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

    id = 2;
    techgroup = $('#techgroup'+id).val();
    tech2 = $('#tech'+id).val()*1;
    unit = $('#unit'+id).val();
    unit2 = units[techgroup]['infantry'][unit] ||  units[techgroup]['cavalry'][unit];

    if(typeof unit1 == 'undefined' || typeof unit2 == 'undefined') {
        return false;
    }

    unit1.tech = tech1;
    unit1.discipline = $('#discipline1').val();
    unit1.combatAbility = $('#strength1').val();
    unit1.tactics = getmodifier(military_tactics, tech1)*unit1.discipline;
    unit1.morale = getmodifier(land_morale, tech1) * $('#morale1').val();
    unit2.tech = tech2;
    unit2.discipline = $('#discipline2').val();
    unit2.combatAbility = $('#strength2').val();
    unit2.tactics = getmodifier(military_tactics, tech2)*unit2.discipline;
    unit2.morale = getmodifier(land_morale, tech2) * $('#morale2').val();

    for (var i = -3; i < 14; i++)
    {
        var row = '<td>'+i+'</td>';

        row += '<td>' + getDamage('fire', i, unit1, unit2) + '</td>';
        row += '<td>' + getDamage('shock', i, unit1, unit2) + '</td>';
        row += '<td>' + getDamage('fire', i, unit2, unit1) + '</td>';
        row += '<td>' + getDamage('shock', i, unit2, unit1) + '</td>';
        row += '<td>' + getDamage('morale', i, unit1, unit2) + '</td>';
        row += '<td>' + getDamage('morale', i, unit2, unit1) + '</td>';

        $('#units').append('<tr>'+row+'</tr>');
    }
}

function validateStage(stage) {
    if (stage != 'fire' && stage != 'shock' && stage != 'morale') {
        return 'fire';
    }
    return stage;
}

function getDamage(stage, die, unit1, unit2) {
    stage = validateStage(stage);

    die = die*1 + unit1['offensive_' + stage]*1 + unit2['defensive_' + stage]*1;
    casualties = 15 + 5 * die;
    modifier = 1;
    if (stage != 'morale') {
        modifier = getmodifier(window[unit1.type + '_' + stage], unit1.tech);
    }
    combatAbility = unit1.combatAbility;
    discipline = unit1.discipline;
    tactics = unit2.tactics;

    damage = casualties * modifier * combatAbility * discipline / tactics;

    if (stage == 'morale') {
        damage = damage * unit1.morale / 600;
    }

    return damage.toFixed(2);
}
