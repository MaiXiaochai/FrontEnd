# SCSS/SASS基础

---

##### SCSS和SASS的关系

​	 `sass`从第三代开始，放弃了缩进式风格，并且完全向下兼容普通的`css`代码，这一代的`sass`也被称为`scss`。 

##### 1. 变量

+ 变量声明

   ```SCSS
   $highlight-color: #F90;
   
   /*带空格的属性值*/
   $basic-border: 1px solid black;
   
   /*带*/
   $plain-font: "Myriad Pro"、Myriad、"Helvetica Neue"、Helvetica、"Liberation Sans"、Arial和sans-serif; sans-serif;
   
   /*在声明时引用其它变量*/
   $highlight-border: 1px solid $highlight-color;
   ```

   

+ 变量使用

   凡是`css`属性的标准值（比如说1px或者bold）可存在的地方，变量就可以使用 

  + `width: $width;`
  
    <br/>

##### 2.嵌套规则

+ 嵌套样例

  + ```scss
    #content {
      article {
        h1 { color: #333 }
        p { margin-bottom: 1.4em }
      }
      aside { background-color: #EEE }
    }
    /*编译成CSS*/
    #content article h1 { color: #333 }
    #content article p { margin-bottom: 1.4em }
    #content aside { background-color: #EEE }
    ```



+ 父选择器，标识```&```，在处理伪类(:hover这种)时，非常有用

  + ```scss
    /*
    这意味着color: red这条规则将会被应用到选择器article a :hover，
    article元素内链接的所有子元素在被hover时都会变成红色。这是不正确的
    你想把这条规则应用到超链接自身
    */
    article a {
      color: blue;
      :hover { color: red }
    }
    
    article a {
      color: blue;
      &:hover { color: red }
    }
    /*
    这两者最大的区别在于 a 与 :hover 之间有没有空格，
    是否有空格区别很大
    */
    article a :hover{color: red} /* 有空格，表示所有 a 内的元素都变红*/
    article a:hover{color: red} /* 没有空格，表示只有 鼠标悬浮于a上时候，a元素才会变红*/
    ```

  + 父选择器之前添加选择器，选择特定位置的元素

    ```scss
    #content aside {
      color: red;
      body.ie & { color: green }
    }
    /*编译为CSS*/
    #content aside {color: red};
    body.ie #content aside { color: green } /*这行定位到 类名含有"ie"的body下的、id为 content元素，
    										而不是所有id 为 content 的元素*/
    ```

  

+ 群组选择器的嵌套

  + ```scss
    .container {
      h1, h2, h3 {margin-bottom: .8em}
    }
    
    /*编译*/
    .container h1, .container h2, .container h3 { margin-bottom: .8em }
    ```

  + ```SCSS
    nav, aside {
      a {color: blue}
    }
    /*编译后*/
    nav a, aside a {color: blue}
    ```



+ 子组合选择器和同层组合选择器: >、+ 、~

  + ```SCSS
    /*
    第一个选择器会选择article下的所有命中section选择器的元素。
    第二个选择器只会选择article下紧跟着的子元素中命中section选择器的元素。
    */
    article section { margin: 5px }
    article > section { border: 1px solid #ccc }
    ```

  + ```SCSS
    /*
    同层相邻组合选择器 + 选择header元素后紧跟的p元素
    */
    header + p { font-size: 1.1em }
    ```

  + ```SCSS
    /*
    同层全体组合选择器~，选择所有跟在article后的同层 article元素，不管它们之间隔了多少其他元素
    */
    article {
      ~ article { border-top: 1px dashed #ccc }
      > section { background: #eee }
      dl > {
        dt { color: #333 }
        dd { color: #555 }
      }
      nav + & { margin-top: 0 }
    }
    /*等价于*/
    article ~ article { border-top: 1px dashed #ccc }
    article > footer { background: #eee }
    article dl > dt { color: #333 }
    article dl > dd { color: #555 }
    nav + article { margin-top: 0 }
    ```

