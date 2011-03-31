/*!
 * jQuery Textarea Auto-Resize Plugin v0.1
 * http://github.com/thomasjo/jquery-autoresize
 *
 * Copyright (c) 2011 Thomas Johansen.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {
    $.fn.autoResize = function(options) {
        var settings = {
            maxLength: 0,
            resize: null
        };

        if (options) {
            $.extend(settings, options);
        }

        this.filter("textarea").each(function() {
            var $textarea = $(this).css({
                "overflow-y": "hidden",
                "resize": "none"
            });

            var minHeight = $textarea.height();
            var previousHeight = 0;
            var $slave = (function() {
                var $clone = $textarea.clone()
                    .attr("tab-index", -1)
                    .removeAttr("id")
                    .removeAttr("name")
                    .css({
                        "position": "absolute",
                        "top": 0,
                        "left": -9999
                    });

                return $clone.insertBefore($textarea);
            })();

            var adjustHeightIfNeeded = function() {
                var text = $textarea.val();

                $slave
                    .height(0)
                    .val(text)
                    .scrollTop(9999);

                var height = Math.max(minHeight, $slave.scrollTop());
                if (height === previousHeight) return;
                previousHeight = height;

                if (settings.resize) {
                    settings.resize.call(this);
                }

                $textarea.height(height);
            };

            $textarea
                .unbind(".autoResize")
                .bind("keyup.autoResize keydown.autoResize change.autoResize", adjustHeightIfNeeded);
        });
    };
})(jQuery);