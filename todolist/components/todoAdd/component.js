components
    .create('todoAdd', function () {
        var c = Class.extend(Component).create({
            constructor: function (htmlNode, data) {
                this.super(htmlNode, data);
            },
            addTodo: function(event) {
                if (event.target.value !== '') {
                    this.trigger('add', event.target.value);
                    event.target.value = '';
                }
            }
        });
        return c;
    });