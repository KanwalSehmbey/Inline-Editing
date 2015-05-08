<?php
include('dbconfig.inc.php');

$result = array();
$query = "select sid, name, age, major from students";
$stmt = $conn->query($query);
while ($row = $stmt->fetch()) {
    $result[] = array($row[0], $row[1], $row[2], $row[3]);
}

echo json_encode($result);
?>