+ 嵌套属性

   把属性名从中划线`-`的地方断开（中划线也被去掉了），在根属性后边添加一个冒号:，紧跟一个`{ }`块，把子属性部分写在这个`{ }`块中 

  + ```SCSS
    nav {
      border: {
      style: solid;
      width: 1px;
      color: #ccc;
      }
    }
    
    /*等价于*/
    nav {
      border-style: solid;
      border-width: 1px;
      border-color: #ccc;
    }
    
    ```

  + 对意外规则的指明

    ```SCSS
    nav {
      border: 1px solid #ccc {
      left: 0px;
      right: 0px;
      }
    }
    
    /*等价于*/
    nav {
      border: 1px solid #ccc;
      border-left: 0px;
      border-right: 0px;
    }
    ```

##### 3.**导入SASS文件**

`sass`也有一个`@import`规则，但不同的是，`sass`的`@import`规则在生成`css`文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个`css`文件中，而无需发起额外的下载请求。另外，所有在被导入文件中定义的变量和混合器（参见2.5节）均可在导入文件中使用。



使用`sass`的`@import`规则并不需要指明被导入文件的全名。你可以省略`.sass`或`.scss`文件后缀（见下图） 

 ![img](https://www.sass.hk/images/p1.png) 

+ 使用SASS部分文件

  + 局部文件

     当通过`@import`把`sass`样式分散到多个文件时，你通常只想生成少数几个`css`文件。那些专门为`@import`命令而编写的`sass`文件，并不需要生成对应的独立`css`文件，这样的`sass`文件称为局部文件。

     

  + 局部文件约定

     `sass`局部文件的文件名以下划线开头 。

     这样，`sass`就不会在编译时单独编译这个文件输出`css`，而只把这个文件用作导入。 

    

  +  当你`@import`一个局部文件时，还**可以不写文件的全名**，即省略文件名开头的下划线。举例来说，你想导入`themes/_night-sky.scss`这个局部文件里的变量，你只需在样式表中写`@import` `"themes/night-sky";` 

    

+ 默认变量值

  `!default`用于变量，含义是：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。 

  + ```SCSS
    /*
    如果用户在导入你的sass局部文件之前声明了一个$fancybox-width变量，那么你的局部文件中对$fancybox-width赋值400px的操作就无效。如果用户没有做这样的声明，则$fancybox-width将默认为400px。
    */
    $fancybox-width: 400px !default;
    .fancybox {
    width: $fancybox-width;
    }
    ```

+ 嵌套导入

   跟原生的`css`不同，`sass`允许`@import`命令写在`css`规则内 。

   这种导入方式下，生成对应的`css`文件时，局部文件会被直接插入到`css`规则内导入它的地方。 

  例子：

  ```SCSS
  /*_blue-theme.scss 局部文件*/
  
  aside {
    background: blue;
    color: white;
  }
  
  /*把上边这个局部文件导入到一个CSS规则内*/
  .blue-theme {@import "blue-theme"}
  
  /*
  生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。
  被导入的局部文件中定义的所有变量和混合器，也会在这个规则范围内生效。
  */
  
  .blue-theme {
    aside {
      background: blue;
      color: #fff;
    }
  }
  ```

  

+ 原生的CSS导入

   由于`sass`兼容原生的`css`，所以它也支持原生的`CSS@import`

   在下列三种情况下会生成原生的`CSS@import` 

  - 被导入文件的名字以`.css`结尾；

  - 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；

  - 被导入文件的名字是`CSS`的url()值。

    

   这就是说，你不能用`sass`的`@import`直接导入一个原始的`css`文件，因为`sass`会认为你想用`css`原生的`@import`。但是，因为`sass`的语法完全兼容`css`，所以你可以把原始的`css`文件改名为`.scss`后缀，即可直接导入了。 

  

##### 4. 静默注释

​		`sass`另外提供了一种不同于`css`标准注释格式`/* ... */`的注释语法，即静默注释，其内容不会出现在生成的`css`文件中。  它们以`//`开头，注释内容直到行末。 

   + ```SCSS
     body {
       color: #333; // 这种注释内容不会出现在生成的css文件中
       padding: 0; /* 这种注释内容会出现在生成的css文件中 */
     }
     ```



##### 5.混合器

​	 混合器实现大段样式的重用 

+ 定义一个混合器(关键词 @mixin)

  ```SCSS
  @mixin rounded-corners {
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  ```

+ 使用混合器(关键词 @include)

  ```scss
  notice {
    background-color: green;
    border: 2px solid #00aa00;
    @include rounded-corners;
  }
  
  //sass最终生成：
  .notice {
    background-color: green;
    border: 2px solid #00aa00;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  ```

+ 注意

   实际上，混合器太好用了，一不小心你可能会过度使用。大量的重用可能会导致生成的样式表过大，导致加载缓慢。所以，首先我们将讨论混合器的使用场景，避免滥用。 

  

+ 什么时候使用混合器

   判断一组属性是否应该组合成一个混合器，一条经验法则就是你能否为这个混合器想出一个好的名字。 

  

+ 混合器中的CSS规则

  ```SCSS
  // 定义混合器
  @mixin no-bullets {
    list-style: none;
    li {
      list-style-image: none;
      list-style-type: none;
      margin-left: 0px;
    }
  }
  
  // 使用混合器
  ul.plain {
    color: #444;
    @include no-bullets;
  }
  
  //上面样式等价于
  ul.plain {
    color: #444;
    list-style: none;
  }
  ul.plain li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
  ```



+ 给混合器传参

   可以通过在`@include`混合器时给混合器传参，来定制混合器生成的精确样式。

  当`@include`混合器时，参数其实就是可以赋值给`css`属性值的变量。 

  ```SCSS
  // 声明可传参数的混合器
  @mixin link-colors($normal, $hover, $visited) {
    color: $normal;
    &:hover { color: $hover; }
    &:visited { color: $visited; }
  }
  
  // 使用混合器
  a {
    @include link-colors(blue, red, green);
  }
  
  //Sass最终生成的是：
  
  a { color: blue; }
  a:hover { color: red; }
  a:visited { color: green; }
  ```



+ 带名称的参数

   当你@include混合器时，有时候可能会很难区分每个参数是什么意思，参数之间是一个什么样的顺序。为了解决这个问题，`sass`允许通过语法`$name: value`的形式指定每个参数的值。 

  ```SCSS
  a {
      @include link-colors(
        $normal: blue,
        $visited: green,
        $hover: red
    );
  }
  ```



+ 默认参数值

   为了在`@include`混合器时不必传入所有的参数，我们可以给参数指定一个默认值。

  参数默认值使用`$name: default-value`的声明形式，默认值可以是任何有效的`css`属性值，甚至是其他参数的引用 

  ```SCSS
  //声明默认值参数
  @mixin link-colors(
      $normal,
      $hover: $normal,
      $visited: $normal
    )
  {
    color: $normal;
    &:hover { color: $hover; }
    &:visited { color: $visited; }
  }
  
  // 调用
  //$hover和$visited也会被自动赋值为red。
  @include link-colors(red) 
  ```

  

##### 6.选择器继承

​	 选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式 

​	关键词 `@extend`

+ 继承样例

  ```SCSS
  //通过选择器继承继承样式
  .error {
    border: 1px solid red;
    background-color: #fdd;
  }
  
  //.seriousError将会继承样式表中任何位置处为.error定义的所有样式。
  //以class="seriousError" 修饰的html元素最终的展示效果等价于class="seriousError error"(这里没有重写父选择器样式)
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
  ```

  

+  `.seriousError`不仅会继承`.error`自身的所有样式，

  任何跟`.error`有关的组合选择器样式也会被`.seriousError`以组合选择器的形式继承 

  ```SCSS
  //.seriousError从.error继承样式
  //要结合上段代码进行理解
  .error a{  //应用到.seriousError a
    color: red;
    font-weight: 100;
  }
  
  h1.error { //应用到hl.seriousError
    font-size: 1.2rem;
  }
  
  //在class="seriousError"的html元素内的超链接也会变成红色和粗体
  ```

  

+ 什么时候使用继承

   当一个元素拥有的类（比如说`.seriousError`）表明它属于另一个类（比如说`.error`），这时使用继承最合适。

  父类的样式分散在样式表的不同地方，这时候用继承的话，可以把这些一起继承过来

  

+ 继承的高级用法

   假如一条样式规则继承了一个复杂的选择器，那么它只会继承这个复杂选择器命中的元素所应用的样式。 

##### 参考文章

 https://www.sass.hk/guide/ 

