/**
 * Created by Administrator on 2018/2/7.
 */
//����CMD�Ĺ淶ȥ����һ��ģ��  ��Node�в�������
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
//    module.exports={add,subtract,mutiply,divide};//����ĸ�ֵ�⹹
//});


//��ʵ��Node��ʵ�ֵ���Commonjs�淶  define�����Ѿ���node�ײ������
//Node��ģ�黯����������  1.�����ļ�  2.������Ա  3.����ģ��  4.ʹ��ģ��
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
module.exports={add,subtract,mutiply,divide};//����ĸ�ֵ�⹹  ��¶������