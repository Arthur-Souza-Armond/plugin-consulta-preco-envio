// Elemento de input
const inputCep = document.querySelector('#unsp-input-cep');

// Conteiner de erro de cálculo
const divError = document.querySelector('#div-error-cep');
const messageError = document.querySelector('#div-error-cep p');
divError.style.display = "none";

function calcular_frete_unishop(){    

    //Validação de error
    console.log( inputCep.value.length )
    let returnVerification = verificar_cep( inputCep.value );

    if( returnVerification['status_verification'] != 'error' ){

        sending_json( inputCep.value );

    }else{
        divError.style.display = "block"
        messageError.innerHTML = returnVerification['error_message'];

    }

}

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

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

function sending_json( cep ){

    // Preparação da requisição
    let consultaSedex = {   
        "nCdEmpresa":"",
        "sDsSenha":"",
        "nCdServico":"04014",
        "sCepOrigem":"30881560",
        "sCepDestino": inputCep.value,
        "nVlPeso":"2",
        "nCdFormato":"1",
        "nVlComprimento":"20",
        "nVlAltura":"15",
        "nVlLargura":"15",
        "nVlDiametro":"0",
        "sCdMaoPropria":"n",
        "nVlValorDeclarado":"100",
        "sCdAvisoRecebimento":"n"
        }

    let consultaPac = {
        "nCdEmpresa":"",
        "sDsSenha":"",
        "nCdServico":"41106",
        "sCepOrigem":"30881560",
        "sCepDestino": cep,
        "nVlPeso":"2",
        "nCdFormato":"1",
        "nVlComprimento":"20",
        "nVlAltura":"15",
        "nVlLargura":"15",
        "nVlDiametro":"0",
        "sCdMaoPropria":"s",
        "nVlValorDeclarado":"100",
        "sCdAvisoRecebimento":"s"            
    }
    let teste = {
        "nCdEmpresa":"",
        "sDsSenha":"",
        "nCdServico":"41106",
        "sCepOrigem":"37540000",
        "sCepDestino":"37540000",
        "nVlPeso":"1",
        "nCdFormato":"1",
        "nVlComprimento":"20",
        "nVlAltura":"5",
        "nVlLargura":"15",
        "nVlDiametro":"0",
        "sCdMaoPropria":"s",
        "nVlValorDeclarado":"200",
        "sCdAvisoRecebimento":"s"
    }

    //Consulta
    /*$.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo",
        data: teste,
        dataType: "XML",
        jsonpCallback: "show_content"
    })*/

    var request = require('request');
    var xml2js = require('xml2js');

    var params = {
        'nCdEmpresa': '',
        'sDsSenha': '',
        'sCepOrigem': '74380150',
        'sCepDestino': '43810040',
        'nVlPeso': '5',
        'nCdFormato': '1',
        'nVlComprimento': '16',
        'nVlAltura': '5',
        'nVlLargura': '15',
        'nVlDiametro': '0',
        'sCdMaoPropria': 's',
        'nVlValorDeclarado': '200',
        'sCdAvisoRecebimento': 'n',
        'StrRetorno': 'xml',
        'nCdServico': '40010,41106'
    };
     
    var url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';
    
    var options = {
        'uri': url,
        'method': 'GET',
        'qs': params
    };
    
    request(options, function(error, response, body) {
    
        if (error) {
            return console.log('Erro ', error);
        }
        var parser = new xml2js.Parser({'async': true, 'attrkey': '@', 'explicitArray': false});
    
        parser.parseString(body, function (err, xml) {
            if (err) {
                return console.log('Erro ', err);
            }
    
            for (var i = 0; i < xml.Servicos.cServico.length; i++) {
                var row = xml.Servicos.cServico[i];
    
                console.log(JSON.stringify(row, null, 2));
            };
        });
    });

}

function show_content( result ){
    console.log( result );
}

    var sendjson = {   
    "nCdEmpresa":"",
    "sDsSenha":"",
    "nCdServico":"41106",
    "sCepOrigem":"37540000",
    "sCepDestino":"37540000",
    "nVlPeso":"1",
    "nCdFormato":"1",
    "nVlComprimento":"20",
    "nVlAltura":"5",
    "nVlLargura":"15",
    "nVlDiametro":"0",
    "sCdMaoPropria":"s",
    "nVlValorDeclarado":"200",
    "sCdAvisoRecebimento":"s"
    }

    $.ajax({
        url: 'http://localhost/wordpress/wp-content/plugins/calculo-frete-unishop/assets/calcular.php',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        data: {
            'json' : sendjson
        },success: data => {
            console.log(data);
        },error: function( XML ){
            console.log(XML);
        }
    })
  