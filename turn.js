(function($) {

'use strict';

var has3d,
    vendor = '',
    VENDOR_PREFIXES = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    HEAD = document.getElementsByTagName('head')[0],
    CSS_PROPERTIES = ['transform', 'transition', 'perspective', 'transform-origin'],
    turnOptions = {
        duration: 600,
        acceleration: true,
        gradients: true,
        autoCenter: false,
        elevation: 50,
        corners: 'forward',
        direction: 'ltr'
    };

function getPrefix() {
    var i, css = document.createElement('div').style;
    for (i = 0; i < VENDOR_PREFIXES.length; i++)
        if (CSS_PROPERTIES[0] in css)
            return '';
        else if ((VENDOR_PREFIXES[i] + CSS_PROPERTIES[0].charAt(0).toUpperCase() + CSS_PROPERTIES[0].slice(1)) in css)
            return '-' + VENDOR_PREFIXES[i].toLowerCase() + '-';
    return '';
}

vendor = getPrefix();
has3d = ('WebkitPerspective' in document.body.style || 'MozPerspective' in document.body.style || 'OPerspective' in document.body.style || 'msPerspective' in document.body.style);

$.fn.transform = function(transform) {
    return this.css(vendor + 'transform', transform);
};

$.fn.transition = function(value) {
    return this.css(vendor + 'transition', value);
};

$.fn.turn = function(options) {
    var that = this,
        data = this.data();

    if (!data.turn) {

        data.turn = {
            pages: this.children().length,
            display: options.display || turnOptions.display,
            direction: options.direction || turnOptions.direction,
            corners: options.corners || turnOptions.corners,
            acceleration: (has3d && options.acceleration) || turnOptions.acceleration,
            gradients: options.gradients || turnOptions.gradients,
            elevation: options.elevation || turnOptions.elevation,
            pageObjs: {},
            pageWrap: {}
        };

        this.css({ position: 'relative', width: options.width, height: options.height });

        this.children().each(function(i, el) {
            $(el).css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                overflow: 'hidden'
            }).addClass('turn-page');
        });

        this.turn('page', 1);
    }

    return this;
};

$.fn.turn.extend = function() {
    var i, obj = {};
    for (i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        for (var k in arg) {
            if (Object.prototype.hasOwnProperty.call(arg, k)) {
                obj[k] = arg[k];
            }
        }
    }
    return obj;
};

})(jQuery);
