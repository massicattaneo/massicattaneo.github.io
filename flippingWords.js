



var flippingWords = group.extend({

    _wordsArr: ["             ", "             ",
        "T            ",
        "TH           ",
        "THA          ",
        "THAN         ",
        "THANK        ",
        "THANKS       ",        
        "THANKS T     ",
        "THANKS TO    ",
        "THANKS TO Y  ",
        "THANKS TO YO ",
        "THANKS TO YOU",
        "THANKS TO YOT",
        "THANKS TO YOT",
        "THANKS TO LOT",
        "THANKS TA LOT",
        "THANKSY A LOT",
        "THANKOY A LOT",
        "THANJOY A LOT",
        "THANJOY A LOT",
        "T ENJOY A LOT",
        "I ENJOY A LOT",
        "WORK WITH YOU",
        "WORK WI H YOU",
        "WORK W  H YOU",
        "WORK      YOU",
        "WOR       YOU",
        "W           U",
        "             ",
        "THIS IS MAGIC",
        
    ],

    constructor: function (options, elem) {
        this.options = $.extend({}, this.options,
            /* private default object settings */
            {
                countDownAnimate: true,				// If true aniamte the flipboxes                
                count: 13
            }
        );
        this.base(options, elem);
        this.wrapper.addClass(this.options.idPrefix + "countDown");
        this._setUpcountDown();
    },

    _setUpcountDown: function () {        
        this._createWords();
        this._setValues();
        this._bindEvents();
    },

    advanceWord: function () {
        var _self = this;
        _self.sequence++;
        setTimeout(function () { _self._setValues() }, 200);
        for (var i = 0; i < this.options.count; i++) {
            if (_self._wordsArr[_self.sequence].split("")[i] != _self._wordsArr[(_self.sequence + 1)].split("")[i]) {
                _self._advanceFlipBox(_self[i], _self.options.countDownAnimate);
            }
        }        
    },
    sequence: 0,
    _bindEvents: function () {
        var _self = this;
        for (var i = 0; i < this.options.count; i++) {
            _self[i].addClass("play");
        }

    },

    /* set the correct values for the inner HTML */
    _setValues: function () {
        var _self = this;
        for (var i = 0; i < this.options.count; i++) {          
            this._setFlipBoxValue(i, _self._wordsArr[_self.sequence].split("")[i], _self._wordsArr[(_self.sequence + 1)].split("")[i]);
        }
    },

    /* create the HTML countDown objects */
    _createWords: function () {
        for (var i = 0; i < this.options.count; i++) {            
            this._createFlipBoxStructure(i);
        }
    },

    /* refresh the graphics element */
    refresh: function () {
        this.base();
        this._setUpcountDown();
    }

});
flippingWords.implement(IflipBox);

$(function () {
    $.fn.flippingWords = function (/* (object) properties will be merge into jQuery component settings */ options) {
        if (this.length) {
            return this.each(function () {
                var myObj = new flippingWords(options, this);
                $.data(this, 'flippingWords', myObj);
            });
        }
    };
});
