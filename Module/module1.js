/**
 * Created by Administrator on 2018/2/7.
 */
//ģ���е�ȫ�ֳ�Ա

//��ȡ��ǰ�ű�����·��
//console.log(__dirname);
////�ļ�·��
//console.log(__filename);


const fs=require('fs');
//���е��ļ������������Ǿ���·��(����·��)
fs.readFile(__dirname+'/1.txt','utf8',(error,content)=>{
    //console.log(error)
    //console.log(content.toString());//��������toStringת��
    console.log(content);//���ļ���һ��utf-8�ı����ʽ
});