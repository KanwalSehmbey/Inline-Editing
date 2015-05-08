<?php
function showError($message) {
    echo "<h2>Error</h2>";
    echo nl2br(htmlspecialchars($message));
    exit();
}

try {
    $config = parse_ini_file("C:\\xampp\\htdocs\\Assignment6\\dbconfig.ini");
    $conn = new PDO($config['dsn'], $config['user'], $config['password']);
} catch(PDOException $e) {
    showError("Sorry, an error has occurred. Please try your request later\n" . $e->getMessage());
}

?>
