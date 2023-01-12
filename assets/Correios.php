<?php

class Correios{

    /**
     * URL BASE DA API
     * @var string
     */
    const URL_BASE = 'http://ws.correios.com.br';

    /**
     * CÓDIGOS DE SERVIÇO DOS CORREIOS
     * @var string
     */
    const SERVICO_SEDEX = '04014';
    const SERVICO_PAC   = '04510';

    /**
     * Códigos dos formatos das embalagens
     * @var Integer
     */
    const FORMATO_CAIXA_PACOTE = 1;

    /**
     * CÓDIGO DA EMPRESA DO CONTRATO
     * @var string
     */
    private $codigoEmpresa = '';

    /**
     * SENHA DO CONTRATO DA EMPRESA
     */
    private $senhaEmpresa = '';

    /**
     * Função para recuperar resposta da API
     * @param array
     */
    public function calcular_frete( $dados, $dadosSedex ){

         // PARAMETROS DA QUERY DE CÁLCULO
        $paramQuery = [
            "nCdEmpresa"            => "",
            "sDsSenha"              => "",
            "nCdServico"            => $dados['codigoServico'],
            "sCepOrigem"            => $dados['cepOrigem'],
            "sCepDestino"           =>  $dados['cepDestino'],
            "nVlPeso"               => $dados['peso'],
            "nCdFormato"            => $dados['formato'],
            "nVlComprimento"        => $dados['comprimento'],
            "nVlAltura"             => $dados['altura'],
            "nVlLargura"            => $dados['largura'],
            "nVlDiametro"           => $dados['diametro'],
            "sCdMaoPropria"         => $dados['maoPropria'],
            "nVlValorDeclarado"     => $dados['valorDeclarado'],
            "sCdAvisoRecebimento"   => $dados['avisoRecebimento'],
            'strRetorno'            => 'xml'
        ];

        // PARAMETROS DA QUERY DE CÁLCULO SEDEX
        $paramQuerySedex = [
            "nCdEmpresa"            => "",
            "sDsSenha"              => "",
            "nCdServico"            => $dadosSedex['codigoServico'],
            "sCepOrigem"            => $dadosSedex['cepOrigem'],
            "sCepDestino"           => $dadosSedex['cepDestino'],
            "nVlPeso"               => $dadosSedex['peso'],
            "nCdFormato"            => $dadosSedex['formato'],
            "nVlComprimento"        => $dadosSedex['comprimento'],
            "nVlAltura"             => $dadosSedex['altura'],
            "nVlLargura"            => $dadosSedex['largura'],
            "nVlDiametro"           => $dadosSedex['diametro'],
            "sCdMaoPropria"         => $dadosSedex['maoPropria'],
            "nVlValorDeclarado"     => $dadosSedex['valorDeclarado'],
            "sCdAvisoRecebimento"   => $dadosSedex['avisoRecebimento'],
            'strRetorno'            => 'xml'
        ];

        // QUERY
        $queryPAC = http_build_query( $paramQuery );

        $resultadoPAC = $this->get( '/calculador/CalcPrecoPrazo.aspx?' . $queryPAC );

        $querySEDEX = http_build_query( $paramQuerySedex );

        $resultadoSEDEX = $this->get( '/calculador/CalcPrecoPrazo.aspx?' . $querySEDEX );

        $retorno = [
            'PAC' => $resultadoPAC,
            'SEDEX' => $resultadoSEDEX
        ];

        echo json_encode( $retorno );

    }

    /**
     * MÉTODO RESPONSÁVEL POR EXECUTAR A CONSULTA GET NO WERBSERVICE DOS CORREIOS
     * @param string $resource
     * @return object
     */
    public function get( $resource ){

        //ENDPOINT COMPLETO
        $endPoint = self::URL_BASE.$resource;

        //INICIA O CURL
        $curl = curl_init();

        // CONFIGURAÇÕES DO CURL
        curl_setopt_array( $curl, [
            CURLOPT_URL => $endPoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'GET'
        ] );

        // EXECUTA A CONSULTA DO CURL
        $response = curl_exec( $curl );

        // FECHA A CONEXÃO DO CURL
        curl_close( $curl );
        
        // RETORNA O XML INSTANCIADO
        return strlen( $response ) ? simplexml_load_string( $response ) : null;

    }


}