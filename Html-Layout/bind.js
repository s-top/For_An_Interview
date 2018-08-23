/**
 * Created by lzp on 2018/8/23.
 */
//因为bind方法不会立即执行函数，需要返回一个待执行的函数（这里用到闭包，可以返回一个函数）return function(){}
//作用域绑定，这里可以使用apply或者call方法来实现 xx.call(yy)/xx.apply(yy)
//参数传递，由于参数的不确定性，需要用apply传递数组（实例更明了）xx.apply(yy,[...Array...])，如果用call就不太方便了，因为call后面的参数需要一个个列出来

//Function.prototype.testBind = function(that){
//    var _this = this,
//    /*
//     *由于参数的不确定性，统一用arguments来处理，这里的arguments只是一个类数组对象，有length属性
//     *可以用数组的slice方法转化成标准格式数组，除了作用域对象that以外，
//     *后面的所有参数都需要作为数组参数传递
//     *Array.prototype.slice.apply(arguments,[1])/Array.prototype.slice.call(arguments,1)
//     */
//        slice = Array.prototype.slice,
//        args = slice.apply(arguments,[1]);
//    //返回函数
//    return function(){
//        //apply绑定作用域，进行参数传递
//        return _this.apply(that,args)
//    }
//}

Function.prototype.testBind = function(that){
    var _this = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments,[1]);
    return function(){
        return _this.apply(that,
            args.concat(Array.prototype.slice.apply(arguments,[0]))
        )
    }
};
var test = function(a,b){
    console.log('作用域绑定 '+ this.value)
    console.log('testBind参数传递 '+ a.value2)
    console.log('调用参数传递 ' + b)
};
var obj = {
    value:'ok'
};
var fun_new = test.testBind(obj,{value2:'also ok'});
fun_new ('hello bind');
// 作用域绑定 ok
// testBind参数传递 also ok
// 调用参数传递  hello bind


Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind");
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};
    var fbound = function () {
        self.apply(this instanceof self ? this : context,
            args.concat(Array.prototype.slice.call(arguments)));
    };
    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    return fbound;
};
