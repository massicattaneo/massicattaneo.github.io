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