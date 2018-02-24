/**
 * Created by Administrator on 2018/2/7.
 */
//根据CMD的规范去定义一个模块  在Node中不可以用
//define(function(require,module,exports){
//    function convert(input){
//        return parseFloat(input);
//    }
//    function add(a,b){
//        return convert(a) + convert(b);
//    }
//    function subtract(a,b){
//        return convert(a) - convert(b);
//    }
//    function mutiply(a,b){
//        return convert(a) * convert(b);
//    }
//    function divide(a,b){
//        return convert(a) / convert(b);
//    }
//    //exports.add=add;
//
//    module.exports={add,subtract,mutiply,divide};//对象的复值解构
//});


//其实在Node中实现的是Commonjs规范  define函数已经由node底层完成了
//Node中模块化开发的流程  1.创建文件  2.导出成员  3.载入模块  4.使用模块
function convert(input){
    return parseFloat(input);
}
function add(a,b){
    return convert(a) + convert(b);
}
function subtract(a,b){
    return convert(a) - convert(b);
}
function mutiply(a,b){
    return convert(a) * convert(b);
}
function divide(a,b){
    return convert(a) / convert(b);
}
module.exports={add,subtract,mutiply,divide};//对象的复值解构  暴露出函数