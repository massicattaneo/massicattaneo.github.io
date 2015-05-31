components
    .imports('menu')
    .create('submenu', function (Menu) {
        var c = Class.extend(Menu).create({

        });
        return c;
    });
components.
    create('menuitem', function () {
        var c = Class.extend(Component).create({
            clickItem: false,
            init: function () {
                this.addListener(window, 'click', this.hideMenu);
            },
            showSubmenu: function (event) {
                if (!this.model.get('leaf')) {
                    event.preventDefault();
                    this.clickItem = true;
                    this.toggleClass('active');
                } else {
                    event.stopPropagation();
                }
            },
            hideMenu: function (event) {
                if (!this.clickItem) {
                    this.removeClass('active');
                }
                this.clickItem = false;
            }
        });
        return c;
    });
components.
    create('menu', function () {
        var c = Class.extend(Component).create({
            init: function() {
                this.addListener(window, 'click', this.hideMenu);
            },
            showMenu: function () {
                this.addClass('visible');
            },
            hideMenu: function(event) {
                if (event.getTarget() !== this.get('button').htmlNode) {
                    this.removeClass('visible');
                }
            }
        });
        return c;
    });
components.
    create('jsonmenu', function () {
        var c = Class.extend(Component).create({
            init: function() {

            },
            showSubmenu: function() {
                if (this.model.get('leaf')) {
                    alert('submenu')
                }
            }
        });
        return c;
    });