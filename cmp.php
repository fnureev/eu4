<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Units comparsion</title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css">
    <script src="/js/jquery-1.5.min.js" language="JavaScript" type="text/javascript"></script>
    <script src="units.js" language="JavaScript" type="text/javascript"></script>
    <script src="scripts.js" language="JavaScript" type="text/javascript"></script>
<script>
$().ready(function()
{
    getunits(1);
    getunits(2);

    fight();
});
</script>
</head>
<body>

Unit1:

TechGroup:
<select id="techgroup1" onChange="getunits(1);">
    <option selected>western</option>
    <option>eastern</option>
    <option>ottoman</option>
    <option>muslim</option>
    <option>chinese</option>
    <option>indian</option>
    <option>north_american</option>
    <option>mesoamerican</option>
    <option>south_american</option>
    <option>sub_saharan</option>
    <option>nomad_group</option>
</select>


Technology:
<select id="tech1" onChange="getunits(1);">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    <option>8</option>
    <option>9</option>
    <option>10</option>
    <option>11</option>
    <option>12</option>
    <option>13</option>
    <option>14</option>
    <option selected>15</option>
    <option>16</option>
    <option>17</option>
    <option>18</option>
    <option>19</option>
    <option>20</option>
    <option>21</option>
    <option>22</option>
    <option>23</option>
    <option>24</option>
    <option>25</option>
    <option>26</option>
    <option>27</option>
    <option>28</option>
    <option>29</option>
    <option>30</option>
    <option>31</option>
    <option>32</option>
</select>

Unit:
<select id="unit1" onChange="fight()">
</select>

Discipline: <input type="text" id="dicsipline1" value="100" size="1" onChange="fight();">
Strength: <input type="text" id="strength1" value="1" size="1" onChange="fight();">
Morale: <input type="text" id="morale1" value="0" size="1" onChange="fight();">
<br><Br>


Unit2:

TechGroup:
<select id="techgroup2" onChange="getunits(2);">
    <option>western</option>
    <option selected>eastern</option>
    <option>ottoman</option>
    <option>muslim</option>
    <option>chinese</option>
    <option>indian</option>
    <option>north_american</option>
    <option>mesoamerican</option>
    <option>south_american</option>
    <option>sub_saharan</option>
    <option>nomad_group</option>
</select>


Technology:
<select id="tech2" onChange="getunits(2);">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    <option>8</option>
    <option>9</option>
    <option>10</option>
    <option>11</option>
    <option>12</option>
    <option>13</option>
    <option>14</option>
    <option selected>15</option>
    <option>16</option>
    <option>17</option>
    <option>18</option>
    <option>19</option>
    <option>20</option>
    <option>21</option>
    <option>22</option>
    <option>23</option>
    <option>24</option>
    <option>25</option>
    <option>26</option>
    <option>27</option>
    <option>28</option>
    <option>29</option>
    <option>30</option>
    <option>31</option>
    <option>32</option>
</select>

Unit:
<select id="unit2" onChange="fight()">
</select>

Discipline: <input type="text" id="dicsipline2" value="100" size="1" onChange="fight();">
Strength: <input type="text" id="strength2" value="1" size="1" onChange="fight();">
Morale: <input type="text" id="morale2" value="0" size="1" onChange="fight();">
<br><Br>




<table id="units">
<tr>
    <td>Die<br> roll</td>
    <td>Die<br> result</td>
    <td>Fire damage,<br> unit1</td>
    <td>Die<br> result</td>
    <td>Shock damage,<br> unit1</td>
    <td>Die<br> result</td>
    <td>Fire damage,<br> unit2</td>
    <td>Die<br> result</td>
    <td>Shock damage,<br> unit2</td>
    <td>Morale damage,<br> unit1</td>
    <td>Morale damage,<br> unit2</td>
    <td>Relative<br> strength</td>
</tr>
</table>


<style>
#units td:not(:first-child)
    { border-left: 1px solid black; }
td
    { text-align :center; }

</style>
</body>
</html>

