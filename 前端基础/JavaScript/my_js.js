// switch ... case ...
let grade = 'A';
switch(grade){
    case 'A': document.write("成绩不错");
    break;
    case 'B': document.write("还可以");
    break;
    case 'C': document.write("马马虎虎");
    break;
    default: document.write("成绩未知");
}

// while
let count = 0;
while (count < 10){
    document.write("当前值是: " + count + "<br>");
    count ++;
}
document.write("Done.");

// do ... while ...
let counter = 0;
do{
    document.write("当前值是: " + counter + "<br>");
    counter++;
}
while(counter<10);