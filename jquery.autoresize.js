/*!
 * jQuery textarea autoResize plugin v0.2.0
 * http://github.com/thomasjo/jquery-autoresize
 *
 * Copyright (c) 2011 Thomas Johansen | https://raw.github.com/thomasjo/jquery-autoresize/master/LICENSE.txt
 */

;(function() {
    'use strict';

    var root = this,
        $ = root.$,

        defaults = {
            resize: $.noop
        };

    $.fn.autoResize = function(options) {
        var settings = $.extend({}, defaults, options);

        this.filter('textarea').each(function() {
            var $textarea = $(this).css({
                    'overflow-y': 'hidden',
                    'resize': 'none'
                }),

                minHeight = $textarea.height(),
                previousHeight = minHeight,

                $slave = (function() {
                    var $clone = $textarea.clone()
                        .attr('tab-index', -1)
                        .removeAttr('id')
                        .removeAttr('name')
                        .css({
                            'position': 'absolute',
                            'top': 0,
                            'left': -9999
                        });

                    return $clone.insertBefore($textarea);
                })(),

                adjustHeightIfNeeded = function () {
                    var text = $textarea.val(),
                        height;

                    $slave
                        .height(0)
                        .val(text)
                        .scrollTop(9999);

                    height = Math.max(minHeight, $slave.scrollTop());
                    if (height === previousHeight) {
                        return;
                    }

                    previousHeight = height;
                    settings.resize.call(this);
                    $textarea.height(height);
                };

            $textarea.unbind('.resize');

            if (supportsInputEvent()) {
                $textarea.bind('input.resize', adjustHeightIfNeeded);
            }
            else if (supportsPropertyChangedEvent()) {
                $textarea.bind('propertychanged.resize', adjustHeightIfNeeded);
            }
            else {
                $textarea.bind('keypress.resize', adjustHeightIfNeeded);
            }
        });

        return this;
    };

    function supportsInputEvent() {
        if ('oninput' in document.body) {
            return true;
        }

        document.body.setAttribute('oninput', 'return');
        return typeof document.body.oninput === 'function';
    }

    function supportsPropertyChangedEvent() {
        return 'onpropertychanged' in document.body;
    }

}).call(this);