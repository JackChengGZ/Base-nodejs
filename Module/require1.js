/**
 * Created by Administrator on 2018/2/8.
 */
//定义一个模块 类似于node中的fs http等模块
//注意 这里暴露了一个全局成员say 但是在自己写的$require中要为他创建一个私有空间不被污染
function say(msg){
    console.log(msg);
}
module.exports={say};