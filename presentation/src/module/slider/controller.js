/*jslint browser:true*/
/*global define*/

/*
    Slider Module
    @author: Renan Couto <renan@nbr.com.br>
    @dependencies: jQuery, lemmon-slider
*/

define([
    'jquery',
    'lemmon-slider'
], function ($) {
    'use strict';

    function Controller(element, settings) {
        // static
        this.VERSION = '0.1.0';

        // settings
        this.settings = {
            loop: false
        };

        this.settings = $.extend(true, {}, this.settings, settings);

        // objects
        this.$element = $(element);

        // methods
        this.build();
    }

    Controller.prototype.build = function () {
        this.$element
            .lemmonSlider(this.settings)
            .addClass('built');
    };

    return Controller;
});