interfaces.create('drag', function () {
    var moveEvent;

    var MoveAxis = Class.create({
        constructor: function (direction) {
            this.direction = direction.toUpperCase();
            this.axis = (this.direction === 'X') ? 0 : 1;
            this.moved = false;
        },
        setMouseStart: function() {
            this.mouseStart = arguments[this.axis];
        },
        setStartPosition: function() {
            this.startPosition = arguments[this.axis];
        },
        cssRule: function() {
            return (this.direction === 'X') ? 'left' : 'top';
        },
        setOffsetFrom: function() {
            this.offset = arguments[this.axis] - this.mouseStart;
            if (this.offset > 15) {
                this.moved = true;
            }
        },
        hasMoved: function() {
            return this.moved;
        }
    });

    var MoveEvent = Class.CollectionOf(MoveAxis).create({
        constructor: function(axes) {
            this.parent();
            var array = axes.split('');
            for (var i=0; i<array.length; i++) {
                this.add(new MoveAxis(array[i]), array[i].toUpperCase());
            }
        },
        setMouseStart: function(x, y) {
            this.each(function (i, k, axis) {
                axis.setMouseStart(x, y);
            });
        },
        setStartPosition: function(x, y) {
            this.each(function (i, k, axis) {
                axis.setStartPosition(x, y);
            });
        },
        setOffsetFrom: function (x, y) {
            this.each(function (i, k, axis) {
                axis.setOffsetFrom(x, y);
            });
        },
        hasMoved: function (direction) {
            return (this.get(direction)) ? this.get(direction).hasMoved() : false;
        },
        moveToOffset: function(node) {
            this.each(function (i, k, axis) {
                node.css(axis.cssRule(), axis.startPosition + axis.offset);
            });
        },
        moveToStartPosition: function(node) {
            this.each(function (i, k, axis) {
                node.css(axis.cssRule(), axis.startPosition);
            });
        }
    });

    var dragEnd = function(event) {
        event.preventDefault();
        event.stopPropagation();
        var draggedItem = (this.attribute('data-drag')) ? this.component.get(this.attribute('data-drag')) : this.component;
        draggedItem.removeClass('interfaces','dragging');
        this.removeListener(document, 'mouseup', dragEnd);
        this.removeListener(document, 'mousemove', dragMove);
        moveEvent.moveToStartPosition(draggedItem);
    };

    var dragMove = function(event) {
        event.preventDefault();
        event.stopPropagation();
        var draggedItem = (this.attribute('data-drag')) ? this.component.get(this.attribute('data-drag')) : this.component;
        moveEvent.setOffsetFrom(event.clientX, event.clientY);
        moveEvent.moveToOffset(draggedItem);
        this.trigger('interface:drag', event, this.component, moveEvent);
    };

    var dragStart = function(event) {
        event.preventDefault();
        var draggedItem = (this.attribute('data-drag')) ? this.component.get(this.attribute('data-drag')) : this.component;
        draggedItem.addClass('interfaces','dragging');
        moveEvent = new MoveEvent(this.attribute('data-axis') || 'XY');
        moveEvent.setMouseStart(event.clientX, event.clientY);
        moveEvent.setStartPosition(draggedItem.css('left'), draggedItem.css('top'));
        this.addListener(document, 'mouseup', dragEnd);
        this.addListener(document, 'mousemove', dragMove);
    };

    var click = function (event) {
        if (moveEvent.hasMoved('X') || moveEvent.hasMoved('Y'))  {
            event.preventDefault();
        }
    }

    return function() {
        this.addClass('interfaces', 'dragger');
        this.addListener(this.htmlNode, 'mousedown', dragStart);
        this.addListener(this.htmlNode, 'click', click);
    }

});