<?php

// Where to find the binary for vnstat?
putenv('PATH=/opt/homebrew/bin'); 

/**
 * vnStat API
 */

// Return a list of interfaces

if ( isset($_GET['dbiflist']) ) {
	$data = vnstat('f 1'); // Return something to read available interfaces
	foreach ( $data->interfaces as &$item )
		unset($item->traffic);
	send($data);
}

// Building commands

$command = '';

if ( isset($_GET['interface']) ) {
	$interface = preg_replace('/[^\w]/', '+', $_GET['interface']);
	$command .= "-i $interface";
}

// Execute

$data = vnstat($command);
send($data);

// Get the JSON or send error message

function vnstat($command) {
	if ( empty($command) ) send_error('Error: vnStat API has nothing to return!');
	$result = shell_exec("vnstat --json $command");
	$data = json_decode($result);
	if ( json_last_error() === JSON_ERROR_NONE ) return $data;
	send_error($result);
}

// Send error message

function send_error($message) {
	$data = [ 'code' => 'error', 'message' => $message ];
	http_response_code(400);
	send($data);
}

// Send JSON

function send($data) {
	// header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
	exit;
}