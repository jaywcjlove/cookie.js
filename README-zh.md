JavaScript Cookie
===

[![Downloads](https://img.shields.io/npm/dm/cookiejs.svg?style=flat)](https://www.npmjs.com/package/cookiejs)
[![Build & Test](https://github.com/jaywcjlove/cookie.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/cookie.js/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/cookie.js/badges.svg)](https://jaywcjlove.github.io/cookie.js/lcov-report/)
[![README-zh.md](https://jaywcjlove.github.io/sb/lang/english.svg)](./README.md)

:cookie: 一个简单，轻量级的JavaScript API，用于处理浏览器cookie
，它易于上传和使用，具有合理的占用空间（~2kb）（gzip压缩：0.84kb），并且没有依赖性。 它不应该干扰任何JavaScript库或框架。

> 老的 [v1](https://raw.githack.com/jaywcjlove/cookie.js/v1-doc/index.html) 版本。[文档预览](https://raw.githack.com/jaywcjlove/cookie.js/v1-doc/index.html)。

**特性:**

🚀 它没有任何依赖  
🌱 适用于所有浏览器  
🔥 经过严格测试   
🍁 支持TypeScript，包括 [d.ts](https://github.com/jaywcjlove/store.js/tree/master/types/index.d.ts) 定义  
📦 支持 AMD/CommonJS  
💥 [cookie.min.js](https://github.com/jaywcjlove/cookie.js/tree/master/dist/cookie.min.js) 2.01kb(gzip压缩: 0.95kb)  

**优缺点**

[规范：DOM Level 2: HTMLDocument.cookie](https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-8747038)  
[MDN Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)  
[MDN Cookies (Code snippets)](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Code_snippets/Cookies)  

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

### SameSite

SameSite Cookie 允许服务器要求某个 cookie 在跨站请求时不会被发送，（其中  [Site (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Site) 由可注册域定义），从而可以阻止跨站请求伪造攻击（[CSRF](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF)）。

SameSite cookies 是相对较新的一个字段，[所有主流浏览器都已经得到支持](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#browser_compatibility)。

下面是例子：

```js
cookie.set('name', 'value', { sameSite: 'Strict' });
```

SameSite 可以有下面三种值：

- `None`。浏览器会在同站请求、跨站请求下继续发送 cookies，不区分大小写。
- `Strict`。浏览器将只在访问相同站点时发送 cookie。（在原有 Cookies 的限制条件上的加强，如上文 “Cookie 的作用域” 所述）
- `Lax`。与 Strict 类似，但用户从外部站点导航至URL时（例如通过链接）除外。 在新版本浏览器中，为默认选项，Same-site cookies 将会为一些跨站子请求保留，如图片加载或者 frames 的调用，但只有当用户从外部站点导航到URL时才会发送。如 link 链接


> 以前，如果 SameSite 属性没有设置，或者没有得到运行浏览器的支持，那么它的行为等同于 None，Cookies 会被包含在任何请求中——包括跨站请求。  
> 大多数主流浏览器正在将 [SameSite 的默认值迁移至 Lax](https://www.chromestatus.com/feature/5088147346030592)。如果想要指定 Cookies 在同站、跨站请求都被发送，现在需要明确指定 SameSite 为 None。

## Related

- [storejs](https://github.com/jaywcjlove/store.js) 本地存储 localStorage 的封装，提供简单的API，没有依赖，压缩只有 2.08kb(gzipped: 0.97kb)。

### License

Licensed under the MIT License.