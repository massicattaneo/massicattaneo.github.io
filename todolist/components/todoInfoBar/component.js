components
    .create('todoInfoBar', function () {
        var c = Class.extend(Component).create({
            constructor: function (htmlNode, data) {
                this.super(htmlNode, data);
                this.on('todoList:size', this.sizeChange);
            },
            sizeChange: function(size) {
                this.get('leftCount').value(size);
            },
            show: function (event) {
                this.trigger('showModeChange', event.target.getAttribute('data-type') || '');
            },
            clearCompleted: function () {
                this.trigger('clearCompleted');
            }
        });
        return c;
    });