<?php

if (isset($_POST['sid'])) {
    try {
        include('dbconfig.inc.php');
        $id = $_POST['sid'];
        $name = $_POST['name'];
        $age = $_POST['age'];
        $major = $_POST['major'];

        $update = "update students set name=?, age=?, major=? where sid=?";
        $query = $conn->prepare($update);
        $query->execute(array($name, $age, $major, $id));
        
        $select = "select name, age, major from students where sid=?";
        $query2 = $conn->prepare($select);
        $query2->execute(array($id));
        $row = $query2->fetch();
        $result = array($row[0], $row[1], $row[2]);
        
        echo json_encode($result);
    } catch (Exception $e) {
        echo "error";
    }
}
?>
