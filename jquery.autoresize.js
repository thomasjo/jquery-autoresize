(function($) {
    $.fn.autoResize = function(options) {
        var settings = {
            maxLength: 0,
            resize: function() {}
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

                var cssPropertyWhitelist = [
                    "width",
                    "height",
                    "line-height",
                    "word-spacing",
                    "letter-spacing"
                ];

                for (propertyName in cssPropertyWhitelist) {
                    $clone.css(propertyName, $textarea.css(propertyName));
                }

                return $clone.insertBefore($textarea);
            })();

            var adjustHeightIfNeeded = function() {
                var $textarea = $(this);
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