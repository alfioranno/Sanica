<?php
$Msg = "\r\n\r\n";
$UserData = "";
$UserData .= "Nome " . $_POST["Itm_8_00_1"] . "\r\n";
$UserData .= "Cognome " . $_POST["Itm_8_00_2"] . "\r\n";
$UserData .= "Società " . $_POST["Itm_8_00_3"] . "\r\n";
$UserData .= "Indirizzo " . $_POST["Itm_8_00_4"] . "\r\n";
$UserData .= "Città " . $_POST["Itm_8_00_5"] . "\r\n";
$UserData .= "CAP " . $_POST["Itm_8_00_6"] . "\r\n";
$UserData .= "Tel. " . $_POST["Itm_8_00_7"] . "\r\n";
$UserData .= "Email: " . $_POST["Itm_8_00_8"] . "\r\n";
$UserData .= "Messaggio " . $_POST["Itm_8_00_9"] . "\r\n";
mail( "sanica@sanica.it", "Grazie per averci contattato", $Msg . $UserData, "From: sanica@sanica.it\r\nContent-type: text/plain; charset=iso-8859-1\r\n");

$Msg = "\r\n\r\n";
mail( $_POST["Itm_8_00_10"], "", $Msg, "From: sanica@sanica.it\r\nContent-type: text/plain; charset=iso-8859-1\r\n");

@header("Location: ../home.html");
?>
