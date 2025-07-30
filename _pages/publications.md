---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% comment %}
  =============================================================================
  Publications Page
  =============================================================================
  
  This page displays all publications from the _publications collection.
  Publications are displayed in reverse chronological order (newest first).
  =============================================================================
{% endcomment %}

{% comment %}Display Google Scholar link if available{% endcomment %}
{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% comment %}Loop through all publications in reverse chronological order{% endcomment %}
{% for post in site.publications reversed %}
  {% include archive-single.html %}   
{% endfor %}
