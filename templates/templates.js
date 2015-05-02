var templates = {};

templates["board"] = "<div>\n" +
   "    <ul>\n" +
   "        <li data-collection=\"card:cards\"></li>\n" +
   "    </ul>\n" +
   "    <div style=\"clear:both;\"></div>\n" +
   "</div>\n" +
   "";

templates["card"] = "<li onclick=\"setSelected(this)\">\n" +
   "    <div>\n" +
   "        <figure class=\"front\">\n" +
   "            <div style=\"display: block; position: relative;\">\n" +
   "                <img src=\"images/1.png\" class=\"photo\" />\n" +
   "                <span class=\"label\" data-item=\"label\">LABEL</span>\n" +
   "            </div>\n" +
   "        </figure>\n" +
   "        <figure class=\"back\">\n" +
   "            <div>\n" +
   "                ?\n" +
   "            </div>\n" +
   "        </figure>\n" +
   "    </div>\n" +
   "</li>";
