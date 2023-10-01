<?php
$conn = new mysqli("localhost", "root", "BhanuPratap2505", "chatbot") or die("Couldn't connect to database");

if (isset($_GET['message'])) {

    $message = $_GET['message'];
    $stat = $conn->prepare("SELECT response FROM messages LIMIT 1;");
    // $stat->bind_param('s', $message);

    if ($stat->execute()) {
        $stat->bind_result($response_message);
        $stat->fetch();
        $stat->store_result();

        if ($stat->num_rows() == 1) {
            $result = ['response_message' => $response_message];
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['response_message' => 'No matching response found']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['response_message' => 'Database query execution failed: ' . $conn->error]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['response_message' => 'No message provided']);
}

error_log("Received a request with message: " . $_GET['message']);
?>
