# Demo

---

## 省市选择

````html
<div id="target-0"></div>
````

````javascript
var seeditCityPc = require('seedit-city-pc');
new seeditCityPc({
	target:'#target-0',
	level:2
}).on('change',function(data){
	console.log(data);
});
````



## 3级

````html
<div id="target-3"></div>
````

````javascript
var seeditCityPc = require('seedit-city-pc');
new seeditCityPc({
	target:'#target-3',
	level:3
});
````

## 4级

````html
<div id="target-4"></div>
````

````javascript
var seeditCityPc = require('seedit-city-pc');
new seeditCityPc({
	target:'#target-4',
	level:4
});
````
