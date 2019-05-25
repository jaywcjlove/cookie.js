# cookie

[![Build Status](https://travis-ci.org/jaywcjlove/cookie.js.svg?branch=master)](https://travis-ci.org/jaywcjlove/cookie.js) [![Coverage Status](https://coveralls.io/repos/github/jaywcjlove/cookie.js/badge.svg?branch=master)](https://coveralls.io/github/jaywcjlove/cookie.js?branch=master) [![](https://img.shields.io/github/issues/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/issues) [![](https://img.shields.io/github/forks/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/network) [![](https://img.shields.io/github/stars/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/cookie.js.svg)](https://github.com/jaywcjlove/cookie.js/releases) [![cookie.js](https://jaywcjlove.github.io/sb/lang/english.svg)](./README.md)


:cookie: 一个简单，轻量级的JavaScript API，用于处理浏览器cookie
，它易于上传和使用，具有合理的占用空间（~2kb）（gzip压缩：0.95kb），并且没有依赖性。 它不应该干扰任何JavaScript库或框架。

**特性:**

🚀 它没有任何依赖  
🌱 适用于所有浏览器  
🔥 经过严格测试   
🍁 支持TypeScript，包括 [d.ts](index.d.ts) 定义  
📦 支持 AMD/CommonJS  
💥 [cookie.min.js](dist/cookie.min.js) 2.01kb(gzip压缩: 0.95kb)  

**优缺点**

[规范：DOM Level 2: HTMLDocument.cookie](https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-8747038)  
[MDN Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)  
[MDN Cookies (Code snippets)](https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Cookies)  

cookie虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的。 

1. IE6或更低版本最多 `20` 个 `cookie`  
2. IE7和之后的版本最后可以有 `50` 个 `cookie`。  
3. Firefox 最多 `50` 个 `cookie`  
4. Chrome 和 Safari 没有做硬性限制  

cookie的最大大约为 `4096` 字节，为了兼容性，一般不能超过 `4095` 字节。

IE 提供了一种存储可以持久化用户数据，叫做 `userdata`，从 `IE5.0` 就开始支持。每个数据最多 `128K`，每个域名下最多 `1M`。这个持久化数据放在缓存中，如果缓存没有清理，那么会一直存在。

## 用法

通过 `npm` 安装使用，您将需要在系统上安装 `Node.js`.

```bash
$ npm install cookiejs --save
```

```js
import cookie from 'cookiejs';

cookie("test", "tank", 1)
```
或者手动下载并链接HTML中的`cookiejs`，也可以通过 [UNPKG](https://unpkg.com/cookiejs/dist/) 或 [jsDelivr CDN](https://www.jsdelivr.com/package/npm/cookiejs)：

```html
<script src="https://unpkg.com/cookiejs/dist/cookie.min.js"></script>
<script type="text/javascript">
  cookie("test", "tank", 1);
</script>
```

## 基本用法

> cookie(key, value, num)

> `key` cookie name  
> `value` cookie value  
> `num` expires time  

```js
cookie('test', 'tank', 1)    // 创建一个从现在起1天后过期的cookie
cookie('test')               // 创建一个在整个网站上有效的cookie
cookie('test', null)         // 删除cookie`test`
cookie()                     // 获取所有cookie

cookie.set('test', 'tank', 1) // ====cookie('test', 'tank', 1)
cookie.get('test')            // ====cookie('test')
cookie.remove('test')         // ====cookie('test',null)
cookie.remove('test3', 'test4') // 删除cookie `test3` 和 `test4`

cookie.clear()                // 清理所有cookie
cookie.all()                  // 获取所有cookie
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

`cookie.set(name, value, options)`  
效果相同`cookie(name, value, options)`

```js
cookie("test", "tank", 30);  // 设置cookie，并设置过期时间30天
cookie("test", "123", {      // 设置cookie，并设置过期时间7天，路径、域
  "expires": 7,
  "path": '/',
  "domain":""
});

cookie({ "test":"123", "test2":"456" }, { // 批量设置
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
cookie.get("wcj1"); // 获取wcj1的字符串数据
cookie("wcj1"); // 功能同上
```

### clear

清空cookie

`cookie.clear()` 效果相同 ~~`cookie()`~~

```js
cookie.clear();
```

### remove

删除cookie

`cookie.remove(name)` 
效果相同 ~~`cookie(name, null)`~~  

```js
cookie.remove("test") //删除cookie test
cookie("test", null) //这样也是 删除cookie test
```

## Cookie属性

通过在最后一个参数中传递一个普通对象来单独调用`cookie.set（...）`。 每次调用属性会覆盖默认属性。

**示例:**

```js
cookie('name', 'value', { 'expires': 30, 'path': '/', 'domain':'' });
cookie.get('name')
cookie.remove('name')
```

### expires

定义何时删除cookie。 值可以是一个数字，它将被解释为创建时的天数或Date实例。 如果省略，cookie 将成为会话 cookie。

```js
cookie('name', 'value', { 'expires': 30 });
```

### path

> 默认值: `/`  

路径，字符串类型，指示cookie可见的路径，指定与cookie关联的WEB页。值可以是一个目录，或者是一个路径。

```js
cookie.set('name', 'value', { path: '' });
cookie.get('name'); // => 'value'
```

### domain

> 默认值：Cookie仅对创建cookie的页面的域或子域可见，Internet Explorer除外([请参阅：有关Internet Explorer默认行为的说明](https://blogs.msdn.microsoft.com/ieinternals/2009/08/20/internet-explorer-cookie-internals-faq)。  
> ⚠️如果省略域属性，它将在IE中显示为子域。  

指示cookie应该可见的有效域。 所有子域都可以看到cookie。

示例:

```js
cookie.set('name', 'value', { domain: 'subdomain.website.com' });
cookie.get('name'); // => undefined (need to read at 'subdomain.website.com')
```

### secure

> 默认值：无安全协议要求。

无论是 `true` 还是 `false`，表明 cookie 传输是否需要安全协议（https）。

Examples:

```js
cookie.set('name', 'value', { secure: true });
cookie.get('name'); // => 'value'
cookie.remove('name');
```

### License

Licensed under the MIT License.