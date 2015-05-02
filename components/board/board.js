components
    .imports('Component')
    .create('Board', function (Component) {
        var Board = Class.extend(Component).create({
            constructor: function (htmlNode) {
                this.super(htmlNode);
            }
        });
        return Board;
    });