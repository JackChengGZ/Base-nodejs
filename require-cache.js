/**
 * Created by Administrator on 2018/2/8.
 */
'use strict'
//ģ��Ļ���   ������еĻ���  ���Լ�д��$requireû��
//setInterval(()=>{
//    var date=require('./Module/require-cache1.js');
//    //console.log(date.getTime());
//},1000);



//���ʵ�ֻ���   ���Լ���$require����һ������Ĺ���$require.cache
function $require(id){
    const fs=require('fs');
    const path=require('path');
    const filename=path.join(__dirname,id);



    //ʵ�ֻ���
    $require.cache=$require.cache||{};
    if($require.cache[filename]){
        return $require.cache[filename].exports;
    }
    console.log($require.cache)



    //û�л��� ��һ��
    const dirname=path.dirname(filename);
    let code=fs.readFileSync(filename,'utf-8');
    let module={
        id:filename,
        exports:{}
    };
    let exports=module.exports;
    code=`(function($require,module,exports,__dirname,__filename){
                ${code}
        })($require,module,exports,dirname,filename);`;
    eval(code);
    return module.exports;
}





//���ɾ������  һ�㲻���ֶ�ȥ�������  ��������һ���õ�
//1.��һ�ַ�ʽ������delete require.cache[key]
//����ϵͳ��require��������
//var date=require('./Module/require-cache1.js');
//�����Լ�д��$require��������
var date=$require('./Module/require-cache1.js');
setInterval(()=>{

   //����delete require.cache[key]�������
   // Object.keys(require.cache).forEach((key)=>{
   //     //Object.keys(require.cache) === > ["id", "exports", "parent", "filename", "loaded", "children", "paths"]
   //     delete require.cache[key];
   // })

    //��ò�Ҫ��requireд������ ��Ϊÿ��ȥִ���Լ���$require����������ִ��һ�Σ������Ͳ����л���
   // var date=require('./Module/require-cache1.js');
    console.log(date.getTime());
    //��ģ�鷵�ص�ʱ����һ���������ߺ�����ʱ��
    //console.log(date().getTime());
    //console.log(require.cache);
},1000);

//console.log(require.cache);
//{ 'F:\Node\require-cache.js':
//    Module {
//    id: '.',
//        exports: {},
//    parent: null,
//        filename: 'F:\\Node\\require-cache.js',
//        loaded: false,
//        children: [],
//        paths: [ 'F:\\Node\\node_modules', 'F:\\node_modules' ] } }

//2.�ڶ��ַ�ʽ�����ڶ���ģ���в��ú����򷽷���д��,���ַ�ʽ�Ƚ϶�
// ��������ÿ�ε��õ�ʱ���ȥִ��һ�� ������ģ��������