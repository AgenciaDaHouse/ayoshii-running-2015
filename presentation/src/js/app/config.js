/*global requirejs:true, define:true*/

requirejs.config({
    "baseUrl": "js/vendor/",

    "paths": {
        // main
        "app"        : "../app",
        "controller" : "../controller",
        "module"     : "../../module",

        // single modules
        "banner" : "../../module/banner",
        "slider" : "../../module/slider",
        "popup"  : "../../module/popup",
        "menu"   : "../../module/menu",

        // vendor
        "jquery"     : ["//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min", "jquery"],
        "handlebars" : ["//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min", "handlebars"]
    },

    // non-AMD compatible modules
    "shim": {
        "handlebars": {
            "exports": "Handlebars"
        },

        "jquery.timer": ["jquery"],
        "jquery.slicknav": ["jquery"],
        "jquery.magnific-popup": ["jquery"],
        "lemmon-slider": ["jquery"]
    }
});