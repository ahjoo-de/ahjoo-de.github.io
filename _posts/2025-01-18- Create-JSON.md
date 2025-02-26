---
layout: post
title: Custom Action for JSON creation
categories:
- ServiceNow
tags:
- servicenow
- flowdesigner
- json
- script
---

How to create a custom action fro the use in Flow Designer to create a JSON out of different Data sources within the flow.

## Situation

You have a flow where you need to parse the data from different sources, which one of those is an array with n records in it, into a JSON to pass it to another application (in this case it was the Ansible Spoke to run a Job Template)

## Prerequesites

We will create a custom action with several inputs and one output.

### Inputs

| Label | Name | Type |
| --- | --- |--- |
| Value 1 | value1 |Reference |
| Value 2 | value2 |Array (arrayValue1[^1], arrayValue2) |
| Value 3 | value3 |String |
| Value 4 | value4 |String |
| Value 5 | value5 |Integer |

[^1]: arrayValue1 is a sysID referencing to table x_array_table

### Script Step

#### Input Variables

| Name          | Value          | __Type__   |
| ------------- | -------------- |----------- |
| Input1        | value1.input1  |__Integer__ |
| Input2        | value1.input2  |__String__  |
| Input3        | value1.input3  |__String__  |
| Input4        | value1.input4  |__String__  |
| Input5        | value1.input5  |__Integer__ |
| Input6        | value1.input6  |__Integer__ |
| Input7        | value2         |__Array__   |
| Input8        | value3         |__String__  |
| Input9        | value4         |__String__  |
| Input10       | value5         |__Integer__ |


#### Script

```javascript

(function execute(inputs, outputs) {
  
    var jsonObj = {};
    var recordsArray = [];
    var input7Array = inputs.input7;

    for (var i = 0 < input7Array.lenght; i++) {
        var obj = input7Array[i];
        var sysId = obj.arrayValue1;
        var record = new GlideRecord('x_array_table');
        if (record.get(sysId)) {
            var recordObj = {
                "array_value_name": record.getValue('name'),
                "array_value_id": isNaN(obj.arrayValue2) ? obj.arrayValue2 : parseInt(obj.arrayValue2)
            };
            recordsArray.push(recordObj);
        } else {
            recordsArray.push({"sys_id": sysId, "error": "Record not found"});
        }
    }

    jsonObj = {
                "output1": isNan(inputs.Input1) ? inputs.Input1 : parseInt(inputs.Input1),
                "output2": inputs.Input2,
                "output3": inputs.Input3,
                "output4": inputs.Input4,
                "output5": inputs.Input7,
                "output6": inputs.Input8,
                "output7": inputs.Input9,
                "output8": isNan(inputs.Input5) ? inputs.Input5 : parseInt(inputs.Input5),
                "output9": isNan(inputs.Input6) ? inputs.Input6 : parseInt(inputs.Input6),
                "output10": recordsArray
               };

    outputs.output = JSON.stringify(jsonObj);

})(inputs, outputs);

```

#### Output Variables

| Label         | Name           | Type       |
| ------------- | -------------- |----------- |
| output        | output         |JSON        |


### Outputs

| Label         | Value                |
| ------------- | -------------------- |
| json          | script step > output |

