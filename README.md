# cookie

[![](https://img.shields.io/github/issues/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/issues) [![](https://img.shields.io/github/forks/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/network) [![](https://img.shields.io/github/stars/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/releases)


## 安装

```bash
# 安装依赖
$ npm install

# bower
$ bower install icookie
$ bower info icookie # Run bower info icookie to list the available versions.

# npm
$ npm install cookiejs
```

生成压缩文件和map文件

```bash
$ grunt dist

# › dist/cookie.js: 3.5 KiB
# › dist/cookie.min.js: 1.8 KiB
# › dist/cookie.min.map: 2.9 KiB
```


## cookie APIs

```js
cookie("test","tank",1800)  //设置 cookie 的值，生存时间半个小时
cookie("test")              //获取 cookie 的值，显示tank
cookie("test",null)         //删除cookie test
cookie()                    //清空cookie

cookie.set("test","tank",1800)  //====cookie("test","tank",1800)
cookie.get("test")              //====cookie("test")
cookie.remove("test")           //====cookie("test",null)
cookie.clear()                  //====cookie()

cookie.all()                    //获取所有 cookie
```

### 批量设置cookie的值

```js
cookie.set({
   name1: 'value1',
   name2: 'value2'
});
```

### set
设置 cookie 的值，设置时间

`cookie.set(name,value,options)`
效果相同`cookie(name,value,options)`

```js
cookie("test","tank",30)    //设置cookie，并设置过期时间30天

cookie("test","123",{       //设置cookie，并设置过期时间7天，路径、域
    "expires": 7,
    "path": '/',
    "domain":""
});

cookie({"test":"123","test2":"456"},{  //批量设置
    "expires": 7,
    "path": '/',
    "domain":""
});
```

### get
获取 cookie 的值

`cookie.get(name)`
效果相同`cookie(name)`

```js
store.get("wcj1") //获取wcj1的字符串数据
store("wcj1") //功能同上
```

### clear
清空cookie

`cookie.clear() `
效果相同`cookie()`

```js
cookie()
cookie.clear()
```

### remove
删除cookie

`cookie.remove(name)` 
效果相同`cookie(name,null)`

```js
cookie.remove("test") //删除cookie test
cookie("test",null) //这样也是 删除cookie test
```


###  expires过期时间、 path路径、 domain域、以及 secure安全。

```js
cookie("test","123",{
    "expires": 7,
    "path": '/',
    "domain":""
});
cookie({"test":"123"},{
    "expires": 7,
    "path": '/',
    "domain":""
});
```


| key | value | default value |
|:--|:--|:--|
| `expires` | 过期时间(天)。指定cookie的生命期。具体是值是过期日期。如果想让cookie的存在期限超过当前浏览器会话时间，就必须使用这个属性。当过了到期日期时，浏览器就可以删除cookie文件，没有任何影响。| 浏览器关闭过期 |
| `domain` | 域。指定关联的WEB服务器或域。值是域名，比如pc175.com。这是对path路径属性的一个延伸。如果我们想让 catalog.pc175.com 能够访问shoppingcart.pc175.com设置的cookies，该怎么办? 我们可以把domain属性设置成“pc175.com”，并把path属性设置成“/”。tag：不能把cookies域属性设置成与设置它的服务器的所在域不同的值。 | 默认本域 |
| `path` | 路径。指定与cookie关联的WEB页。值可以是一个目录，或者是一个路径。如果http://www.pc175.com/devhead/index.html 建立了一个cookie，那么在http://www.pc175.com/devhead/目录里的所有页面，以及该目录下面任何子目录里的页面都可以访问这个cookie。这就是说，在http://www.pc175.com/devhead/stories/articles 里的任何页面都可以访问http://www.pc175.com/devhead/index.html建立的cookie。但是，如果http://www.pc175.com/zdnn/ 需要访问http://www.pc175.com/devhead/index.html设置的cookes，该怎么办？这时，我们要把cookies 的path属性设置成“/”。在指定路径的时候，凡是来自同一服务器，URL里有相同路径的所有WEB页面都可以共享cookies。现在看另一个例子：如果想让 http://www.pc175.com/devhead/filters/ 和http://www.pc175.com/devhead/stories/共享cookies，就要把path设成“/devhead”。 | 默认 `/` |
| `secure` | 安全。指定cookie的值通过网络如何在用户和WEB服务器之间传递。这个属性的值或者是“secure”，或者为空。缺省情况下，该属性为空，也就是使用不安全的HTTP连接传递数据。如果一个 cookie 标记为secure，那么，它与WEB服务器之间就通过HTTPS或者其它安全协议传递数据。不过，设置了secure属性不代表其他人不能看到你机器本地保存的cookie。换句话说，把cookie设置为secure，只保证cookie与WEB服务器之间的数据传输过程加密，而保存在本地的cookie文件并不加密。如果想让本地cookie也加密，得自己加密数据。 | `false` |

