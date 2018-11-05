<?php

if (isset($_POST['submit'])){
  $name = $_POST['name'];
  $emailFrom = $_POST['email'];
  $message = $_POST['message'];

  $mailTo = "fborui@gmail.com";
  $headers = "From: ".$emailFrom;
  $txt = "You have received an e-mail from ".$name.".\n\n".$message;


  mail($mailTo, $txt, $headers);
  header("Location: index.php?mailsend");
}

?>
