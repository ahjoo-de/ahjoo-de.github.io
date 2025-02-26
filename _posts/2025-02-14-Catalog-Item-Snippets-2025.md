---
layout: post
title: Catalog Item Snippets 2025
description: This is a collection of snippets i used in catalog items in the last year.
tags:
- servicenow
- servicecatalog
- script
---

## Overview
[Catalog Client Script Clear MRVS](#populate-a-field-in-a-multi-row-variable-set-with-the-infromation-from-a-variable-outside-of-that-set)   


## Catalog Client Script Clear MRVS

### Prerequisites

In a Catalog item there is a Variable named 'selection'. If you select it, a MRVS named 'items' gets visible. Now you can select the items based on the value of 'selection'. If the user now realizes that he had chosen the wrong value for 'selection' and changes it, the mrvs should be cleared so there are no entries for the wrong 'selection' in there.

#### Catalog Client Sript in Catalog Item

* Applies to: A Catalog item
* UI Type: All
* Type: onChange
* Variable name: selection
* Applies on Catalog Item Vie: true

Script:

```javascript
function onChange(control, oldCalue, newValue, isLoading) {
  if (isLoading || newValue == oldValue) {
    return;
    }
  if(this.my_g_form) {
    g_form.clearValue('operations');
    }
  }
```