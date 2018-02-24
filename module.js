/**
 * Created by JackCheng on 2018/2/7.
 */
'use strict'
////实现命令行计算器
////1.接受参数
//const args=process.argv.slice(2);//['node执行的程序所在路径','当前脚本路径',...]
////2.分析参数
//let parameter1=args[0];
//let operator=args[1];
//let parameter2=args[2]
////3.进行运算
//let result=eval(`${parameter1} ${operator} ${parameter2}`);
//
//
//console.log(result);//如何执行？cmd中：node hello.js 10 + 100







////实现命令行计算器 模块化  ---注意引用了Module/calculator.js
////1.接受参数
//const args=process.argv.slice(2);//['node执行的程序所在路径','当前脚本路径',...]
////2.分析参数
//let parameter1=args[0];
//let operator=args[1];
//let parameter2=args[2]
//const calc=require('./Module/calculator.js');
////3.进行运算
////采用eval
////let result=eval(`${parameter1} ${operator} ${parameter2}`);
////采用switch
//let result;
//switch(operator){
//    case '+':
//        result=calc.add(parameter1,parameter2);
//        break;
//    case '-':
//        result=calc.subtract(parameter1,parameter2);
//        break;
//    case '*':
//    //case '×':
//        result=calc.mutiply(parameter1,parameter2);
//        break;
//    case '/':
//    case '÷':
//        result=calc.divide(parameter1,parameter2);
//        break;
//    default :
//         throw new Error('报错了');
//        break;
//
//}
//
//console.log(result);






//文件路径   ---注意引用了Module/module1.js
//const path=require('./Module/module1.js');
//console.log(path);//F:\Node\Module  F:\Node\Module\module1.js






//模块内部的私有空间  ---注意引用了Module/module2.js
//每个模块的内部都是私有空间
//var module2=require('./Module/module2.js');
//console.log(module2)






//module对象  ---注意引用了Module/module3.js
//这个是在本文件下打印出来的Module对象
//console.log(module);
//Module {
//    id: '.',//这个是文件的绝对路径
//        exports: {},
//    parent: null,//他的父模块
//        filename: 'F:\\Node\\hello.js',
//        loaded: false,
//        children: [],
//        paths: [ 'F:\\Node\\node_modules', 'F:\\node_modules' ]
//}

//const module3=require('./Module/module3');
//console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
//console.log(module);
//Module {
//    id: '.',
//        exports: {},
//    parent: null,
//        filename: 'F:\\Node\\hello.js',
//        loaded: false,
//        children: [],
//        paths: [ 'F:\\Node\\node_modules', 'F:\\node_modules' ] }
//Module {
//    id: 'F:\\Node\\Module\\module3.js',
//        exports: {},
//    parent:
//        Module {
//        id: '.',
//            exports: {},
//        parent: null,
//            filename: 'F:\\Node\\hello.js',
//            loaded: false,
//            children: [ [Circular] ],
//            paths: [ 'F:\\Node\\node_modules', 'F:\\node_modules' ] },
//    filename: 'F:\\Node\\Module\\module3.js',
//        loaded: false,
//        children: [],
//        paths:
//    [ 'F:\\Node\\Module\\node_modules',
//        'F:\\Node\\node_modules',
//        'F:\\node_modules' ] }

//if(module.parent){
//    console.log(11);
//    //当前这个文件是被别的文件加载的  因为他的module.parent值不是null  所以他就是子元素
//}else{
//    //入口文件  主文件，就是父文件
//    console.log(22);
//}

