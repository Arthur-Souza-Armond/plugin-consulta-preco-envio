<?php
/*
Plugin Name: Unishop Frete
Plugin URI: https://akismet.com/
Description: Plugin criado para cálculo de frete na página do produto
Version: 1.0.0
Requires at least: 5.0
Requires PHP: 5.2
Author: Automattic
Author URI: https://automattic.com/wordpress-plugins/
License: GPLv2 or later
Text Domain: unishop-frete
*/

function content_frete_calculo(){

    $html = 
    '
        <div>
            <p id="title-calc-frete">Calcule os preços de entrega para esse produto</p>
            <div class="container-inputs-frete">
                <input placeholder="Insira seu cep" value="31270215" id="unsp-input-cep" type="text" />
                <a onclick="calcular_frete_unishop()">
                    Calcular
                </a>
            </div>
            <div id="div-error-cep">
                <p></p>
            </div>
            <div>

            </div>
        </div>   
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script id="script-calculo-frete" type="text/javascript" src="' . plugin_dir_url( __FILE__ ) . 'assets/script.js' . '" ></script>
    ';
    return $html;
}
wp_enqueue_style( 'style-calculo-frete', plugin_dir_url( __FILE__ ) . 'assets/style.css' );

add_shortcode( 'unishop_frete_calculo', 'content_frete_calculo' );


