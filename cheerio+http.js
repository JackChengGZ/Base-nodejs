/**
 * Created by Administrator on 2018/2/20.
 */
//Cheerio��װ��ɺ󣬿��Խ�����ҳ����ץȡ��
//����һ����������ģ�� ��ͨ��npm install cheerio����

//const cheerio = require('cheerio');
//var $ = cheerio.load('<h2 class="title">Hello world</h2>');
//$('h2.title').text('Hello there!');
//$('h2').addClass('welcome');
//console.log($.html());





//���� ����Ľ����Node.js�̳̻�õ���������
// ����httpģ��
var http = require('http');
// Cheerio ��һ��Node.js�Ŀ⣬ �����Դ�html��Ƭ���й���DOM�ṹ��Ȼ���ṩ��jqueryһ����cssѡ������ѯ
var cheerio = require('cheerio');

// ���������Ŀ���ַ
var url = 'http://www.imooc.com/learn/348';

http.get(url, function(res) {
    var html = '';
    // ��ȡҳ������
    res.on('data', function(data) {
        html += data;
    });
    // ���ݻ�ȡ����
    res.on('end', function() {
        // ͨ�������½���Ϣ��ȡʵ������Ŀγ���Ϣ
        var courseData = filterChapters(html);
        // ��ӡ�γ���Ϣ
        printCourseInfo(courseData);
    });
}).on('error', function() {
    console.log('��ȡ���ݳ���');
});

/* �����½���Ϣ */
function filterChapters(html) {
    // ����JQuery���
    var $ = cheerio.load(html);
    // ͨ��������ȡ�½���Ϣ
    var chapters = $('.chapter');
    // �γ����ݣ���������һ������
    var courseData = [];

    /* �½���Ϣ���� */
    chapters.each(function(item) {
        // ��ȡ������ÿһ��
        var chapter = $(this);
        // ��ȡstrong��ǩ������ı���trim()ȥ���ո�split()�ָ������飬����ֻ��ȡ�½ڱ���
        var chapterTitle = chapter.find('strong').text().trim().split('\n')[0];
        // ��ȡvideo��ǩ�µ��ӱ�ǩli������
        var videos = chapter.find('.video').children('li');
        // �����½�����
        var chapterData = {
            chapterTitle : chapterTitle,
            videos : []
        };

        /* ��Ƶ��Ϣ���� */
        videos.each(function(item) {
            // ͨ����ǩ����������ȡ��������Ƶ��Ϣ
            var video = $(this).find('.J-media-item');
            // ��Ƶ����
            var videoTitle = video.text().trim().split('\n')[0].trim();
            // ��Ƶʱ��
            var videoTime = video.text().trim().split('\n')[1].trim();
            // ��Ƶ���
            var id = String(video.attr('href')).split('video/')[1];
            // ����½���Ϣ����Ƶ����
            chapterData.videos.push({
                title : videoTitle,
                time : videoTime,
                id : id
            });
        });
        // ���γ���Ϣ�е��½���Ϣ
        courseData.push(chapterData);
    });
    // ���ؿγ���Ϣ
    return courseData;
}

/* ��ӡ�γ���Ϣ */
function printCourseInfo(courseData) {
    // �����γ���Ϣ
    courseData.forEach(function(item) {
        // ��ȡ�½ڱ���
        var chapterTitle = item.chapterTitle;
        // ��ӡ�½ڱ��Ⲣ����
        console.log(chapterTitle + '\n');
        // ����ÿ���½��е���Ƶ��Ϣ����ӡ
        item.videos.forEach(function(video) {
            console.log('   [' + video.id + '] ' + video.title + ' ' + video.time + '\n');
        });
    });
}