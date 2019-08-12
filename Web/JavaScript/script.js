//封装一个代替getElementById()的方法
function byId(id){
    return typeof(id) === "string"?document.getElementById(id):id;
}

let index = 0,
    timer = null,
    pics =byId("banner").getElementsByTagName("div"),
    dots =byId("dots").getElementsByTagName("span"),
    prev=byId("prev"),
    next=byId("next"),
    picsLen = pics.length,
    menu = byId("menu-content"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    //getElementsByClassName IE8及以下不支持
    menuItems = menu.getElementsByClassName("menu-item");

function slideImg() {
    let main = byId("main");
    //划过清除定时器，离开时继续定时器
    main.onmouseover = function () {
        if (timer) clearInterval(timer);
    };
    main.onmouseout = function () {
        timer = setInterval(function(){
            index ++;
            if (index >= picsLen){
                index = 0;
            }
            //切换图片
            changeImg();
        }, 4000);
    };
    main.onmouseout();
    //遍历所有圆点，绑定点击事件，点击圆点来切换图片
    for (let j = 0; j < picsLen; j++){
        //在这里给所有span添加一个id，值为j，作为当前span的索引
        dots[j].id = j;
        //在JS中，function 是可以改变作用域的，这里的function 内部获取的是j的最终值 3，外部还是j的计算值
        dots[j].onclick = function(){
            //修改index值为当前span的索引值
            index = this.id;
            //调用changeImg函数，changeImg是根据index值来修改属性的，所以，要先改变index的值↑为正确的值
            changeImg();
        }
    }
    next.onclick=function(){
        index++;
        if(index >= picsLen) index=0;
        changeImg();
    };
    prev.onclick=function(){
        index--;
        if(index < 0) index = picsLen - 1;
        changeImg();
    };

    //导航菜单
    //遍历主菜单，且绑定事件
    for(let m=0; m<menuItems.length; m++){
        menuItems[m].setAttribute("data-index", m);
        menuItems[m].onmouseover = function () {
            subMenu.className = "sub-menu";
            //遍历所有子菜单，将每一个都隐藏
            for (let b = 0; b < innerBox.length; b++){
                innerBox[b].style.display="none";
                menuItems[b].style.background = "None";
            }
            //每一个menu-item定义data-index属性，作为索引
            //这里其实去掉了class 的 hide 值
            menuItems[m].style.background = "rgba(7, 17, 27, 0.1)";
            innerBox[m].style.display = "block";
        }
    }
    menu.onmouseout=function(){
        subMenu.className = "sub-menu hide";
    };
    subMenu.onmouseover= function(){
        this.className = "sub-menu"
    };
    subMenu.onmouseout = function(){
        this.className = "sub-menu hide";
    };
}


//切换图片
function changeImg(){
    //遍历 banner下所有的div 及 dots下所有的span，将div隐藏，将span类属性值清除
    for(let i=0; i <picsLen; i++){
        pics[i].style.display="none";
        dots[i].className="";
    }
    //根据index找到当前div和当前span，将div显示出来和设置为当前
    pics[index].style.display = "block";
    dots[index].className="active";
}
slideImg();

//
