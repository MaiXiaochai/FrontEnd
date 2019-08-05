//封装一个代替getElementById()的方法
function byId(id){
    return typeof(id) === "string"?document.getElementById(id):id;
}

let index = 0,
    timer = null,
    pics =byId("banner").getElementsByTagName("div");
    picsLen = pics.length;

function slideImg() {
    let main = byId("main");
    //划过清除定时器，离开时继续定时器
    main.onmouseover = function () {

    };
    main.onmouseout = function () {
        timer = setInterval(function(){
            index ++;
            if (index >= picsLen){
                index = 0;
            }
            //切换图片
            changeImg();
        }, 3000);
    };
}


//切换图片
function changeImg(){

}
slideImg();
