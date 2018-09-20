/*!
 * cookiejs v1.0.15
 * Change the cookie library a simple API provides
 * 
 * Copyright (c) 2018 kenny wong
 * https://github.com/jaywcjlove/cookie.js
 * 
 * Licensed under the MIT license.
 */

'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function getKeys(obj) {
  var names = [],
      name = '';

  for (name in obj) {
    if (obj.hasOwnProperty(name)) names.push(name);
  }

  return names;
}

function isPlainObject(value) {
  return !!value && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value) {
  return value instanceof Array;
}

function toArray(value) {
  return Array.prototype.slice.call(value);
}

function Cookie() {
  if (!(this instanceof Cookie)) {
    return new Cookie();
  }
}

Cookie.prototype = {
  get: function get(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';'); //把cookie分割成组    

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]; //取得字符串    

      while (c.charAt(0) == ' ') {
        //判断一下字符串有没有前导空格    
        c = c.substring(1, c.length); //有的话，从第二位开始取    
      } //如果含有我们要的name


      if (c.indexOf(nameEQ) == 0) {
        return decodeURI(c.substring(nameEQ.length, c.length)); //解码并截取我们要值    
      }
    }

    return false;
  },
  set: function set(name, value, options) {
    if (isPlainObject(name)) {
      for (var k in name) {
        if (name.hasOwnProperty(k)) this.set(k, name[k], value);
      }
    } else {
      var opt = isPlainObject(options) ? options : {
        expires: options
      },
          expires = opt.expires !== undefined ? opt.expires : '',
          expiresType = _typeof(expires),
          path = opt.path !== undefined ? ';path=' + opt.path : ';path=/',
          domain = opt.domain ? ';domain=' + opt.domain : '',
          secure = opt.secure ? ';secure' : ''; //过期时间


      if (expiresType === 'string' && expires !== '') expires = new Date(expires);else if (expiresType === 'number') expires = new Date(+new Date() + 1000 * 60 * 60 * 24 * expires);
      if (expires !== '' && 'toGMTString' in expires) expires = ';expires=' + expires.toGMTString();
      document.cookie = name + "=" + encodeURI(value) + expires + path + domain + secure; //转码并赋值    
    }
  },
  remove: function remove(names) {
    names = isArray(names) ? names : toArray(arguments);

    for (var i = 0, l = names.length; i < l; i++) {
      this.set(names[i], '', -1);
    }

    return names;
  },
  clear: function clear(name) {
    return name ? this.remove(name) : this.remove(getKeys(this.all()));
  },
  all: function all() {
    if (document.cookie === '') return {};
    var cookies = document.cookie.split('; '),
        result = {};

    for (var i = 0, l = cookies.length; i < l; i++) {
      var item = cookies[i].split('=');
      result[decodeURI(item[0])] = decodeURI(item[1]);
    }

    return result;
  }
};
var _Cookie = null;

var cookie = function cookie(name, value, options) {
  var argm = arguments;
  if (!_Cookie) _Cookie = Cookie();
  if (argm.length === 0) return _Cookie.all();
  if (argm.length === 1 && name === null) return _Cookie.clear();
  if (argm.length === 2 && !value) return _Cookie.clear(name);
  if (typeof name == "string" && !value) return _Cookie.get(name);
  if (isPlainObject(name) || argm.length > 1 && name && value) return _Cookie.set(name, value, options);
  if (value === null) return _Cookie.remove(name);
  return _Cookie.all();
};

for (var a in Cookie.prototype) {
  cookie[a] = Cookie.prototype[a];
}

module.exports = cookie;
