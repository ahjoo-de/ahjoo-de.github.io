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
[Reference Qualifier for dependent Variables (advanced Version)](#reference-qualifier-for-dependent-variables-advanced-version)  

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

## Transform Map Script Reference Product ID

### Prerequisites

In the Service table (cmdb_ci_service) a custom field u_product_id was added to identify the product for the service.  

In a custom table (x_table1) the service is linked in a reference field called u_product, this references a record in the Service Table with class=service

The file for CSV import only contains the product id as an integer, so the script has to find the correct record to reference to.

### Script

```javascript
(function transformEntry(source, target, map, log) {

    log. info('u_cutsomer_coria_id value: ' + source.u_customer_coria_id);

    if (source.u_customer_coria_id) {
        var serviceGR = new GlideRecord('cmdb_ci_service');
        serviceGR.addQuery('u_coria_id', source.u_customer_coria_id);
        serviceGR.addQuery('sys_class_name', 'cmdb_ci_service');
        serviceGR.query();

        if (serviceGR.next()){
            target.customer_coria_id = serviceGR.sys_id;
        } else {
            log.error('No matching service found for u_customer_coria_id: ' + source.u_customer_coria_id)
        }
    }
})(source, target, map, log);
```
