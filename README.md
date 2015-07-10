# seedit-city-pc [![spm version](https://moekit.timo.today/badge/seedit-city-pc)](https://moekit.timo.today/package/seedit-city-pc)

---


## Usage

```js
var seeditCityPc = require('seedit-city-pc');
// use seeditCityPc
```

## API

### getValue

获取值，返回数组：

```json
[{
	id: 2,
	name: "天津市"
}, {
	id: 56,
	name: "河东区"
}]
```

## Events

### change

监听变化，事件参数和`getValue`一致

### provinceChange

监听省份变化，参数：

```
{
	name:"北京",
	id:1
}
```

当省份不选择时，参数：
```
{
	name:"全部",
	id:0
}
```