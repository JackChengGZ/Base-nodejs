/**
 * Created by Administrator on 2018/2/13.
 */
////���� ��ȡͼƬ ���ϴ��ļ���ȡ��������buffer����
//const fs=require('fs');
//const path=require('path');
////fs.readFile(path.join(__dirname,'./FileTest/star.jpg'),(error,data)=>{
////    if(error) throw error;
////   //console.log(data);
////    //��64λ���������  ǧ������utf-8,��Ϊ�������ı�����ͼƬ����Ҫ����64λ����
////    //���ɵ���64λ�ı����ʽ��������data:image/jpg;base64,�ӱ��� ��������д�
////    console.log(data.toString('base64'));
////})
//
////�ַ���Ҳ����ת��Ϊ64λ����
//var buf=new Buffer('hello world','utf-8');
//console.log(buf.toString('base64'));//һ�����һ���ǡ�=������64λ�ı�����

//�ܽ� ����ĸ�ʽ���Ǻܶ�
//1.ASCII���  2.utf-8  3.utf-16le  4.ucs2  5.base64  6.binary(exe����2����)  7.hex




////�ļ����������   ��ʵwindows��Ĭ�ϱ��붼��GBK�ı����ʽ
//const fs=require('fs');
//const path=require('path');
////����Node���������,node������û�а취����ģ�һ����õ���������Ĳ��iconv-lite
////����ַ������ת������
//const iconv=require('iconv-lite');
////readFile�ķ�ʽȷʵ��ʹ����Buffer,����Ҳ��һ���Զ�ȡ
//fs.readFile(path.join(__dirname,'./FileTest','./love.lrc'),(error,data)=>{
//        if(error) throw error;
//        console.log(data);
//        console.log('+++++++++++++++++++++++++++++++++++++++++++++');
//        console.log(data.toString());//����������� Ĭ�Ͼ���utf-8
//        console.log('+++++++++++++++++++++++++++++++++++++++++++++');
//        //console.log(data.toString('GBK'));//��node�в�֧��GBK����
//        console.log('+++++++++++++++++++++++++++++++++++++++++++++');
//        console.log(iconv.decode(data,'gbk'));//���ò�����gbk�����ʽ
//    }
//);



//���� ��̬��ʹ���
const fs=require('fs');
const path=require('path');
const iconv=require('iconv-lite');
fs.readFile(path.join(__dirname,'./FileTest','./love.lrc'),(error,data)=>{
        if(error) throw error;
        //console.log(iconv.decode(data,'gbk'));//���ò�����gbk�����ʽ
        var lines=iconv.decode(data,'gbk').split('\n');//�Ի����и������
        //console.log(line.length);
        // [03:27.683]����Ҫѧ���Լ�����
        var reg=/\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
        var begin=new Date().getTime();
        //����
            lines.forEach((line)=>{
                    //console.log(reg.test(line));
                    var matches=reg.exec(line);
                 if(matches){
                      var m=parseInt(matches[1]);
                      var s=parseInt(matches[2]);
                      var f=parseInt(matches[3]);
                      var lyric=matches[4];
                      //��ǰ�в�������ִ�е�
                      //console.log(new Date().getTime());
                      //������������ʱ�䲻һ��  ��Ҫ�Ǵ����ִ����Ҫһ����ʱ�����Ի���һ���ĺ���
                      //������Ҫ��ȥ��������offset
                       var offset=new Date().getTime()-begin;//�����
                         setTimeout(()=>{
                             console.log(lyric);
                       },m*60*1000+s*1000+f-offset);
                 }else{
                     //����һ�и��
                    console.log(line)
                 }

            })
    }
);










