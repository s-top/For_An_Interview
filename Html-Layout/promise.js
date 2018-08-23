/**
 * Created by lzp on 2018/8/23.
 */

function getData(method, url, successFun, failFun){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, url);
    xmlHttp.send();
    xmlHttp.onload = function () {
        if (this.status == 200 ) {
            successFun(this.response);
        } else {
            failFun(this.statusText);
        }
    };
    xmlHttp.onerror = function () {
        failFun(this.statusText);
    };
}

function getDataByPromise(method, url){
    var promise = new Promise(function(resolve, reject){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open(method, url);
        xmlHttp.send();
        xmlHttp.onload = function () {
            if (this.status == 200 ) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };
        xmlHttp.onerror = function () {
            reject(this.statusText);
        };
    });
    return promise;
}
getDataByPromise('get','www.xxx.com').then(successFun, failFun);

//极简promise雏形
function PromiseBefore(fn) {
    var value = null,
        callbacks = [];
    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
    };
    function resolve(value) {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }
    fn(resolve);
}

//让then方法支持链式调用
    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
        return this;
    };

//加入延时机制
function resolve(value) {
    setTimeout(function() {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }, 0)
}

//加入状态pending、fulfilled、rejected
//pending可以转化为fulfilled或rejected并且只能转化一次

function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];
    this.then = function (onFulfilled) {
        if (state === 'pending') {
            callbacks.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    };
    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0);
    }
    fn(resolve);
}

