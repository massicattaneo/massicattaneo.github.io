var templates = {};

templates["todo"] = "<li>\n" +
   "    <div data-item=\"todo\" data-listener=\"drag:mousedown\">\n" +
   "        <input type=\"checkbox\" data-listener=\"toggle:click\" />\n" +
   "        <label data-item=\"label\" data-bind=\"value:label\" data-listener=\"edit:dblclick\"></label>\n" +
   "        <input type=\"text\" data-item=\"edit\" data-listener=\"stopEdit:change,blur\"/>\n" +
   "        <button data-listener=\"remove:click\">X</button>\n" +
   "    </div>\n" +
   "</li>\n" +
   "";

templates["todoAdd"] = "<div>\n" +
   "    <input type=\"text\" data-listener=\"addTodo:change\" placeholder=\"What needs to be done ...\" />\n" +
   "</div>\n" +
   "";

templates["todoInfoBar"] = "<div>\n" +
   "    <span><em data-item=\"leftCount\"></em> Items</span>\n" +
   "    <button data-listener=\"show:click\" data-type=\"\">All</button>\n" +
   "    <button data-listener=\"show:click\" data-type=\"active\">Active</button>\n" +
   "    <button data-listener=\"show:click\" data-type=\"completed\">Completed</button>\n" +
   "    <button data-listener=\"clearCompleted:click\">Clear Completed</button>\n" +
   "    <strong>double click on the todo to edit it - drag item for changing order</strong>\n" +
   "</div>";

templates["todoList"] = "<ul>\n" +
   "    <li data-collection=\"todo:todos\"></li>\n" +
   "</ul>\n" +
   "";
