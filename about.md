---
layout: character
title: The characters page
---

<ul>
    {% for character in site.data.characters%}
        <li><a href="">{{ character.name }}</a></li>
    {% endfor %}
</ul>