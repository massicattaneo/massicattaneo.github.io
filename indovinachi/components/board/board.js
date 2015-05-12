components
    .create('board', function () {
        var c = Class.extend(Component).create({
            constructor: function (htmlNode, data) {
                this.super(htmlNode, data);
            }
        });
        return c;
    });