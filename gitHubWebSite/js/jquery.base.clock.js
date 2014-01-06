/// <reference path="Base.js" />
/// <reference path="jquery-1.7.2.min.js" />
/// <reference path="prototypes.js" />

/********************************************************************************** Base Clock object *********************************************************************************/
var clock = Base.extend({

    // jQuery general object
    el: $(),

    // jQuery default settings
    options: {
        startDate: new Date(),
        endDate: new Date()
    },

    flipElems: [],
    nameArray: ["script", "stript", "stripe", "strike", "stroke", "strove", "shrove", "shrive", "shrine", "serine", "sering", "sewing", "sawing", "saving", "saying", "spying", "spring", "string", "strine", "strike", "stripe", "stript", "script", ],
    posArray:1,
    constructor: function (options, elem) {
        this.options = $.extend({}, this.options, options);
        this.el = $(elem);
        this.activeDate = (this.options.startDate) ? this.options.startDate : new Date();
        this.beforeDate = (this.options.startDate) ? this.options.startDate : new Date();
        this.serverGapTime = Math.round((new Date().getTime() - this.activeDate));
        this.activeDate = new Date(new Date().getTime() - this.serverGapTime + 1000);
        this._createClock();
        this.beforeDate = this.options.endDate;
        this._setLetters();
        this.beforeDate = this.activeDate;
        this._startClock();
    },

    /* starts the clock */
    _startClock: function () {
        var _self = this;
        for (i = 0; i < this.flipElems.length; i++)
            this.flipElems[i].addClass("play");

        setInterval(function () {
            //_self.beforeDate = _self.activeDate;
            //_self.activeDate = new Date(new Date().getTime() - _self.serverGapTime);
            _self.posArray++;
            if (_self.posArray > _self.nameArray.length-1) _self.posArray = 1;
            setTimeout(function () { _self._setLetters() }, 200);
            for (i = 0; i < _self.flipElems.length; i++)
                if (_self.nameArray[_self.posArray].charAt(i) != _self.nameArray[_self.posArray - 1].charAt(i))
                    _self._advance(_self.flipElems[i]);
            
        }, 4000);

    },

    /* animate the obj passed with adding and removing classes */
    _advance: function (obj) {
        obj = (obj) ? obj : $();
        obj.find(".flip-clock-inactive").removeClass("flip-clock-inactive").addClass("flip-clock-changing");
        obj.find(".flip-clock-before").removeClass("flip-clock-before").addClass("flip-clock-inactive");
        obj.find(".flip-clock-active").removeClass("flip-clock-active").addClass("flip-clock-before");
        obj.find(".flip-clock-changing").removeClass("flip-clock-changing").addClass("flip-clock-active");
    },

    /* set the correct values for the inner HTML */
    _setLetters: function () {
        for (i = 0; i < this.flipElems.length; i++) {
            this.flipElems[i].find(".flip-clock-before .inn").html(this.nameArray[this.posArray-1].charAt(i).toUpperCase());
            this.flipElems[i].find(".flip-clock-active .inn").html(this.nameArray[this.posArray].charAt(i).toUpperCase());
        }
    },

    /* set the correct values for the inner HTML */
    _setDates: function () {
        this.flipElems[0].find(".flip-clock-before .inn").html(this.beforeDate.DiffToDate(this.options.endDate).days);
        this.flipElems[0].find(".flip-clock-active .inn").html(this.activeDate.DiffToDate(this.options.endDate).days);
        this.flipElems[1].find(".flip-clock-before .inn").html(this.beforeDate.DiffToDate(this.options.endDate).hours);
        this.flipElems[1].find(".flip-clock-active .inn").html(this.activeDate.DiffToDate(this.options.endDate).hours);
        this.flipElems[2].find(".flip-clock-before .inn").html(this.beforeDate.DiffToDate(this.options.endDate).minutes);
        this.flipElems[2].find(".flip-clock-active .inn").html(this.activeDate.DiffToDate(this.options.endDate).minutes);
    },

    /* create the HTML clock objects */
    _createClock: function () {
        for (i = 0; i < 6; i++) {
            this.flipElems[i] = $('<ul class="days"/>');
            this._createStructure(this.flipElems[i]);
            this.el.append(this.flipElems[i]);
        }
    },

    /* create the structure for every single number */
    _createStructure: function (obj) {
        obj = (obj) ? obj : $();
        obj.append('<span class="wings left"></span><span class="wings right"></span>');
        obj.append('<li class="flip-clock-inactive"><div><span class="up"><span class="wings left"></span><span class="wings right"></span><span class="shadow"></span><span class="inn">00</span></span><span class="down"><span class="wings left"></span><span class="wings right"></span><span class="shadow"></span><span class="inn">00</span></span></div></li>');
        obj.append('<li class="flip-clock-before"><div><span class="up"><span class="wings left"></span><span class="wings right"></span><span class="shadow"></span><span class="inn">00</span></span><span class="down"><span class="wings left"></span><span class="wings right"></span><span class="shadow"></span><span class="inn">00</span></span></div></li>');
        obj.append('<li class="flip-clock-active"><div><span class="up"><span class="wings left"></span><span class="wings right"></span><span class="shadow"></span><span class="inn">01</span></span><span class="down"><span class="wings left"></span><span class="wings right"></span><span class="shadow"></span><span class="inn">01</span></span></div></li>');
    }
})

/* 
JQUERY OBJECT: clock
Clock (at the moment only countDown from startDate to endDate) 
Properties:
	- startDate: [Date] 
	- endDate: [Date]
*/

$(function () {
    $.fn.clock = function (/* (object) properties will be merge into jQuery component settings */ options) {
        if (this.length) {
            return this.each(function () {
                var myObj = new clock(options, this);
                $.data(this, 'clock', myObj);
            });
        }
    };
});