<?php

	// Open the text file
	$f = fopen("data.txt", "w");

	// Write text
	fwrite($f, $_POST["textblock"]); 

	// Close the text file
	fclose($f);

	// Open file for reading, and read the line
	$f = fopen("data.txt", "r");

	fclose($f);

?>