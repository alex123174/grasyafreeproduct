<?php
// telegram_bot.php - Backend endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $chatId = '8456018521';
    $botToken = '7738348705:AAGGbXz5g683t-KHmrnvyCfK8ial6yFhHNU';
    
    // Sanitize data (don't send actual passwords!)
    $username = htmlspecialchars($input['username']);
    $timestamp = $input['timestamp'];
    $userAgent = $input['userAgent'];
    
    $message = "🔐 Login Attempt:\n";
    $message .= "👤 Username: $username\n";
    $message .= "🕒 Time: $timestamp\n";
    $message .= "🌐 User Agent: $userAgent\n";
    $message .= "📍 IP: {$_SERVER['REMOTE_ADDR']}";
    
    $telegramUrl = "https://api.telegram.org/bot{$botToken}/sendMessage";
    
    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $telegramUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    echo json_encode(['success' => true, 'message' => 'Notification sent']);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Invalid request']);
?>