/*jslint browser: true*/
/*global require:true*/

require(['./config'], function () {
    'use strict';

    require([
        'popup/controller'
    ], function (Popup) {
        var o = {};
        o.popup  = new Popup('#gallery');
    });
});