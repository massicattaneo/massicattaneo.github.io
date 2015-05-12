components
    .create('card', function () {
        var c = Class.extend(Component).create({
            constructor: function (htmlNode, data) {
                this.super(htmlNode, data);
            },
            flip: function(event) {
                this.get('faces').toggleClass('hidden');
            }
        });
        return c;
    });
components
    .create('board', function () {
        var c = Class.extend(Component).create({
            constructor: function (htmlNode, data) {
                this.super(htmlNode, data);
            }
        });
        return c;
    });