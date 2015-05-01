var templates = {};

templates["board"] = "<div>\n" +
   "    <ul>\n" +
   "        <li data-collection=\"card:cards\"></li>\n" +
   "    </ul>\n" +
   "    <div style=\"clear:both;\"></div>\n" +
   "</div>\n" +
   "";

templates["card"] = "<li onclick=\"this.getElementsByTagName('div')[0].className = 'selected'\">\n" +
   "    <img src=\"images/1.png\" class=\"photo\" />\n" +
   "    <span class=\"label\" data-item=\"label\">LABEL</span>\n" +
   "    <div data-item=\"selected\">X</div>\n" +
   "</li>";
