/*jslint browser: true*/
/*global require:true*/

require(['./config'], function () {
    'use strict';

    require([
        'banner/controller',
        'slider/controller',
        'popup/controller',
        'menu/controller'
    ], function (Banner, Slider, Popup, Menu) {
        var o = {};

        o.banner = new Banner('#banner-main', { navPosition: 'right-top', withZero: false, nextButton: false });
        o.slider = new Slider('#slider');
        o.popup  = new Popup('#gallery');
        o.menu   = new Menu('#main-nav > ul');
    });
});