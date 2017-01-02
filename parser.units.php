<?php

$mil = file_get_contents('military/mil.txt');

preg_match_all('#technology = \{[^\}]+\}#i', $mil, $techs);

$result = array();

$groups = array();
foreach ($techs[0] as $i => $tech) {
    preg_match_all('#enable = ([^\n]+)\n#i', $tech, $units);

    foreach ($units[1] as $u) {

        $un = file('military/units/'.trim($u).'.txt');

        $unit = array();
        foreach ($un as $uni) {
            $unity = explode(' = ', $uni);
            if (isset($unity[1])) {
                $unit[$unity[0]] = trim($unity[1]);
            }
        }

        if (!isset($unit['unit_type'])) {
            //it's artillery, dont need that
            continue;
        }

        if (count($unit)) {
            $unit['name'] = trim($u);
            $unit['tech'] = $i;
        }

        $result[$unit['unit_type']][$unit['type']][$unit['name']] = $unit;
        $groups[] = $unit['unit_type'];
    }
}

file_put_contents('units.js', "var units = ".json_encode($result, JSON_PRETTY_PRINT).";");
