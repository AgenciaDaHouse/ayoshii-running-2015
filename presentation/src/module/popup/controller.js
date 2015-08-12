/*jslint browser:true*/
/*global define*/

/*
    Popup Module
    @author: Renan Couto <renan@nbr.com.br>
    @dependencies: jQuery, jquery.magnific-popup, popup/magnific-popup.css
*/

define([
    'jquery',
    'jquery.magnific-popup',
    'css!popup/magnific-popup'
], function ($) {
    'use strict';

    function Controller(element, settings) {
        // static
        this.VERSION = '0.1.0';

        // settings
        this.settings = {
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: ''
            }
        };

        this.settings = $.extend(true, {}, this.settings, settings);

        // objects
        this.$element = $(element);

        // methods
        this.translate();
        this.build();
    }

    Controller.prototype.translate = function () {
        $.extend(true, $.magnificPopup.defaults, {
            tClose: 'Fechar',
            tLoading: 'Carregando imagem #%curr%...',
            gallery: {
                tPrev: 'Anterior',
                tNext: 'Próxima',
                tCounter: '%curr% de %total%'
            },
            image: {
                tError: '<a href="%url%">A imagem #%curr%</a> não pode ser carregada.'
            },
            ajax: {
                tError: '<a href="%url%">O conteúdo</a> não pode ser carregado.'
            }
        });
    };

    Controller.prototype.build = function () {
        this.$element.magnificPopup(this.settings);
    };

    return Controller;
});