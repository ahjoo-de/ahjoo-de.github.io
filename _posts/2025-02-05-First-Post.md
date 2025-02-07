---
layout: post
title: Catalog Item Snippets 2024
tags:
- ServiceNow
- ServiceCatalog
- Script
---

This is a collection of snippets i used in catalog items in the last year.

## Overview
[Populate Multi Row Variable Set](#populate-a-field-in-a-multi-row-variable-set-with-the-infromation-from-a-variable-outside-of-that-set)   
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

The selection of records for variable2 should be narrowed down by the value of variable1
> Example: variable1 is "Type". You select type1 for variable1 so only records of Type=type1 in variable 2 should be displayed.

### Type Specifications *variable2*

* Reference: x_table1
* Use reference qualifier: advanced
* Reference qualifier: `javasripct:'value1='+current.variables.variable1`{:.language-javascript .highlight}
* Variable attributes: `ref_qual_elements=variable1`{:.language-javascript .highlight}

## Reference Qualifier for dependent Variables (advanced Version)

### Prerequisites

* variable1 - Reference x_table1
* variable2 - Reference x_table2
* variable3 - Reference x_table3
* value1, value2, value3, value4 fields of type string in x_table3

The selection of records for variable3 should be narrowed down by the values different fields of the records selected for variable1 and variable2


### Type Specifications *variable2*

* Reference: x_table3
* Use reference qualifier: advanced
* Reference qualifier: 
```javasripct
javascript:'value1='+current.variables.variable1.name'^value2='+current.variables.variable1.id'^value3='+current.variables.variable2.version'^value4='+current.variables.variable1.name
```
* Variable attributes: `ref_qual_elements=variable2`{:.language-javascript .highlight}

