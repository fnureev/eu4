<?php

$mil = file_get_contents('military/mil.txt');

preg_match_all('#technology = \{[^\}]+\}#i', $mil, $techs);

$result = [];
$groups = [];

$coefficients = [
    'infantry_fire' => [],
    'infantry_shock' => [],
    'cavalry_fire' => [],
    'cavalry_shock' => [],
    'land_morale' => [],
    'military_tactics' => ["0" => 0.5],
];

foreach ($techs[0] as $i => $tech) {
    preg_match_all('#enable = ([^\n]+)\n#i', $tech, $units);

    foreach ($coefficients as $key => &$arr) {
        preg_match('#' . $key . '\s+=\s+([^\n\#]+)\n#i', $tech, $coeff);

        if (isset($coeff[1]) && $coeff = trim($coeff[1])) {
            $arr[$i] = (float)$coeff;
        }
    }
    unset($arr);

    foreach ($units[1] as $u) {
        $un = file('military/units/' . trim($u) . '.txt');

        $unit = [];
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

$coefficientsText = '';
foreach ($coefficients as $key => $arr) {
    $coefficientsText .= 'var ' . $key .' = ' . json_encode($arr, JSON_PRETTY_PRINT) . ';' . PHP_EOL;
}

file_put_contents('units.js', "var units = ".json_encode($result, JSON_PRETTY_PRINT).";");
file_put_contents('coefficients.js', $coefficientsText);
