var Config = require('seedit-config'),
	$ = require('jquery');
require('./style.css');
var domain = Config.getMainDomain();
if (/localhost|bzdev/.test(domain)) {
	domain = 'office.bzdev.net';
}
var tpl = require('./tpl.tpl');

function seeditCityPc(o) {
	o.level = o.level || 4;
	var _this = this;
	this.$target = $(o.target);
	// 层次
	$(tpl).slice(0, o.level).appendTo(this.$target);
	this.$target.find('.mk-city').html('<select><option>城市</option></select>');
	this.renderTo(0);
};

var Eventor = require('eventor');
Eventor.mixTo(seeditCityPc);

var proto = seeditCityPc.prototype;

var defaultList = ['省份', '城市', '区', '街道'];

proto.renderTo = function(upid, target) {
	var _this = this;
	_getByUpid(upid || 0, function(data) {

		// 北京，天津等没有下一级
		// 如果从有4级的到只有3级的，应该清除select
		if (!data[0]) {
			return $(target).html('');
		};

		data.unshift({
			id: '',
			name: data[0] ? defaultList[data[0].level - 1] : '---',
			level: 0
		});
		var html = '<select>';
		for (var i = 0; i < data.length; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].name + '</option>'
		}
		html += '</select>';
		var _target = null;

		if (target) {
			_target = target;
		} else {
			_target = _this.$target.find('.mk-province')
		}
		$(_target).html(html);
		$(_target).find('select').on('change', function() {
			_this.onChange(this);
		});
	});
}

proto.getValue = function() {
	return this.$target.find('select').map(function() {
		return {
			name: $(this).find('option:selected').text(),
			id: $(this).val() * 1
		};
	}).toArray();
};

proto.onChange = function(element) {
	var _this = this;
	var target = $(element).closest('div').next();
	//@todo 缓存一下下个select
	if (target.length) {
		var upid = $(element).val();
		if (upid * 1 === 0) {
			return;
		}
		_this.renderTo(upid, target);
	} else {
		// 不存在下一个，最后一个变化时emit change
		_this.emit('change', _this.getValue());
	}
};

function _getByUpid(upid, fn) {
	$.ajax({
		type: 'GET',
		url: 'http://common.' + domain + '/bbs/common_district.jsonp',
		data: {
			upid: upid || 0
		},
		dataType: 'jsonp',
		jsonp: '__c',
		xhrFields: {
			withCredentials: true
		},
		success: function(data) {
			fn && fn(data.data);
		},
		error: function(e) {
			console.error(e + '错误，无法正常获取数据');
		}
	});
};

module.exports = seeditCityPc;