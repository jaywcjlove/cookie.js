const cookie = require('../dist/cookie');

test('Set cookie', () => {
  expect(cookie("test1", "value1", 1800)).toBeUndefined();
  expect(cookie("test2", "value2")).toBeUndefined();
  expect(cookie.set({ "test3": "value3", "test4": "value4" })).toBeUndefined();
  expect(cookie("test5", "value5", { 'expires': 30 })).toBeUndefined();
  expect(cookie({ "test6": "value6", "test7": "value7" })).toBeUndefined();
});

test('Get cookie', () => {
  expect(cookie('test1')).toBe('value1');
  expect(cookie('test2')).toBe('value2');
  expect(cookie('test3')).toBe('value3');
  expect(cookie('test4')).toBe('value4');
  expect(cookie('test5')).toBe('value5');
  expect(cookie('test6')).toBe('value6');
  expect(cookie('test7')).toBe('value7');
});

test('Get all cookie', () => {
  const json = { "test1": "value1", "test2": "value2", "test3": "value3", "test4": "value4", "test5": "value5", "test6": "value6", "test7": "value7" }
  expect(cookie()).toEqual(json);
  expect(cookie.all()).toEqual(json);
});

test('Delete one cookie', () => {
  expect(cookie('test1', null)).toEqual(["test1"]);
  expect(cookie('test1')).toBe(false);
  expect(cookie.remove('test2')).toEqual(["test2"]);
});

test('Delete multiple cookies', () => {
  expect(cookie.remove('test3', 'test4')).toEqual(["test3", "test4"]);
  expect(cookie('test3')).toBe(false);
  expect(cookie('test4')).toBe(false);
});

test('Clean all cookie', () => {
  expect(cookie.clear()).toEqual(["test5", "test6", "test7"]);
  expect(cookie('test5')).toBe(false);
  expect(cookie('test6')).toBe(false);
  expect(cookie('test7')).toBe(false);
});
