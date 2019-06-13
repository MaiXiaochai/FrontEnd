#### Flask— request、response & template

##### 1. request

* .path 请求路径
* .method 请求方法
* .args.get('key', None) 地址看查询字符串
* .form 表单成员
  * .form['name']
  * .form.get['name']

* .values['name'] 查询字符串/表单数据
* .headers 头部信息
  * .headers['User-Agent'] 浏览器
  * .headers['Host'] 主机
  * ...

* .remote_addr 客户端ip
* .environ 环境
* .full_path 完整路径
* .url
* .base_url
* .url_root
* .is_xhr 是否是 XMLHttpRequest 请求（异步请求）
* .blue_print 当前蓝图
* .view_args 视图参数

##### 2. response

* resp = make_response()，中resp的值可以自定义，如resp.response=render_template('index.html')
* resp.status_code = 200 / resp.status = '200'
*  redirect 重定向，return redirect('/b/')，重定向到 '/b/'
* url_for，根据视图函数获取重定向的地址，方便动态修改重定向. url_for('rq_index', code=301)，状态码301为永久转跳，有利于保持搜索引擎权重。
* abort(404)，抛出状态码404。出Not Found 页面。需求场景，给SQL注入的请求的或者其它恶意访问的响应。

##### 3. template（Jinja模板）

* {{ 变量}}

* {%语句%}

  * {% for i in range(5)%}

    ​		{{i}}

    {%endfor%}

* {#注释#}

##### 4. update on

* **Last** 2019-6-14 01:22:06