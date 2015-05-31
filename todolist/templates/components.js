components
    .imports('todo')
    .create('todoList', function (Todo) {
        var todoList = Class.extend(Component).create({
            init: function () {
                this.on('todo:remove', this.removeTodo);
                this.on('interface:drag', this.moveTodo);
                this.on('todoAdd:add', this.addTodo);
                this.on('todoInfoBar:showModeChange', this.showModeChange);
                this.on('todoInfoBar:clearCompleted', this.clearCompleted);
                this.trigger('size', this.listSize());
            },
            removeTodo: function(node) {
                this.htmlNode.removeChild(node.htmlNode);
                var index = this.get('todos').indexOf(node);
                this.model.get('todos').removeAt(index);
                var removed = this.get('todos').removeAt(index);
                this.trigger('size', this.listSize());
                return removed;
            },
            listSize: function () {
                return this.get('todos').size().toString();
            },
            addTodo: function(string) {
                var model = this.model.get('todos').newItem({label: string, completed: false});
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
            moveTodo: function (event, todoItem, moveEvent) {
                if (todoItem instanceof Todo) {
                    var nodeHeight = todoItem.css('height');
                    var y = moveEvent.get('Y');
                    if (Math.abs(y.offset) > nodeHeight) {
                        var swapNumber = Math.round(y.offset / nodeHeight);
                        var todos = this.get('todos');
                        var position = todos.indexOf(todoItem);
                        var newPosition = position + swapNumber;
                        if (newPosition >= 0 && newPosition < todos.size()) {
                            this.htmlNode.insertBefore(todoItem.htmlNode, this.htmlNode.children[newPosition + ((swapNumber > 0) ? 1 : 0)]);
                            todos.swap(position, newPosition);
                            this.model.get('todos').swap(position, newPosition);
                            todoItem.css('top', 0);
                            y.mouseStart = event.clientY;
                        }
                    }
                }
            }

        });
        return todoList;
    });
components
    .create('todoInfoBar', function () {
        var c = Class.extend(Component).create({
            init: function () {
                this.on('todoList:size', this.sizeChange);
            },
            sizeChange: function(size) {
                this.get('leftCount').value(size);
            },
            show: function (event) {
                this.trigger('showModeChange', event.getTarget().getAttribute('data-type'));
            },
            clearCompleted: function () {
                this.trigger('clearCompleted');
            }
        });
        return c;
    });
components
    .create('todoAdd', function () {
        var c = Class.extend(Component).create({
            addTodo: function(event) {
                if (event.getTarget().value !== '' && event.keyCode === 13) {
                    this.trigger('add', event.getTarget().value);
                    event.getTarget().value = '';
                }
            }
        });
        return c;
    });
components
    .create('todo', function () {
        var todo = Class.extend(Component).create({
            toggle: function () {
                this.toggleClass('completed');
                this.model.set('completed', !this.model.get('completed'));
            },
            remove: function() {
                this.trigger('remove', this);
            },
            edit: function (event) {
                event.stopPropagation();
                this.addClass('edit');
                this.get('edit').value(this.get('label').value());
                this.get('edit').focus();
            },
            stopEdit: function () {
                this.removeClass('edit');
                this.get('label').value(this.get('edit').value());
                this.model.set('label', this.get('edit').value());
            }
        });
        return todo;
    });