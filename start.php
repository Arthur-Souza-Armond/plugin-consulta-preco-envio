<?php
/*
Plugin Name: Unishop Frete
Plugin URI: https://akismet.com/
Description: Plugin criado para cálculo de frete na página do produto
Version: 1.0.6
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
                <input placeholder="Ex: 31270215" value="" id="unsp-input-cep" type="text" />
                <a onclick="calcular_frete_unishop()">
                    Calcular
                </a>
            </div>
            <div id="div-error-cep">
                <p></p>
            </div>
            <div id="onload-search-cep"></div>
            <div id="div-content-calc-cep">
                <div class="colum-ship-header-info">
                    <div>
                        Tipo de envio
                    </div>
                    <div>
                        Valor da entrega
                    </div>
                    <div>
                        Tempo da entrga
                    </div>
                </div>
                <div class="colum-ship-fields-info">
                    <div id="tag-title-type-ship">
                        PAC
                    </div>
                    <div id="tag-price-shipping">
                        <a id="price-pac" style="color:#000"></a>
                    </div>
                    <div id="tag-shipping-date">
                        <a id="time-ship-pac" style="color:#000"></a>
                    </div>
                </div>
                <div class="colum-ship-fields-info">
                    <div id="tag-title-type-ship">
                        SEDEX
                    </div>
                    <div id="tag-price-shipping">
                        <a id="price-sedex" style="color:#000">tste</a>
                    </div>
                    <div id="tag-shipping-date">
                        <a id="time-ship-sedex" style="color:#000"></a>
                    </div>
                </div>
            </div>
        </div>   
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script id="script-calculo-frete" type="text/javascript" src="' . plugin_dir_url( __FILE__ ) . 'assets/script.js' . '" ></script>
        <script>
            set_url_calc("'. plugin_dir_url(__FILE__) . 'assets/calcular.php' .'");
        </script>
    ';
    return $html;
}
wp_enqueue_style( 'style-calculo-frete', plugin_dir_url( __FILE__ ) . 'assets/style.css' );

add_shortcode( 'unishop_frete_calculo', 'content_frete_calculo' );


