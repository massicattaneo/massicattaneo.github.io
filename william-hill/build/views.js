var views = {};

views["jsonmenu"] = "<ul>\n" +
   "    <li data-collection=\"menuitem:menu\"></li>\n" +
   "</ul>";

views["menu:550"] = "<nav>\n" +
   "    <div data-listener=\"showMenu:click\" data-item=\"button\" class=\"button\">MENU</div>\n" +
   "    <ul data-listener=\"hideMenu:click\">\n" +
   "        <li>Link 1</li>\n" +
   "        <li>Link 2</li>\n" +
   "        <li>Awkward Long link</li>\n" +
   "        <li>Link 3</li>\n" +
   "        <li>Link 5</li>\n" +
   "    </ul>\n" +
   "</nav>";

views["menu"] = "<nav>\n" +
   "    <ul>\n" +
   "        <li>Link 1</li>\n" +
   "        <li>Link 2</li>\n" +
   "        <li>Awkward Long link</li>\n" +
   "        <li>Link 3</li>\n" +
   "        <li>Link 5</li>\n" +
   "    </ul>\n" +
   "</nav>";

views["menuitem"] = "<li data-listener=\"showSubmenu:click\">\n" +
   "    <a data-bind=\"id:id,value:description,class:cssClass,href:content\"></a>\n" +
   "    <ul>\n" +
   "        <li data-collection=\"menuitem:menu\"></li>\n" +
   "    </ul>\n" +
   "</li>";

views["submenu:550"] = "<nav>\n" +
   "    <div class=\"button\" data-item=\"button\" data-listener=\"showMenu:click\">SUBMENU</div>\n" +
   "    <ul data-listener=\"hideMenu:click\">\n" +
   "        <li>Item 1</li>\n" +
   "        <li>Item 2</li>\n" +
   "        <li>Item 3</li>\n" +
   "        <li>Item 4</li>\n" +
   "        <li>Item 5</li>\n" +
   "        <li>Item 6</li>\n" +
   "        <li>Item 7</li>\n" +
   "        <li>Item 8</li>\n" +
   "    </ul>\n" +
   "</nav>";

views["submenu"] = "<nav>\n" +
   "    <ul>\n" +
   "        <li>Item 1</li>\n" +
   "        <li>Item 2</li>\n" +
   "        <li>Item 3</li>\n" +
   "        <li>Item 4</li>\n" +
   "        <li>Item 5</li>\n" +
   "        <li>Item 6</li>\n" +
   "        <li>Item 7</li>\n" +
   "        <li>Item 8</li>\n" +
   "    </ul>\n" +
   "</nav>";
