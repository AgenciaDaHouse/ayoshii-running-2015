/*jslint browser: true*/
/*global require:true*/

require(['./config'], function () {
    'use strict';

    require([
        'menu/controller'
    ], function (Menu) {
        var o = {};

        o.menu   = new Menu('#main-nav > ul');
    });
});