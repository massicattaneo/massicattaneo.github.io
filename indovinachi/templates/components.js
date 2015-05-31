components
    .create('card', function () {
        var c = Class.extend(Component).create({
            flip: function() {
                this.get('faces').toggleClass('hidden');
            }
        });
        return c;
    });
components
    .create('board', function () {
        var c = Class.extend(Component).create({

        });
        return c;
    });