# CSS选择器小结

---

+ **1. 选择器 {声明N}**

  ```selector {declaration1; declaration2; ... declarationN}```

	```css
	h1 {color:red; font-size: 14px;}
	```
  <br/>

+ **2. 选择器N {声明M}**

  ```selector1,selector2, ... selectorN {declaration1; declaration2; ... declarationM}```

  ```css
  h1,h2,h3,h4,h5,h6 {
    color: green;
    }
  ```
<br/>

+ **3. 父选择器 子选择器 {声明N}**——这种组合的选择器叫派生选择器

  ```selector-father selector-child {declaration1; declaration2; ... declarationN}```

  ```css
  li strong {
      font-style: italic;
      font-weight: normal;
    }
  ```
<br/>

+ **4. id 选择器**

  ```#id-number {declaration1; declaration2; ... declarationN}```

  ```css
  #red {color: red;}
  ```

  常用于建立派生选择器

  ```css
  #sidebar p {
  	font-style: italic;
  	text-align: right;
  	margin-top: 0.5em;
  	}
  ```
  <br/>

+ **5. 类选择器**
  ```.class-value {declaration1; declaration2; ... declarationN}```
  
  ```css
  .center {text-align: center}
  ```
  
  
  
  同样类选择器也可以建立派生选择器
  
  ```.class-value selector {declaration1; declaration2; ... declarationN}```
  
  ```css
  .fancy td {
  	color: #f60;
  	background: #666;
  	}
  ```
  
  元素也可以基础它们的类而被选择
  
  ```css
  /*类名为fancy的表格单元将被选中，应用样式*/
  td.fancy {
  	color: #f60;
  	background: #666;
  	}
  ```
  <br/>
  
+ **6. 属性选择器**

  ```[attr-name] {declaration1; declaration2; ... declarationN}```

  ```css
  [title]
  {
  color:red;
  }
  ```
  <br/>
  
+ **7. 属性和值选择器**
  <br/>

  ```[attr-name=attr-value] {declaration1; declaration2; ... declarationN}```

  ```css
  [title=W3School]
  {
  border:5px solid blue;
  }
  ```

  