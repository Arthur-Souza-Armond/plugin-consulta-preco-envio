// Elemento de input
const inputCep = document.querySelector('#unsp-input-cep');

// Conteiner de erro de cálculo
const divError = document.querySelector('#div-error-cep');
const messageError = document.querySelector('#div-error-cep p');
divError.style.display = "none";

// CONTAINER DE CONTEÚDO DO CÁLCULO
const divContent = document.querySelector( '#div-content-calc-cep' );
divContent.style.display = "none";

// CONTAINER DE SINALIZAÇÃO DE CARREGAMENTO
const divLoad = document.querySelector( '#onload-search-cep' );
divLoad.style.display = "none";

/**
 * FUNÇÃO PARA SETAR URL DE FUNÇÕES
 * @param { string } url 
 */
let urlFunctions = '';
function set_url_calc( url ){
    urlFunctions = url;

}

/**
 * 
 *  Função de click do botão de calcular CEP
 * 
 */
function calcular_frete_unishop(){    

    // Recebimento da verificação do CEP
    let returnVerification = verificar_cep( inputCep.value );

    if( returnVerification['status_verification'] != 'error' ){

        // CORREÇÕES DE VISIBILIDADE
        divError.style.display = "none";

        // ENVIO PARA O MÉTODO DE CALCULAR PREÇO
        sending_json( inputCep.value );

    }else{

        // Display do error

        divError.style.display = "block"
        messageError.innerHTML = returnVerification['error_message'];

    }

}

/**
 * 
 * Função para realizar todas as validações necessárias do CEP digitado
 * @param { string } cep 
 * @returns array
 * 
 */
function verificar_cep( cep ){

    if( cep == "" ){
        let resultado = new Object();

        resultado.status_verification = 'error';
        resultado.error_message = "Ops! Você precisa inserir o CEP para poder calcular";

        return resultado
    }

    if( cep.length != 8 ){

        let resultado = new Object();
        
        resultado.status_verification = 'error';
        resultado.error_message = "Ops! Seu CEP não é válido. Por favor, insira um CEP válido";

        return resultado
    }

    let caracteresEspeciais = [ '!', '@', '#', '$', '%', '¨¨', '&', '*' ];
    
    let resultadoEspeciais = new Object()

    for( i=0; i < cep.length; i++ ){
        caracteresEspeciais.forEach( caracter => {            
            if( caracter == cep.charAt( i ) ){

                resultadoEspeciais.status_verification = 'error';
                resultadoEspeciais.error_message = "Ops! O cep possui dígitos inválidos";                

            }
        } )
    }
    if( !isEmpty( resultadoEspeciais ) ){
        return resultadoEspeciais;
    }

    let resultado = new Object();

    resultado.status_verification = 'success';

    return resultado;

}

/**
 * 
 * Função para verificar se o objeto está vazio
 * @param {object} obj 
 * @returns boolean
 * 
 */
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

/**
 * 
 * Função para fazer o envio da requisição via Ajax para o sistema
 * @param {string} cep 
 * 
 */
function sending_json( cep ){

    $.ajax({
        url: urlFunctions,
        type: 'GET',
        data: {
            action: 'calcular_cep',
            'cep_destino' : cep
        },
        beforeSend : function(){

            divLoad.style.display = "block";

        },success: data => {

            divLoad.style.display = "none";

            if( data != null ){

                let infoServico = JSON.parse( data );
                
                let resultPAC = infoServico.PAC.cServico;
                let resultSEDEX = infoServico.SEDEX.cServico;

                divContent.style.display = "block";

                // TAGS DE PREÇO DOS MÉTODOS
                const tagPricePAC = document.querySelector( '#price-pac' );
                const tagPriceSEDEX = document.querySelector( '#price-sedex' );

                // TAGS DE TEMPO DE ENVIO DOS MÉTODOS
                const tagTimeShippingPAC = document.querySelector( '#time-ship-pac' );
                const tagTimeShippingSEDEX = document.querySelector( '#time-ship-sedex' );

                /**
                 * Configuração de exibição da consulta do PAC
                 */
                tagPricePAC.innerHTML = 'R$ '+resultPAC.Valor;
                tagTimeShippingPAC.innerHTML = resultPAC.PrazoEntrega+" a "+( parseInt( resultPAC.PrazoEntrega ) + 2)+" dias";

                /**
                 * Configuração de exbibição de consulta do SEDEX
                 */
                tagPriceSEDEX.innerHTML = 'R$ '+resultSEDEX.Valor;
                tagTimeShippingSEDEX.innerHTML = resultSEDEX.PrazoEntrega+" a "+( parseInt( resultSEDEX.PrazoEntrega ) + 2)+" dias";

            }else{
                alert( "Ocorreu um erro ao calcular o seu CEP" );
            }                                 

            let retorno = new Object();
            retorno.status_action = 'success';
            return retorno;

        }, error: function( XML ){
            console.log(XML);
            alert( "Ops! Ocorreu um erro inesperado ao calcular seu CEP. Por favor, tente novamente mais tarde" );
        }
    })
}
  