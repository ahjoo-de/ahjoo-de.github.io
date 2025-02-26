---
layout: post
title: Transform Map Scripts
categories:
- ServiceNow
tags:
- transformmap
- script
---
This is a collection of snippets i used in catalog items in the last year.

## Overview
[Transform Map Script Reference Product ID](#reference-product-id)   
[Combine Name & Version](#script-to-combine-name--version-into-one-field)

## Reference Product ID

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

## Script to combine Name & Version into one Field

### Prerequisites

In the Service table (cmdb_ci_service) a custom field u_product_id was added to identify the product for the service.  

In a custom table (x_table1) the service is linked in a reference field called u_product, this references a record in the Service Table with class=service

The file for CSV import only contains the product id as an integer, so the script has to find the correct record to reference to.

### Script

```javascript
(function transformEntry(source, target, map, log){

  if (source.u_name && source.u_provider_version) {
    target.name = source.u_name + ' v' + source.u_provider_version;
    } else {
      log.error ('Missing fields: api_name or Provider version. Api Name:' source.u_name ' provider_version:' source.u_provider_version)
    }
  })(source,target,map,log);
  ```
