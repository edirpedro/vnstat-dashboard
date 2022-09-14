<?php

// Where to find the binary for vnstat?

putenv('PATH=/opt/homebrew/bin'); 

// vnStat API

$json = [ 'error' => true, 'message' => null ];
$command = '';

// Set Interface

if ( ! empty($_GET['interface']) ) {
	$interface = preg_replace('/[^\w]/', '+', $_GET['interface']);
	$command .= "-i $interface";
}

// Getting JSON

if ( empty($command) ) {
	http_response_code(404);
	$json['message'] = 'Error: vnStat API has nothing to return!';
} else {
	$result = shell_exec("vnstat --json $command");
	$decode = json_decode($result);
	if ( json_last_error() === JSON_ERROR_NONE ) {
		$json = $decode;
	} else {
		http_response_code(404);
		$json['message'] = $result;
	}
}

// header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
echo json_encode($json);