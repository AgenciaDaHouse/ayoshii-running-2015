/*jslint browser:true*/
/*global define*/

/*
    Menu Module
    @author: Renan Couto <renan@nbr.com.br>
    @dependencies: jQuery, jquery.slicknav
*/

define([
    'jquery',
    'jquery.slicknav',
    'css!menu/style'
], function ($) {
    'use strict';

    function Controller(element, settings) {
        // static
        this.VERSION = '0.1.0';

        // settings
        this.settings = {
            prependTo: '#mobile-nav'
        };

        this.settings = $.extend(true, {}, this.settings, settings);

        // objects
        this.$element = $(element);

        // methods
        if ($(window).width() < 700) {
            this.build();
        }
    }

    Controller.prototype.build = function () {
        this.$element.slicknav(this.settings);
    };

    return Controller;
});