

# web开发框架express

- 安装

  - npm init
  - npm install express --save

- 基本使用

  - ```
    var express = require('express');//返回一个函数
    var app = express();
    const app=require('express')();//与上面两行是相同效果
    
    //绑定一个根路径的请求
    app.get('/',(req,res)=>{
    res.send('Hello World');
    }).listen(3000,()=>{
    console.log('running');
    });
    
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
    //实现helloworld
    ```

- express实现静态服务器

  - ```
    const express=require('express');
    const app=express();
    //托管静态资源文件
    //use方法的第一个参数可以指定一个虚拟路径
    app.use('abc',express.static('public'));
    app.use('/Hi',express.static('xxx'))
    //可以指定多个目录作为静态资源目录
    
    app.listen(3000,()=>{
    console.log('running...')
    })
    ```

- express路由处理

  - 路由(根据请求路径和请求方式进行路径分发处理)

  - http的常用请求方式

    - post  添加
    - get    查询
    - put      更新
    - delete 删除

  - restful api(一种URL格式)

  - 实现增删改查操作

    - ```
      const express=require('express');
      const app=express();
      
      //基本的路由处理
      app.get('/'(req,res)=>{
      res.send('get data')
      });
      app.post('/'(req,res)=>{
      res.send('post data')
      });
      app.put('/'(req,res)=>{
      res.send('put data')
      });
      app.delete('/'(req,res)=>{
      res.send('delete data')
      });
      
      //通过use方法处理,可以直接处理所有的请求，内置中间件
      app.use((req,res)=>{
      res.send('ok');
      });
      
      app.listen(3000,()=>{
      console.log('running..')
      }); 
      ```

- express中间件

  - 中间件:就是处理过程中的一个环节(本质上就是一个函数)

  - 应用级中间件

  - 中间件的挂载方式和执行流程

    - 应用级中间件绑定到app对象使用app.use()和app.MRTHOD()，其中METHOD是需要处理的http请求的方法，

    - ```
      const express=require('express');
      const app=express();
      
      let total=0;
      
      app.use((req,res,next)=>{
      console.log('有人访问');
      next();
      })
      app.use('user',(erq,res,next)=>{
      //记录访问时间
      console.log(Date.now());
      next(); 
      })
      
      app.use('user',(erq,res,next)=>{
      //记录访问日志
      console.log('访问了/user');
      next(); //next方法的作用就是把请求传递到下一个中间件
      })
      
      app.use('user',(erq,res,next)=>{
      total++;
      console.log(total);
      res.end('reault');
      });
      
      app.listen(3000,()=>{
      console.log('running');
      })
      
      //三个中间件
      ```

  - 路由级中间件

    - 路由级使用router.use()或router.VERB()加载，get post put delete

    - ```
      const express=require('express');
      const app=express();
      
      app.get('/abc',(req,res,next)={
      console.log(1);
      next('router');//用来跳转到下一个路由
      }(req,res)=>{
      console.log(2);
      res.send('abc')
      });//本质上是一个路由
      
      app.get('/abc',(req,res)=>{
      console.log(3);
      res.send('hello');
      })
      app.listen(3000,()={
      console.log('running');
      })
      ```

  - 错误处理中间件

    - 错误处理中间件函数的定义方式与其他中间件函数基本相同，差别在于错误处理函数有四个自变量而不是三个，专门具有特征符 `(err, req, res, next)`： 

    - ```
      app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
      });
      ```

  - 应用层中间件参数处理和body -parser的使用

    - ```
      const express =require('express');
      const app=express();
      //挂载参数处理中间件(post)
      app.use(bodyParser.urlencoded({extended:false}));
      //处理json格式的参数
      app.use(bodyParser.json())
      //处理get提交参数
      app.get('/login',(req,res)=>{
      let data=req.query;
      console.log(data);
      res.send('get');
      })
      
      //处理post提交参数 
      app.post('/login',(req,res)=>{
      let data=req.body;
      //console.log(data);
      if(data.username=='admin'&&data.password=='123'){
      res.send('登录成功');
      }else{
      res.send('登录失败')
      }
      })
      
      //处理put提交参数
      app.put('/login',(req,res)=>{
      res.end('put data');
      });
      
      //处理delete提交参数
      app.delete('/login',(req,res)={
      res.end('delete data');
      })
      
      app.listen(3000,()=>{
      console.log('running');
      })
      ```

    - ajax参数传递

    - ```
      $(function(){
      $('#btn').click(function(){
      var obj={
      username:$('#username').val(),
      password:$('#password').val()
      }
      $.ajax({
      type:'post/put/get/detele',
      url:'http://localhost:3000/login',
      contenType:'application/json',
      dataType:'text',
      data:JSON.stringify(obj),
      sucess:function(data){
      console.log(data);
      }
      })
      })
      })
      ```

    - 

