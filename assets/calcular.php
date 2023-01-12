<?php

if( $_GET['action'] == 'calcular_cep' ){

    // REQUIRE CLASS CORREIOS
    require_once( 'Correios.php' );

    // INSTANCIAMENTO DA CLASSE
    $api = new Correios();

    // PARAMETROS DA FUNÇÃO PAC
    $codServico = Correios::SERVICO_PAC;
    $formato = Correios::FORMATO_CAIXA_PACOTE;

    $parametros = [
        'codigoServico'         => $codServico,
        'cepOrigem'             => '30881560',
        'cepDestino'            => $_GET['cep_destino'],
        'peso'                  => 1,
        'formato'               => $formato,
        'comprimento'           => 15,
        'largura'               => 15,
        'altura'                => 15,
        'diametro'              => 0,
        'maoPropria'            => "N",
        'valorDeclarado'        => 0,
        'avisoRecebimento'      => "N"
    ];

    // PARAMETROS DA FUNÇÃO SEDEX
    $codServicoSedex = Correios::SERVICO_SEDEX;

    $paramSedex = [
        'codigoServico'         => $codServicoSedex,
        'cepOrigem'             => '30881560',
        'cepDestino'            => $_GET['cep_destino'],
        'peso'                  => 1,
        'formato'               => $formato,
        'comprimento'           => 15,
        'largura'               => 15,
        'altura'                => 15,
        'diametro'              => 0,
        'maoPropria'            => "N",
        'valorDeclarado'        => 0,
        'avisoRecebimento'      => "N"
    ];

    ob_clean();
    echo $api->calcular_frete( $parametros, $paramSedex );
}