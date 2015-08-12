/*jslint plusplus:true*/
/*global define:true*/

define(['handlebars'], function (Handlebars) {
    'use strict';

    Handlebars.registerHelper('times', function (n, block) {
        var accum = '', i = 0;

        for (i = 0; i < n; ++i) {
            accum += block.fn(i);
        }

        return accum;
    });

    Handlebars.registerHelper('add', function (a, b, withZero) {
        var result = a + b;
        return withZero === true && result < 10 ? '0' + result : result;
    });
});