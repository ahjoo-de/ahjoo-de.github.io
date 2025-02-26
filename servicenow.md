---
layout: page # or your preferred layout
title: ServiceNow
show_title: false
---

<h3>ServiceNow Posts</h3>

{% for post in site.categories.ServiceNow %}
  <article class="post-preview">
    <h4>
      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </h4>
    <p>{{ post.description }}</p>
    <p>{{ post.excerpt }}</p>
    <a href="{{ post.url | relative_url }}">Read More</a>
  </article>
{% endfor %}