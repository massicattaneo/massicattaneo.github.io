var views = {};

views["todo"] = "<li>\n" +
   "    <span data-implements=\"drag\" data-axis=\"Y\">=</span>\n" +
   "    <input type=\"checkbox\" data-listener=\"toggle:click\" />\n" +
   "    <label data-item=\"label\" data-bind=\"value:label\" data-listener=\"edit:dblclick\"></label>\n" +
   "    <input type=\"text\" data-item=\"edit\" data-listener=\"stopEdit:change,blur\"/>\n" +
   "    <button data-listener=\"remove:click\">X</button>\n" +
   "</li>\n" +
   "";

views["todoAdd"] = "<div>\n" +
   "    <input type=\"text\" data-listener=\"addTodo:keydown\" placeholder=\"What needs to be done ...\" />\n" +
   "</div>\n" +
   "";

views["todoInfoBar"] = "<div>\n" +
   "    <span><em data-item=\"leftCount\"></em> Items</span>\n" +
   "    <button data-listener=\"show:click\" data-type=\"\">All</button>\n" +
   "    <button data-listener=\"show:click\" data-type=\"active\">Active</button>\n" +
   "    <button data-listener=\"show:click\" data-type=\"completed\">Completed</button>\n" +
   "    <button data-listener=\"clearCompleted:click\">Clear Completed</button>\n" +
   "    <strong>double click on the todo to edit it - drag item for changing order</strong>\n" +
   "</div>";

views["todoList"] = "<ul>\n" +
   "    <li data-collection=\"todo:todos\"></li>\n" +
   "</ul>\n" +
   "";
