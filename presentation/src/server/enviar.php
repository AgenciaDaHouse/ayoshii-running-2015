<?php

$to = 'contato@capapromo.com.br';
$subject = 'Contato - Corrida Jovem Pan Londrina';

$data =  '<b>Nome</b>: ' . $_GET['nome'] . '<br>';
$data .= '<b>Email</b>: ' . $_GET['email'] . '<br>';

if ($_GET['cidade']) {
	$data .= '<b>Cidade</b>: ' . $_GET['cidade'] . '<br>';
}

if ($_GET['telefone']) {
	$data .= '<b>Telefone</b>: ' . $_GET['telefone'] . '<br>';
}

if ($_GET['endereco']) {
	$data .= '<b>Endereço</b>: ' . $_GET['endereco'] . '<br>';
}

$data .= '<b>Mensagem</b>: ' . nl2br($_GET['mensagem']);

$headers =  "From: contato@corridajovempanlondrina.com.br\r\n";
$headers .= "Reply-To: contato@capapromo.com.br\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$envio = mail($to, $subject, $data, $headers);

if ($envio) {
	header("Location: /sucesso.html");
} else {
	header("Location: /erro.html");
}
?>
