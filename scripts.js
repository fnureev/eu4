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

function getUnit(id) {
    techgroup = $('#techgroup'+id).val();
    tech = $('#tech'+id).val()*1;
    unitName = $('#unit'+id).val();

    u = units[techgroup]['infantry'][unitName] || units[techgroup]['cavalry'][unitName];

    if(typeof u == 'undefined') {
        return false;
    }

    var unit = {
        'type': u.type,
        'offensive_morale': u.offensive_morale,
        'defensive_morale': u.defensive_morale,
        'offensive_fire': u.offensive_fire,
        'defensive_fire': u.defensive_fire,
        'offensive_shock': u.offensive_shock,
        'defensive_shock': u.defensive_shock,
    };

    unit.id = id;
    unit.tech = tech;
    unit.discipline = $('#discipline'+id).val();
    unit.combatAbility = $('#strength'+id).val();
    unit.tactics = getmodifier(military_tactics, tech)*unit.discipline/100;
    unit.morale = getmodifier(land_morale, tech) * $('#morale'+id).val();

    return unit;
}

function fight()
{
    $('#units tr:not(:first)').remove();
    $('#combat tr:not(:first)').remove();

    unit1 = getUnit(1);
    unit2 = getUnit(2);

    if (!unit1 || !unit2) {
        return false;
    }

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

    var i = 0;
    var stage = 'fire';
    var die = 5;

    unit1.casualties = 0;
    unit1.currentMorale = unit1.morale;
    unit2.casualties = 0;
    unit2.currentMorale = unit2.morale;

    while (unit1.casualties < 1000 &&
            unit2.casualties < 1000 &&
            unit1.currentMorale > 0.005 &&
            unit2.currentMorale > 0.005) {
        i++;

        [damage1, damage2, moraleDamage1, moraleDamage2] = combatStage(stage, die, unit1, unit2);

        unit1.casualties += Math.ceil(damage2);
        unit2.casualties += Math.ceil(damage1)

        unit1.currentMorale -= moraleDamage2;
        unit2.currentMorale -= moraleDamage1;

        var row = '';

        row += '<td>' + i + '. ' + stage + '</td>';
        row += '<td>' + damage1.toFixed(2) + '</td>';
        row += '<td>' + (1000 - unit1.casualties) + '</td>';
        row += '<td>' + unit1.currentMorale.toFixed(2) + '</td>';
        row += '<td>' + damage2.toFixed(2) + '</td>';
        row += '<td>' + (1000 - unit2.casualties) + '</td>';
        row += '<td>' + unit2.currentMorale.toFixed(2) + '</td>';

        $('#combat').append('<tr>'+row+'</tr>');

        if (i%3 == 0) {
            if (stage == 'fire') {
                stage = 'shock';
            } else {
                stage = 'fire';
            }
        }
    }
}

function combatStage(stage, die, unit1, unit2) {
    stage = validateStage(stage);

    modifier1 = (1000 - unit1.casualties) / 1000;
    modifier2 = (1000 - unit2.casualties) / 1000;

    damage1 = getDamage(stage, die, unit1, unit2) * modifier1;
    damage2 = getDamage(stage, die, unit2, unit1) * modifier2;

    moraleDamage1 = getDamage('morale', die, unit1, unit2)
        * getmodifier(window[unit1.type + '_' + stage], unit1.tech)
        * modifier1;

    moraleDamage2 = getDamage('morale', die, unit2, unit1)
        * getmodifier(window[unit2.type + '_' + stage], unit2.tech)
        * modifier2;

    return [damage1, damage2, moraleDamage1, moraleDamage2];
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

    damage = casualties * modifier * combatAbility * discipline/100 / tactics;

    if (stage == 'morale') {
        damage = damage * unit1.morale / 600;
    }

    return damage.toFixed(2);
}
