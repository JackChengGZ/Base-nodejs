/**
 * Created by Administrator on 2018/2/14.
 */
//�����㼶Ŀ¼
const fs=require('fs');
const path=require('path');
//�����ļ� ����ģ���Ա  ����ģ���Ա  ����ģ�� ʹ��ģ��

//�汾1
//function mkdirs(pathName,callback){
//    //console.log('mkdirs');
//    //1.�жϴ��� ���Ƿ���һ������·��
//    //F:\Node\Module\demo2\demo3
//    pathName=path.isAbsolute(pathName)?pathName:path.join(__dirname,pathName);
//    //��ȡҪ�����Ĳ���
//    //pathName=pathName.replace(__dirname,'');
//   var relativePath=path.relative(__dirname,pathName);
//    //console.log(relativePath);
//    var folders=relativePath.split(path.sep);
//    //console.log(folders);
//    try{
//        var pre='';
//        folders.forEach(folder=>{
//            //����ͬ���ķ�ʽ ��ֹ�첽ִ��ʱ��Ĳ�ͬ���� ������ļ����ȱ�����
//            fs.mkdirSync(path.join(__dirname,pre,folder));
//            pre=path.join(pre,folder);//demo2
//        });
//        callback&&callback(null);
//    }catch(error){
//        callback&&callback(error);
//    }
//    //console.log(pathName)
//}

//�汾2 �޸�__dirname�ڲ�ͬ�ļ���ָ���Ĳ�ͬ·�� �汾1�е�·��ָ�����ǵ�ǰ��mkdirs.js��__dirname·��
function mkdirs(pathName,callback){
    //module.parent �õ����ǵ����ҵĶ���
    //console.log(module.parent);
    var root=path.dirname(module.parent.filename);
    //console.log(root);//��root ���滻__dirname

    //console.log('mkdirs');
    //1.�жϴ��� ���Ƿ���һ������·��
    //F:\Node\Module\demo2\demo3
    pathName=path.isAbsolute(pathName)?pathName:path.join(root,pathName);
    //��ȡҪ�����Ĳ���
    //pathName=pathName.replace(__dirname,'');
    var relativePath=path.relative(root,pathName);
    //console.log(relativePath);
    var folders=relativePath.split(path.sep);
    //console.log(folders);
    try{
        var pre='';
        folders.forEach(folder=>{
            try{
                //fs.existsSync  �ļ�·���Ƿ��Ѵ���  ��API�Ѿ���ʱ
                //����������򱨴�  �����ж��ļ����Ƿ��Ѿ�����
                fs.statSync(path.join(root,pre,folder));
            }catch(error){
                //����ͬ���ķ�ʽ ��ֹ�첽ִ��ʱ��Ĳ�ͬ���� ������ļ����ȱ�����
                fs.mkdirSync(path.join(root,pre,folder));
            }
            pre=path.join(pre,folder);//demo2
        });
        callback&&callback(null);
    }catch(error){
        callback&&callback(error);
    }
    //console.log(pathName)
}
module.exports=mkdirs;

//ע�� windowsƽ̨�� �ļ���Ƕ��̫��ᵼ���ļ��Ʋ�����
gfdsgfdsgdf