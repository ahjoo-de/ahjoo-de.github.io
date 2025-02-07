---
layout: post
title: Catalog Item Snippets 2024
tags:
- ServiceNow
- ServiceCatalog
- Script
---

# Catalog Item Snippets

This is a collection of snippets i used in catalog items in the last year.

## Overview
[Populate Multi Row Variable Set](#populate-a-field-in-a-multi-row-variable-set-with-the-infromation-from-a-variable-outside-of-that-set) /
[Reference Qualifier for dependent Variables](#reference-qualifier-for-dependent-variables)

## Populate a field in a Multi-Row Variable Set with the Infromation from a Variable outside of that Set.

### What is needed

* Variable1
* Variable Set
    * Variable2
    * Variable3
* Catalog Client Sript in Catalog Item
* Catalog Client Script in Variable Set

#### Catalog Client Sript in Catalog Item

* UI Type: All
* Type: onLoad

Script:

```javascript
function onLoad() {
    this.my_g_form = g_form;
}
```

#### Catalog Client Script in Variable Set

* UI Type: All
* Type: onLoad

```javascript
function onLoad() {
    if(this.my_g_form) {
        g_form.setValue('Variable2', this.my_g_form.getValue('Variable1'))
    }
}
```

## Reference Qualifier for dependent Variables

### Prerequisites

* variable1 - Reference x_table1
* variable2 - Reference x_table2
* value1 a Field in x_table2 referencing to a record in x_table1

### Type Specifications *variable2*

* Reference: x_table1
* Use reference qualifier: advanced
* Reference qualifier: `javasripct:'value1='+current.variables.variable1`{:.language-javascript .highlight}
* Variable attributes: `ref_qual_elements=variable1`{:.language-javascript .highlight}



