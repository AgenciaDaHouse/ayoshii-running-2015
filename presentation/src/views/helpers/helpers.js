/*jslint node:true*/
/*global GLOBAL*/

'use strict';

function Path(path, filename, extension) {
    this.path = GLOBAL.config[path] + filename + (extension || '');
    return this;
}

module.exports = {
    img: function (filename, path) {
        return new Path('images', ((path.length ? path : '') + filename)).path;
    },

    css: function (filename) {
        return new Path('styles', filename, '.css').path;
    },

    js: function (filename) {
        return new Path('scritps', filename, '.js').path;
    },

    active: function (arg1, arg2) {
        return arg1 === arg2 ? 'active' : '';
    }
};