var templates = {};

templates["board"] = "<div>\n" +
   "    <div class=\"${color}\">\n" +
   "        <ul>\n" +
   "            <li data-collection=\"card:cards\"></li>\n" +
   "        </ul>\n" +
   "        <div style=\"clear:both;\"></div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "";

templates["card"] = "<li>\n" +
   "    <div data-listener=\"flip:click\">\n" +
   "        <div data-item=\"faces\">\n" +
   "            <figure class=\"front\">\n" +
   "                <div style=\"display: block; position: relative;\">\n" +
   "                    <img data-bind=\"src:imagepath\" class=\"photo\" />\n" +
   "                    <span data-bind=\"value:fullname\"></span>\n" +
   "                </div>\n" +
   "            </figure>\n" +
   "            <figure class=\"back\">\n" +
   "                <div>\n" +
   "                    ?\n" +
   "                </div>\n" +
   "            </figure>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</li>";
