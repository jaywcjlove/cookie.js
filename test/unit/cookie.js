describe('cookie 单元测试', function () {

    it('添加一个cookie方法：cookie.set("test","tank",1800)', function () {

        cookie("test1","tank1",1800)
        cookie.set("test2","tank2")

        assert.equal(cookie("test1"), 'tank1', '==> cookie("test1","tank1",1800) 存储失败');
        assert.equal(cookie("test2"), 'tank2', '==> cookie.set("test2","tank2") 存储失败');
        
    })
    it('删除单个cookie方法：cookie.remove("test")', function () {

        cookie("test1",null)
        cookie.remove("test2")

        assert.isFalse(cookie("test1"), '==> cookie("test1",null) 删除cookie失败');
        assert.isFalse(cookie("test2"), '==> cookie.remove("test2") 删除cookie失败');

    })
    it('获取单个cookie方法：cookie.get("test") ', function () {
        cookie("test1","tank1")
        assert.equal(cookie.get("test1"), 'tank1', '==> cookie.get("test1") 获取失败');
        assert.equal(cookie("test1"), 'tank1', '==> cookie("test1") 获取失败');

    })
    it('获取所有cookie方法：cookie.all()', function () {
        assert.isObject(cookie.all());
        assert.propertyVal(cookie.all(),'test1','tank1');
    })
    it('批量设置cookie的方法：cookie.set();', function () {
        cookie.set({
           "test1": 'tank1',
           "test2": 'tank2'
        });
        assert.deepEqual(cookie.all(),{test1: "tank1", test2: "tank2"});
    })
    it('清空cookie方法：cookie.clear()', function () {
        assert.include(cookie(),'test1');
        assert.isArray(cookie());
        cookie.set({
           "test1": 'tank1',
           "test2": 'tank2'
        });
        assert.deepEqual(cookie.all(),{test1: "tank1", test2: "tank2"});
        assert.include(cookie.clear(),'test1');
        assert.isArray(cookie.clear());
    })
})