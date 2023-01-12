<?php

if( isset( $_GET['json'] ) ){
    ob_clean();
    echo json_decode( $_GET['json'] );
}