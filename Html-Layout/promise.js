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

//����promise����
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

//��then����֧����ʽ����
    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
        return this;
    };

//������ʱ����
function resolve(value) {
    setTimeout(function() {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }, 0)
}

//����״̬pending��fulfilled��rejected
//pending����ת��Ϊfulfilled��rejected����ֻ��ת��һ��

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

