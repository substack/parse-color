var convert = require('color-convert');

module.exports = function (cstr) {
    var m, conv, parts;
    if (m = /^(rgba?|hs[lv]|cmyk|xyz|lab)\s*\(([^\)]*)\)/.exec(cstr)) {
        conv = convert[m[1]];
        parts = m[2].replace(/^\s+|\s+$/g, '')
            .split(/\s*,\s*/)
            .map(function (x) {
                if (/%$/.test(x)) return parseFloat(x) / 100;
                return parseFloat(x);
            })
        ;
        conv[m[1]] = function () { return parts };
    }
    else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        parts = cstr.split(/(..)/).filter(Boolean).map(function (x) {
            return parseInt(x, 16);
        });
        if (!parts[0]) parts[0] = 0;
        if (!parts[1]) parts[1] = 0;
        if (!parts[2]) parts[2] = 0;
    }
    else {
        conv = convert.keyword;
        conv.keyword = function () { return cstr };
        parts = cstr;
    }
    
    var res = {
        rgb: undefined,
        hsl: undefined,
        hsv: undefined,
        cmyk: undefined,
        keyword: undefined
    };
    try { res.rgb = conv.rgb(parts) } catch (e) {}
    try { res.hsl = conv.hsl(parts) } catch (e) {}
    try { res.hsv = conv.hsv(parts) } catch (e) {}
    try { res.cmyk = conv.cmyk(parts) } catch (e) {}
    try { res.keyword = conv.keyword(parts) } catch (e) {}
    return res;
};
