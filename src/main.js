function getKeys(obj) {
  var names = [], name = '';
  for (name in obj) {
    names.push(name);
  }
  return names;
}

function isPlainObject(obj) {
  obj = JSON.stringify(obj);
  if (typeof obj !== 'string') {
    return false;
  }
  if (!/^\{[\s\S]*\}$/.test(obj)) {
    return false;
  }
  return true;
}

function isArray(value) { return value instanceof Array }
function toArray(value) {
  return Array.prototype.slice.call(value);
}
function Cookie(){
  if(!(this instanceof Cookie)) {
    return new Cookie()
  };
}
Cookie.prototype = {
  get: function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');//把cookie分割成组    
    for(var i=0;i < ca.length;i++) {    
      var c = ca[i];//取得字符串    
      while (c.charAt(0)==' ') {//判断一下字符串有没有前导空格    
        c = c.substring(1,c.length);//有的话，从第二位开始取    
      }    
      //如果含有我们要的name
      if (c.indexOf(nameEQ) == 0) {
        return decodeURI(c.substring(nameEQ.length,c.length));//解码并截取我们要值    
      }    
    }
    return false;
  },
  set: function(name, value, options) {
    if (isPlainObject(name)) {
      for (var k in name) {
        this.set(k, name[k], value, options);
      }
    } else if (typeof name === 'string') {
      var opt = isPlainObject(options) ? options : { expires: options },
        expires = opt.expires !== undefined ? opt.expires : '',
          path = opt.path !== undefined ? ';path=' + opt.path : ';path=/',
          domain = opt.domain ? ';domain=' + opt.domain : '',
          secure = opt.secure ? ';secure' : '';

        //过期时间
      if (typeof expires === 'string' && expires !== '') {
        expires = new Date(expires);
      } else if (typeof expires === 'number') {
        expires = new Date(+new Date + 1000 * 60 * 60 * 24 * expires);
      } if (expires !== '' && 'toGMTString' in expires) {
        expires = ';expires=' + expires.toGMTString();
      }
      document.cookie = name+"="+encodeURI(value)+expires+path+domain+secure;   //转码并赋值    
    }
  },
  remove: function(names) {
    names = isArray(names) ? names : toArray(arguments);
    for (var i = 0, l = names.length; i < l; i++) {
      this.set(names[i], '', -1);
    }
    return names;  
  },
  clear: function(name) {
    return name ? this.remove(name) : this.remove(getKeys(this.all()));
  },
  all: function() {
    if (document.cookie === '') return {};
    var cookies = document.cookie.split('; '),result = {};
    for (var i = 0, l = cookies.length; i < l; i++) {
      var item = cookies[i].split('=');
      result[decodeURI(item[0])] = decodeURI(item[1]);
    }
    return result;
  }
};

let _Cookie = null;

const cookie = function(name, value, options) {
  const argm = arguments;
  if (!_Cookie) _Cookie = Cookie();
  if (argm.length === 0) return _Cookie.all();
  if (argm.length === 1 && name === null) return _Cookie.clear();
  if (argm.length === 2 && !value) return _Cookie.clear(name);
  if (typeof name == 'string' && !value) return _Cookie.get(name);
  if ((typeof name === 'string' && value) || isPlainObject(name)) {
    return _Cookie.set(name, value, options);
  }
};
for (const a in Cookie.prototype) cookie[a] = Cookie.prototype[a];

export default cookie;
