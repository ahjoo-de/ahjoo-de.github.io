---
layout: page # or your preferred layout
title: ServiceNow Posts
show-title: false
---

<h3>ServiceNow Posts</h3>

{% for post in site.categories.ServiceNow %}
  <article class="post-preview">
    <h2>
      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </h2>
    <p>{{ post.description }}</p>
    <p>{{ post.excerpt }}</p>
    <a href="{{ post.url | relative_url }}">Read More</a>
  </article>
{% endfor %}