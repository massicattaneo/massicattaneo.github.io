//Prototype Array.indexOf
if (!Array.prototype.indexOf)
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    };
//Prototype.toFixed
if (!Number.prototype.toFixed)
    Number.prototype.toFixed = function (precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(this * power) / power);
    };

//Prototype Number.toCurrency
Number.prototype.toCurrency = function (symbol, dots) {
    symbol = symbol || "";
    dots = dots || false;
    var T, S = new String(Math.round(this * 100));
    while (S.length < 3) { S = '0' + S; }
    if (dots === false) {
        return symbol + S.substr(0, T = (S.length - 2)) + '.' + S.substr(T, 2);
    } else {
        var int = S.substr(0, T = (S.length - 2)).toString();
        for (i = int.length; i > 0; i--) {
            if (i % 3 == 0) {
                int = (int.substr(0, int.length - i)) + ',' + int.substr(int.length - i, int.length);
            }
        }
        return symbol + int + '.' + S.substr(T, 2);
    }
};

//Add 0 numbers n times to an integer number and return a string
//By now it add a 0 only to number from 0 to 9:
//EX.: (1).toStringFix() = "01"
//EX.: (11).toStringFix() = "11"
Number.prototype.toStringFix = function () {
    if (this < 10) return "0" + this.toString();
    else return this.toString()
};

//Prototype Date
Date.prototype.DiffToDate = function (date) {
    var o = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    var difference = (date - this);
    o.days = parseInt(difference / 86400000);
    difference -= (o.days * 86400000);
    o.hours = parseInt(difference / 3600000);
    difference -= (o.hours * 3600000);
    o.minutes = parseInt(difference / 60000);
    difference -= (o.minutes * 60000);
    o.seconds = parseInt(difference / 1000);

    if (o.days <= 0 && o.hours <= 0 && o.minutes <= 0 && o.seconds <= 0) {
        o.days = "00";
        o.hours = "00";
        o.minutes = "00";
        o.seconds = "00";
    } else {
        o.days = o.days < 10 ? '0' + o.days : o.days;
        o.hours = o.hours < 10 ? '0' + o.hours : o.hours;
        o.minutes = o.minutes < 10 ? '0' + o.minutes : o.minutes;
        o.seconds = o.seconds < 10 ? '0' + o.seconds : o.seconds;
    }

    return o;
};

var core = {
    setCookie: function (name, value, exdays, path) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        value = encodeURI(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=" + path;
        document.cookie = name + "=" + value;
    },
    getCookie: function (name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + name + "=");

        if (c_start == -1)
            c_start = c_value.indexOf(name + "=");

        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1)
                c_end = c_value.length;
            c_value = decodeURI(c_value.substring(c_start, c_end));
        }

        return c_value;
    }
}