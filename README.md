JavaScript Cookie
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Downloads](https://img.shields.io/npm/dm/cookiejs.svg?style=flat)](https://www.npmjs.com/package/cookiejs)
[![Build & Test](https://github.com/jaywcjlove/cookie.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/cookie.js/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/cookie.js/badges.svg)](https://jaywcjlove.github.io/cookie.js/lcov-report/)
[![README-zh.md](https://jaywcjlove.github.io/sb/lang/chinese.svg)](./README-zh.md)

:cookie: A simple, lightweight JavaScript API for handling browser cookies, it is easy to pick up and use, has a reasonable footprint (~2kb) (gzipped: 0.84kb), and has no dependencies. It should not interfere with any JavaScript libraries or frameworks.

> Old [v1](https://raw.githack.com/jaywcjlove/cookie.js/v1-doc/index.html) version [document preview](https://raw.githack.com/jaywcjlove/cookie.js/v1-doc/index.html).

**Features:**

🚀 Has no dependencies  
🌱 Works in all browsers  
🍁 Support TypeScript, including [d.ts](https://github.com/jaywcjlove/store.js/tree/master/types/index.d.ts) definition  
🔥 Heavily tested  
📦 Supports AMD/CommonJS  
💥 [cookie.min.js](https://github.com/jaywcjlove/cookie.js/tree/master/dist/cookie.min.js) 2.01kb(gzipped: 0.84kb)  

## Usage

Installed via npm. You will need Node.js installed on your system.

```bash
$ npm install cookiejs --save
```

```js
import cookie from 'cookiejs';

cookie("test", "tank", 1)
```

Or manually download and link `cookiejs` in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/cookiejs/dist/) or [jsDelivr CDN](https://www.jsdelivr.com/package/npm/cookiejs):

```html
<script src="https://unpkg.com/cookiejs/dist/cookie.min.js"></script>
<script type="text/javascript">
  cookie("test", "tank", 1);
</script>
```

## Basic Usage

> cookie(key, value, num)

> `key` cookie name  
> `value` cookie value  
> `num` expires time  

```js
cookie('test', 'tank', 1)    // Create a cookie that expires 1 days from now
cookie('test')               // Create a cookie, valid across the entire site
cookie('test', null)         // Delete cookie `test`
cookie()                     // Get all cookie

cookie.set('test', 'tank', 1) // ====cookie('test', 'tank', 1)
cookie.get('test')            // ====cookie('test')
cookie.remove('test')         // ====cookie('test',null)
cookie.remove('test3', 'test4') // Delete cookie `test3` and `test4`

cookie.clear()                // Clean all cookie
cookie.all()                  // Get all cookie
```

## Set Cookie

`cookie.set(name, value, options)`  
The same effect `cookie(name, value, options)`

Set the value of the cookie in batches

```js
cookie.set({
  name1: 'value1',
  name2: 'value2'
});
```

Create cookie that expires 30 days from now

```js
cookie('test', 'tank', 30);  // Create a cookie that expires 30 days from now

cookie({ 'test':'123', 'test2':'456' }, { // 批量设置
  'expires': 30,
  'path': '/',
  'domain':''
});
```

Create cookie that expires 30 days from now，and set cookie attributes

```js
cookie('test', '123', { 'expires': 30, 'path': '/', 'domain':'' });
```

## Cookie Attributes

individually for each call to `cookie.set(...)` by passing a plain object in the last argument. Per-call attributes override the default attributes.

**Examples:**

```js
cookie('name', 'value', { 'expires': 30, 'path': '/', 'domain':'' });
cookie.get('name')
cookie.remove('name')
```

### expires

Define when the cookie will be removed. Value can be a Number which will be interpreted as days from time of creation or a Date instance. If omitted, the cookie becomes a session cookie.

```js
cookie('name', 'value', { 'expires': 30 });
```

### path

> Default: `/`  

A String indicating the path where the cookie is visible.

```js
cookie.set('name', 'value', { path: '' });
cookie.get('name'); // => 'value'
```

### domain

> Default: Cookie is visible only to the domain or subdomain of the page where the cookie was created, except for Internet Explorer ([see: Note regarding Internet Explorer default behavior](https://blogs.msdn.microsoft.com/ieinternals/2009/08/20/internet-explorer-cookie-internals-faq/)).  
> ⚠️If you omit the domain attribute, it will be visible for a subdomain in IE.

A String indicating a valid domain where the cookie should be visible. The cookie will also be visible to all subdomains.

Examples:

```js
cookie.set('name', 'value', { domain: 'subdomain.website.com' });
cookie.get('name'); // => undefined (need to read at 'subdomain.website.com')
```

### secure

> Default: No secure protocol requirement.

Either true or false, indicating if the cookie transmission requires a secure protocol (https).

Here's an examples:

```js
cookie.set('name', 'value', { secure: true });
cookie.get('name'); // => 'value'
cookie.remove('name');
```

### SameSite

The [SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) attribute lets servers specify whether/when cookies are sent with cross-site requests (where [Site](https://developer.mozilla.org/en-US/docs/Glossary/Site) is defined by the registrable domain and the scheme: http or https). This provides some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)). It takes three possible values: Strict, Lax, and None.

With Strict, the cookie is only sent to the site where it originated. Lax is similar, except that cookies are sent when the user navigates to the cookie's origin site. For example, by following a link from an external site. None specifies that cookies are sent on both originating and cross-site requests, but only in secure contexts (i.e., if `SameSite=None` then the Secure attribute must also be set). If no `SameSite` attribute is set, the cookie is treated as Lax.

Here's an example:

```js
cookie.set('name', 'value', { sameSite: 'Strict' });
```

> Note: The standard related to `SameSite` recently changed (MDN documents the new behavior above). See the cookies [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#browser_compatibility) table for information about how the attribute is handled in specific browser versions:
> 
> `SameSite=Lax` is the new default if `SameSite` isn't specified. Previously, cookies were sent for all requests by default.
> - Cookies with `SameSite=None` must now also specify the `Secure` attribute (they require a secure context).
> - Cookies from the same domain are no longer considered to be from the same site if sent using a different scheme (`http:` or `https:`).

## Related

- [storejs](https://github.com/jaywcjlove/store.js) A simple, lightweight JavaScript API for handling browser localStorage , it is easy to pick up and use, has a reasonable footprint 2.36kb(gzipped: 1.04kb), and has no dependencies.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/cookie.js/graphs/contributors">
  <img src="https://jaywcjlove.github.io/cookie.js/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.