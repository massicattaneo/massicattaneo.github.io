components
    .imports('Component')
    .create('Card', function (Component) {
        var Card = Class.extend(Component).create({
            constructor: function (htmlNode) {
                this.super(htmlNode);
            }
        });
        return Card;
    });
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