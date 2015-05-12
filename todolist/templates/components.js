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
components
    .create('todo', function () {
        var todo = Class.extend(Component).create({
            constructor: function (htmlNode, data) {
                this.super(htmlNode, data);
            },
            toggle: function () {
                this.toggleClass('completed');
                this.model.set('completed', !this.model.get('completed'));
            },
            remove: function() {
                this.trigger('remove', this);
            },
            edit: function () {
                this.addClass('edit');
                this.get('edit').value(this.get('label').value());
                this.get('edit').focus();
            },
            stopEdit: function () {
                this.removeClass('edit');
                this.get('label').value(this.get('edit').value());
                this.model.set('label', this.get('edit').value());
            },
            drag: function(event) {
                event.preventDefault();
                this.addClass('interfaces','dragging');
                this.__drag= {};
                this.__drag.startY = this.htmlNode.getBoundingClientRect().top + (event.clientY - this.htmlNode.getBoundingClientRect().top);
                this.__drag.startX = this.htmlNode.getBoundingClientRect().left + (event.clientX - this.htmlNode.getBoundingClientRect().left);
                this.__drag.top = this.css('top');
                this.__drag.left = this.css('left');
                this.addListener(document, 'mouseup', this.dragEnd);
                this.addListener(document, 'mousemove', this.dragMove);
            },
            dragEnd: function() {
                this.removeClass('interfaces','dragging');
                this.removeListener(document, 'mouseup', this.dragEnd);
                this.removeListener(document, 'mousemove', this.dragMove);
                this.css('top', this.__drag.top);
                this.css('left', this.__drag.left);
            },
            dragMove: function(event) {
                event.preventDefault();
                this.__drag.offsetY = event.clientY - this.__drag.startY;
                this.__drag.offsetX = event.clientX - this.__drag.startX;
                var offsetY = this.__drag.offsetY;
                var offsetX = this.__drag.offsetX;
                this.css("top", this.__drag.top + offsetY);
                this.css("left", this.__drag.left + offsetX);
                this.trigger('drag', event, this, offsetY, offsetX);
            }
        });
        return todo;
    });