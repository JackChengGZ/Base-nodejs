/**
 * Created by Administrator on 2018/2/13.
 */
//���� ��̬��ʹ���----readFile��ȡ�ļ�����
//const fs=require('fs');
//const path=require('path');
//const iconv=require('iconv-lite');
//fs.readFile(path.join(__dirname,'./FileTest','./love.lrc'),(error,data)=>{
//        if(error) throw error;
//        //console.log(iconv.decode(data,'gbk'));//���ò�����gbk�����ʽ
//        var lines=iconv.decode(data,'gbk').split('\n');//�Ի����и������
//        //console.log(line.length);
//        // [03:27.683]����Ҫѧ���Լ�����
//        var reg=/\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
//        var begin=new Date().getTime();
//        //����
//        lines.forEach((line)=>{
//            //console.log(reg.test(line));
//            var matches=reg.exec(line);
//            if(matches){
//                var m=parseInt(matches[1]);
//                var s=parseInt(matches[2]);
//                var f=parseInt(matches[3]);
//                var lyric=matches[4];
//                //��ǰ�в�������ִ�е�
//                //console.log(new Date().getTime());
//                //������������ʱ�䲻һ��  ��Ҫ�Ǵ����ִ����Ҫһ����ʱ�����Ի���һ���ĺ���
//                //������Ҫ��ȥ��������offset
//                var offset=new Date().getTime()-begin;//�����
//                setTimeout(()=>{
//                    console.log(lyric);
//                },m*60*1000+s*1000+f-offset);
//            }else{
//                //����һ�и��
//                console.log(line)
//            }
//
//        })
//    }
//);



//������һ���򵥵��ļ����Ķ�ȡ��ʽ

//const fs=require('fs');
//const path=require('path');
//const iconv=require('iconv-lite');
//var filename=path.join(__dirname,'./FileTest/love.lrc');
//var streamReader=fs.createReadStream(filename)
//    .pipe(iconv.decodeStream('gbk'));
//var data='';
//streamReader.on('data',(chunk)=>{
//     //chunkֻ���ĵ���һ��Ƭ�Σ�Ҳ����һ���� ������
//     data+=chunk.toString();
//});
//streamReader.on('end',()=>{
//     //֪ͨ�Ѿ��������ĵ��Ķ�ȡ  ��ʱdata��һ���������ĵ�
//        console.log(data);
//});


//����  ����readline�ķ�ʽһ��һ�еĶ�ȡ��� node���õ�API
/* ע��:������ķ�����ͬ���� ����ĻὫ�ļ�һ���Զ�ȡ���ڴ���Ȼ��������д�Ĵ���һ����ȥ���ļ�
 �����ݲ������ڴ����̫С���ļ�̫�����ֿ��٣����Ҷ�ȡ�������ļ����ڴ���Ҳ�����Ĵ�����ʱ��
 ������������ַ����ǲ������ķ�ʽ�����Ǳ������ڴ��п���1024���ֽ�����Buffer�ռ��С��
 Ȼ���ļ���һС���ֶ�ȡ�����Buffer�У��������ǵĴ���ȥ��ȡBuffer�е��ļ�����,ʵ����
 һ����������á�
 *
 * */
const fs=require('fs');
const path=require('path');
const iconv=require('iconv-lite');
const readline=require('readline');
var filename=path.join(__dirname,'./FileTest/love.lrc');
//�����ķ�ʽ��ȡ�ļ�����
var streamReader=fs.createReadStream(filename)
    .pipe(iconv.decodeStream('gbk'));//gbkת��
//����readlineһ��һ�ж�ȡ streamReader
var rl=readline.createInterface({input:streamReader});
// [03:27.683]����Ҫѧ���Լ����� =>��������
var reg=/\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
//��ȡ�ļ����ݵĿ�ʼʱ��
var begin=new Date().getTime();
rl.on('line',(line)=>{
    //console.log(typeof line);//string  ������������һ��string
    task(line,begin);
});
//������ÿ�������������ʷ�װ��һ������task
function task(line,begin){
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
}
