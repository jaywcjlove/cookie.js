var tape = require('tape');
if (typeof(window)==='object') {
    var tape_dom = require('tape-dom');
    var cookie = require('../dist/cookie.js');
    tape_dom.installCSS();
    tape_dom.stream(tape);

    // cookie("test1","tank1",1800)
    // cookie.set("test2","tank2")
    // console.log("test",window)


    // "chai": "~3.4.1",
    // "mocha": "~2.3.4",
    // "mocha-phantomjs": "~4.0.1",


    tape('  cookie 单元测试', function (t) {
        // 清空
        cookie.clear()

        cookie("test1","tank1",1800)
        cookie.set("test2","tank2")
        
        t.equal( cookie('test1') , 'tank1','测试存储方法：cookie("test1","tank1",1800)' )
        t.equal( cookie('test2') , 'tank2','测试存储方法：cookie.set("test2","tank2")' )

        cookie("test1",null)
        t.equal(cookie('test2') ,'tank2', '测试删除方法：cookie.remove("test2")' )
        cookie.remove("test2")

        t.false( cookie('test1') , '测试删除方法：cookie("test1",null)' )
        t.false( cookie('test2') , '测试删除方法：cookie.remove("test2")' )

        cookie("test1","tank1")

        t.equal( cookie.get("test1") , 'tank1','获取单个cookie方法：cookie.get("test1")' )
        t.equal( cookie("test1") , 'tank1','获取单个cookie方法：cookie("test1")' )

        t.deepEqual(cookie.all() , {test1: "tank1"} , '获取所有cookie方法：cookie.all()')
        cookie("test1",null)
        cookie.set({
           "test1": "tank1",
           "test2": "tank2"
        })
        t.deepEqual(cookie.all(),{"test1": "tank1", "test2": "tank2"},'批量设置cookie.set({"test1": "tank1","test2": "tank2"})')

        t.deepEqual(cookie.clear(),["test1","test2"],"清空cookie方法：cookie.clear()")

    });

}