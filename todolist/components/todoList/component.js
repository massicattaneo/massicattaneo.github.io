components
    .create('todoList', function () {
        var todoList = Class.extend(Component).create({
            constructor: function (htmlNode, data) {
                this.super(htmlNode, data);
                this.on('todo:remove', this.removeTodo);
                this.on('todo:drag', this.moveTodo);
                this.on('todoAdd:add', this.addTodo);
                this.on('todoInfoBar:showModeChange', this.showModeChange);
                this.on('todoInfoBar:clearCompleted', this.clearCompleted);
                this.trigger('size', this.listSize());
            },
            removeTodo: function(node) {
                this.htmlNode.removeChild(node.htmlNode);
                this.model.get('todos').removeAt(this.get('todos').indexOf(node));
                var removed = this.get('todos').removeItem(node);
                this.trigger('size', this.listSize());
                return removed;
            },
            listSize: function () {
                return this.get('todos').size().toString();
            },
            addTodo: function(string) {
                var model = new Model({label: string, completed: false});
                this.model.get('todos').add(model);
                this.get('todos').newItem(model);
                this.trigger('size', this.listSize());
            },
            showModeChange: function(className) {
                this.removeClass('completed', 'active');
                this.addClass(className);
            },

            clearCompleted: function() {
                var self = this;
                this.get('todos').clone().each(function (index, key, item) {
                    if (item.hasClass('completed')) {
                        self.removeTodo(item);
                    }
                });
                this.trigger('size', this.listSize());
            },
            moveTodo: function (event, todoItem, offsetY, offsetX) {
                var nodeHeight = todoItem.css('height');
                if (Math.abs(offsetY) > nodeHeight) {
                    var swapNumber = Math.round(offsetY / nodeHeight);
                    var position = this.get('todos').indexOf(todoItem);
                    var newPosition = position + swapNumber;
                    if (newPosition >= 0 && newPosition < this.get('todos').size()) {
                        this.htmlNode.insertBefore(todoItem.htmlNode, this.htmlNode.children[newPosition + ((swapNumber > 0) ? 1 : 0)]);
                        this.get('todos').swap(position, newPosition);
                        this.model.get('todos').swap(position, newPosition);
                        todoItem.css('top', 0);
                        todoItem.__drag.startY = todoItem.css('top') + (event.clientY - todoItem.css('top'));
                    }
                }
            }

        });
        return todoList;
    });