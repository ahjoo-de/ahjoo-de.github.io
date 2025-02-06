---
layout: post
title: Very First Post
---

This is my very first post on this blog!

> Helpful advice for doing things better or more easily.


```yaml linenos

(function transformEntry(source, target, map, log /*undefined onStart*/ ) {

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

    // Add your code here

})(source, target, map, log);

```
