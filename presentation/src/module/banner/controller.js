/*jslint browser:true, plusplus:true*/
/*global define, console*/

/*
    Banner Module
    @author: Renan Couto <renan@nbr.com.br>
    @dependencies: jQuery, style.css, template.hbs
*/

define([
    'jquery',
    'handlebars',
    'text!banner/template.hbs',
    'css!banner/style',
    'handlebars-helpers',
    'jquery.timer'
], function ($, Handlebars, template) {
    'use strict';

    function Controller(element, settings) {
        // static
        this.VERSION = '0.1.0';

        // settings
        this.settings = {
            delay: 4000,
            current: 0
        };

        this.settings = $.extend(true, {}, this.settings, settings);

        // objects
        this.wrapper = '<div class="banner--items" />';
        this.$element = $(element);
        this.$items = this.setupItems();
        this.template = Handlebars.compile(template);
        this.settings.total = this.$items.length;
        this.$nav = this.setupNavigation();
        this.timer = this.setupTimer();

        this.handleNavigation();
    }

    Controller.prototype.setupItems = function () {
        return this.$element.children()
            .each(function (index) {
                $(this).attr('data-index', index);
            })
            .wrapAll(this.wrapper)
            .first()
                .addClass('init')
                .end();
    };

    Controller.prototype.setupNavigation = function () {
        return this.$element
            .append(this.template(this.settings))
            .children('.banner--nav');
    };

    Controller.prototype.handleNavigation = function () {
        var self = this;

        this.$nav
            .on('click', '.item', function (e) {
                var $this = $(this),
                    action = $this.attr('data-action');

                if (action) {
                    self[action](true);
                } else {
                    self.itemStatus(this);
                    self.changeItem($(this).attr('data-index'), e.isTrigger);
                }
            })
            .find('.item:first-child')
                .trigger('click');

        this.$element
            .on({
                mouseenter: function () {
                    self.timer.pause();
                },

                mouseleave: function () {
                    self.timer.play();
                }
            });
    };

    Controller.prototype.itemStatus = function (item) {
        var $item = $(item);

        $item
            .addClass('active')
            .siblings()
                .removeClass('active');
    };

    Controller.prototype.changeItem = function (index, isTrigger) {
        var $items = this.$items,
            $current = $items.filter('[data-index="' + index + '"]').removeClass('show');

        function change() {
            $items
                .filter('.last')
                    .removeClass('show last')
                    .end()
                .filter('.show')
                    .addClass('last');

            $current.addClass('show');
        }

        if (!isTrigger || index > 0) {
            $items.removeClass('init');
        }

        setTimeout(change, 1);
        this.settings.current = Number(index);
    };

    Controller.prototype.nextItem = function (reset) {
        var next = this.settings.current + 1;

        if (next === this.settings.total) {
            next = 0;
        }

        if (reset) {
            this.timer.play(true);
        }

        this.$nav.find('.item[data-index="' + next + '"]').trigger('click');
    };

    Controller.prototype.setupTimer = function () {
        var self = this;
        return $.timer(function () { self.nextItem(); }, self.settings.delay, true);
    };

    return Controller;
});