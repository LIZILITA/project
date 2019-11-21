

# nodejs学习笔记

## node环境配置

#### 安装

- 下载nvm(nodejs版本控制工具)
  - 下载nodejs，选择mis文件
  - 下载nvm，解压后以管理员身份运行install.cmd
  - 修改setting.txt文件
    - root:c:/dev/nvm
    - path:c:/dev/nodejs
- 在C盘创建目录dev，创建两个子目录nvm和nodejs
- 配置环境变量
  - 配置nvm环境变量
    - NVM_HOME
      - c:/dev/nvm
  - 配置nodejs环境变量
    - NVM_SYMLINK
      - C:/dev/nodejs
  - 配置path
    - 添加%NVM_HOMR%
    - %NVM_SYMLINK%
- 安装和切换其他版本的nodejs
  - 安装
    - nvm install  x.x.x
  - 切换
    - nvm use  x.x.x

#### nodejs全局成员概述

- nodejs终端使用

  - 运行node命令
    - 运行原理与浏览器中的控制台基本相同

  - 运行本地js文件
    - 切换到目录下
    - node  xxx.js

## node模块化

#### nodejs初识模块化

- 全局成员概述
  - __filename
    - 包含文件名称的全路径
  - __dirname
    - 文件的路径(不包含文件名)
  - setTimeout(函数，xx毫秒)
    - 定时函数
    - 在执行到这一行的时候程序并不会停下来等定时函数执行完毕
  - clearTimeout(timer)
    - 清除定时函数
  - buffer
    - 文件操作
  - global
    - 与浏览器中的window对象类似
  - process.argv
    - 是一个数组
    - 默认情况下，前两项数据分别是
      - node.环境的路径
      - 当前执行js文件的全路径
    - 从第三个参数开始表示命令行参数
      - node xx.js  参数1  参数2   参数3
    - process.arch
      - 当前系统的架构(32,64)

#### 模块化成员导出详解

- 模块化开发
  - 传统非模块开发有如下缺点
    - 命名冲突
    - 文件依赖
  - 标准的模块化规范
    - AMD-require js
    - CMD  -seajs
  - 服务器端的模块化规范
    - CommonJS    -node.js
  - 模块化相关的规则
    - 如何定义模块‘
      - 一个js文件就是一个模块，模块内部的成员都是相互独立的
    - 模块成员的导出和引入
      - 引入模块
        - require('文件路径')
      - 导出模块成员
        - export.模块=模块
        - module.exports=sum
          - 引入时用module(有参？);

#### 模块化细节补充

- 模块成员导出：global
  - global.模块(参数名)=模块(实例)
    - global中的XXX=XX模块
  - 使用的时候直接使用global.参数名
    - 为空的话会为undefined
  - require模块的加载会被缓存
    - 已经被加载的文件不会再加载
    - 性能优化
  - 模块文件的类型
    - js
    - json
    - node（c语言开发文件）
  - 假如有三个同名的js，json，node文件，则加载顺序为(引入时不加后缀名)
    - js
    - json
    - node
  - 模块分类
    - 自定义模块
    - 系统核心模块
      - 访问官方API文档
      - fs文件操作
      - http网络操作
      - path路径操作
      - queryString查询参数分析
      - url url解析
      - ......



## node基础

### node基本操作

##### buffer实例化

- 文件操作案例

  - 初始化目录

    - let root='文件路径';

  - 初始化数据

    - 一个实例对象

  - 创建项目根路径

    - 引入模块

      - ``const  path=require('path')``

      - ``const fs=require('fs')``

    - 调用模块

      ```
      //创建项目根路径
      fs.mkdir(path.join(root,initData.projectName),(err)=>{
      if(err) return;
      //创建子目录和文件
      initData.data.forEach((item)=>{
      if(item.type=='dir'){
      //创建子目录
      fs.mkdirSync(path.join(root,initData.projectName,item.name));
      }else if(item.type=='file'){
      //创建文件并写入内容
      fs.writeFileSync(path.join(root,initData.projectName,item.name),fileContent(外部引入的模块html文件))
      }
      )} 
      });
      ```

##### buffer基本操作

- buffer本质上就是字节数组

- API

  - 构造方法（class）
  - 静态方法
  - 实例方法

- 通过实例化来调用buffer(new)

  - `` let buf=new buffer(5);`` //<Buffer  a8 61 40 00 00>16进制
    - 实例化buffer对象
    - 生成五个随机字节
    - 不推荐使用

  - ``let buf=Buffer.alloc(5);``
    - 生成五个空的字节

- 通过静态方法

  - ``let buf Buffer.from('hello')``//buf产生此此字符的16进制编码
  - ``const buf=Buffer.from(arr)``//传入一个16进制数字的数组
    - 打印出ASCII编码
    - 可以使用toString方法转换为字符串
  


##### buffer实例化方法

- 实例化
  - Buffer.from(array)
  - Buffer.from(String)
    - from方法可以增加第二个参数，编码(utf8，等，)
  - Buffer.alloc(size)
- 功能方法
  - Buffer.isEncoding()
    - 判断是否支持该编码，
    - 参数为编码号
    - 返回一个boolean值
  - Buffer.isBuffer()
    - 判断是否为buffer
    - 传入一个对象
    - 返回一个boolean值
  - Buffer.byteLength()
    - 传入一个buf
    - 返回指定编码的字节长度，默认utf8
  - Buffer.concat()
    - 传入一个buf对象数组
    - 将一组buffer对象合并为一个buffer对象
- 实例方法
  - write()
    - 向buffer对象中写入内容
    - buf.write();
    - 参数为字符串，写入长度，写入位置，字符编码
  - slice()
    - 截取新的buffer对象
    - 参数为截取的起始位置，结束位置
  - toString()
    - 把buffer对象转换为字符串
  - toJson()
    - 把buffer对象转换为json形式的字符串
    - 还可以用JSON.stringify()方法达到相同效果
      - 传入一个buf对象
      - 会自动把字符转换为十进制ASCII编码
    - toJSON方法不需要显示调用，当JSON.stringify方法调用的时候会自动调用toJSON方法



##### 核心模块API

- 路径操作
  - 路径基本操作API
    - 引入核心模块
      - ``const path =require('path')``
    - 获取路径的最后一部分
      - ``path.basename('/foo/bar/baz/asdf/quux.html(文件路径)','html'可不加)``
        - 返回一个文件名
    - 获取路径
      - ``path.dirname('路径')``
        - 返回文件路径
    - 获取文件的扩展名
      - ``path.extname('xxx.html')``
      - 返回html
    - 路径的格式化处理
      - ``path.format()``
        - 把对象转化为字符串
        - 返回一个文件路径
      - ``path.parse()``
        - 把字符串转换为对象
        - 对象的属性
          - root文件的根路径
          - dir文件的全路径
          - base文件的名称
          - ext文件的扩展名
          - name文件名不含扩展名
    
    - 拼接路径
      - ``path.join();``
        - 
        - 参数为多个路径
        - ..代表上层路径
        - .表示当层路径
    
    - 判断是否为绝对路径
      - ``path.isAbsolute(c:/foo/..)``
      - 返回一个boolean
    - 规范化路径
      - ``path.normalize()``
    
    - 计算两个路径的相对路径
      - ``path.relative()``
      - 
    - 解析路径
      - ``path.resolve()``
      - 相当于终端的cd命令
      - path.resolve('wwwroot','static_files/png/','../gif/image.gif')
    - 两个特殊的属性
      - ``path.delimiter``
        - 表示路径分隔符
        - :
        - windows是\;   
        - Linux是/
      - ``path.sep``  
        - 环境变量分隔符
        - \
        - windows中使用;
        - linux中为:
    
    
  
  ##### 异步IO
  
  - 文件操作
  - 网络操作
  - 在浏览器中也存在异步操作
    - 定时任务
    - 事件处理
    - AJax回调处理
  - js的运行是单线程的
    - 引入了事件队列机制
  - 线程分析
    - js主线程
    - 事件队列
    - 文件读写操作
    - 网络的请求
  - nodejs中的事件模型与浏览器中的事件模型类似
    - 单线程
    - 事件队列 
  - nodejs中异步执行的任务
    - 文件IO
    - 网络 I/O
  - 基于回调函数的编码风格
  
  ##### 文件操作
  
  - 引入``const fs=require('fs')``
  
  - 文件信息(元数据？)读取
  
    ```
    fs.stat('./abc',(err,stat)=>{
    if(err) return ;
    if(stat.isFile()){
    console.log('文件');
    }else if(stat.isDirectory){
    console.log('目录');
    }
    console.log(stat);
    })
    ```
  
    - stat的属性
  
      - atime 访问时间
      - ctime 文件的状态信息发生变化的时间(比如文件的权限)
      - mtime文件数据发生变化的时间
      - birthtime 文件的创建时间
  
    - 同步操作
  
      - ```
        console.log(1);
        let ret =fs.statSync('./data.txt');
        console.log(ret)
        console.log(2)
        ```
  
      - 
  
  - 读文件操作
  
    - fs.readFile(file[,options],callback);
  
    - ```
      const path=require('path');
      let strpath=path.join(__dirname,'data.txt');
      fs.readFile(strpath,'utf8',(err,data)=>{//不加utf8的话文件会被解析为ASCII编码
      if(err) return;
      console.log(data);
      })
      ```
  
      - 如果有第二个参数并且是编码，那么回调函数获取到的数据就是字符串
      - 如果没有第二个参数，那么回调函数得到的就是buffer实例对象
  
    - 同步操作
  
    - ```
      let ret =fs.readFileSync(strpath,'utf8');
      console.log(ret);
      ```
  
    - 
  
  - 写文件操作
  
    - ```
      fs.writeFile('./message.txt', '这是第一行',(err)=>{
          if(!err){
          console.log('文件写入成功')
          }
      });
      //第一个参数为写入文件的路径，第二个参数可以是字符串，也可以是buffer对象，第三个参数默认为utf8
      
      //同步方法
      fs.writeFileSync('./message.txt','这是第一行');
      
      //都是覆盖操作
      ```
  
- 文件的流式操作(大文件操作)

  - ``fs.createReadStream(path[,options])``

  - ``fs.createWriteStream(path[,options])``

  - ```
    const path =require('path');
    const fs=require('fs');
    let spath=path.join(__dirname,'../..','file.zip');
    let dpath=path.join('c:/user/Desktop','file.zip');
    
    let readStream =fs.createReadStream(apth);
    let writeStream=fs.createWriteStream(dpath);
    
    //基于事件的处理方式
    let num=1;
    readStream.on('data',(chunk)=>{//data事件，读取文件时触发事件
    num++;
    writeStream.write(chunk);
    });
    
    readSteam.on('end',()=>{//事件处理完成之后触发的函数
    console.log('文件处理完成'+num)
    });
    ```

  - ``readStream.pipe(writeStream);``

    - pipe的作用直接把输入流和输出流连接到一块

  - ``fs.createReadStream(spath).pipe(fs.createWriteStream(dpath));``

    - 简洁处理

##### 目录操作

- 创建目录

  - 语法

    - ``fs.mkdir(path[,mode],callback)``
    - ``fs.mkdirSync(path[,mode])``

  - 实例

  - ```
    const path =require('path');
    const fs=require('fs');
    //创建目录
    fs.mkdir(path.join(__dirname,'abc'),(err)=>{
    if(){
    console('创建成功')
    }else{
    console.log('创建失败')
    }
    });
    //在本目录下创建一个abc目录
    
    //同步处理
    fs.mkdirSync(path.join(__dirname.'hello'))
    ```

- 读取目录

  - 语法

    - ``fs.readdir(path[.options],callback)``
    - ``fs.readdirSync(path[，options])``

  - 实例

  - ```
    const path =require('path');
    const fs=require('fs');
    //读取目录
    fs.mkdir(__dirname,(err,files)=>{
    files.forEach((item,index)=>{
    fs.stat(path.join(__dirname,item),(err,stat)=>{
    if(stat.isFile()){
    console.log(item,'文件');
    }else if(stat.isDirectory()){
    console.log(item,'目录');
    }
    })
    })
    })
    
    //同步处理
    let files=fs.readdirSync(__dirname);
    files.forEach((item,index)=>{
    fs.stat(path.join(__dirname,item),(err,stat)=>{
    if(stat.isFile()){
    console.log(item,'文件');
    }else if(stat.isDirectory()){
    console.log(item,'目录');
    }
    })
    })
    
    //读取当前目录
    ```

- 删除目录

  - ```
    fs.rmdir(path.join(__dirname,'目录名'),(err)=>{
    console.log(err);
    })
    
    //同步操作
    fs.rmdirSync(path.join(__dirname,'目录名'))
    ```

### 打包工具的使用

##### 包

- 多个模块可以形成多个包，不过要满足特定的规则才能形成规范的包

##### NPM(nodejs package management)

- 全球最大的模块生态系统，里面所有的模块都是开源免费的，也是nodejs的包管理工具

##### npm包安装方式

- 本地安装
  - npm install 包名称
  - 本地安装的包在当前node__modules里面，本地安装的包一般用于实际开发工作
- 全局安装
  - npn install -g 包名称
  - 全局安装的包位于nodejs环境的node_modules目录下，
  - 全局安装的包一般用于命令行工具
- 指定版本安装
  - npm install -g 包名称@版本号

- 卸载
  - npm uninstall -g 包名称
- 更新（更新到最新版本）
  - npm updata -g  包名

##### 添加依赖

- 开发环境依赖
  - --save 向生产环境中添加依赖dependencies
  - 开发过程中使用的工具
- 生产环境依赖
  - --save-dev 向开发环境添加依赖 DevDependencies
  - 项目运行所必须的依赖



##### yarn工具的使用

- 类比npm基本使用
- 安装
  - npm install -g yarn
- 初始化包
  - npm init 
  - yarn init
- 安装包
  - npm install xxx --save
  - yarn add xxx
- 移除包
  - npm uninstall xxx
  - yarn remove xxx
- 更新包
  - npm update xxx
  - yarn upgrade xxx
- 安装开发依赖的包
  - npm install xxx --save-dev
  - yarn add xxx -dev
- 全局安装
  - npm install -g xxx
  - yarn global add xxx
- 设置下载镜像的地址
  - npm config set registry url 
  - yarn config set registry url
- 安装所有依赖
  - npm install 
  - yarn install 
- 执行包
  - npm run 
  - yarn run 

##### 自定义包

- 包的规范
  - package.json必须在包的顶层目录下
  - 二进制文件应该在bin目录下
  - javascript代码应该在lib目录下
  - 文档应该在doc目录下
  - 单元测试应该在test目录下

- package.json字段分析
  - name：包的名称，必须是唯一的，由小写英文字母，数字和下划线组成，不能包含空格
  - description：包的简要说明
  - version：符合语义化版本识别规范的版本字符串
  - keywords：关键字数组，通常用于搜索
  - maintainers：维护者数组，每个元素要包含 name，email(可选)，web(可选)字段
  - contributors：贡献者数组，格式与maintainers相同。包的作者应该是贡献者数组的第一个元素
  - bugs：提交bug的地址，可以是网站或者电子邮件地址
  - licenses：许可证数组，每个元素要包含type(许可证名称)和url(链接到许可证文本的地址)字段
  - repositories：仓库托管地址数组，每个元素要包含type(仓库类型，github...)，url(仓库的地址)和path(相对于仓库的路径，可选)字段
  - dependencies：包的依赖，一个关联数组，由包的名称和版本号组成

- 自定义包案例

  - 把md文件转换为html页面

  - 安装markdown-it包

  - ```
    //初始化
    const path =require('path');
    const fs =require('fs');
    const md=require('markdown-it')();//require('markdown-it')返回一个函数
    
    //指定路径
    let tplPath = path.join(__dirname,'tpl.html');
    let mdPath = path.join(__dirname,'demo.md');
    let targetPath=path.join(__dirname,'demo.html')
    
    //获取markdown文件
    fs.readFile(mdpath,'utf8',(err,data)=>{
    if(err)return;
    //对markdown内容进行转换操作
    let result = md.render(data);
    //读取模板内容
    let tpl =fs.readFile(tplPath,'utf8',(err,tplData)=>{
    if(err) return;
    tplData=tplData.replace('<%xxx%>',result);
    //生成的最终界面写入
    fs.writeFile(targetPath,tplData,(err)=>{
    console.log('转换完成')
    });
    })
    })
    
    
    ```


### node实现服务器配置

##### nodejs实现静态网站功能

- 使用http模块初步实现服务器功能

  - ``const http=require('http');``引入模块

  - demo

    - ```
      const http=require('http');
      //创建服务器实例对象
      let server = http.createServer();
      
      //绑定一个请求事件request
      server.on('request',(req,res)=>{//req表示请求信息，res表示响应信息
      res.end('hello');
      });
      
      //绑定一个端口,监听端口
      server.listen(端口号);
      //通过locahost:端口号访问
      
      ———————————————————华丽的分割线————————————————————————
      //通过httpAPI创建
      http.createServer((req,res)=>{
      res.end('hello');
      }).listen(端口号，'本机ip地址',()=>{
      console.log('running..')
      });
      //通过本机ip地址:端口号，访问
      ```

- 处理请求路径的分发

  - req对象是Class:http.IncomingMessage的实例对象

  - res对象是Class:http.ServerResponse的实例对象

  - demo

    - ```
      const http =require('http');
      
      http.createServer((req,res)=>{
      res.end(req.url);//请求路径
      if(req.url.startsWith('/xxxx')){
      res.write('xxxxx');//向客户端响应内容
      res.write('xxxx');//可响应多次
      res.end('xxxx')//只能执行一次
      }else if(req.url.startsWith('/xxxx'){
      res.end('xxxx');
      }else{
      res.end('not found');
      }
      }).listen(端口号，'本机ip地址',()=>{
      console.log('running..')
      });
      ```

    - req.url可以获取URL路径获取(端口号之后的部分)

    - res.write()方法来向客户响应内容

    - req.url.startWith()
      - 传入一个文件的路径判断是否相同
      - 返回一个boolean值

- 响应完整的页面信息

  - demo

    - ```
      const http =require('http');
      const path =require('path')
      const fs =require('fs');
      //根据路径读取文件的内容，并且响应到浏览器
      let readFile=(url res)=>{
      fs.readFile(path.join(__dirname,'文件所在目录',url)'utf8',(err,fileContent)=>{
      if(err){
      res.end('server error');
      }else{
      res.end(fileContent);
      }
      }
       
      
      http.createServer((req,res)=>{
      //处理路径的分发
      if(req.url.startsWith('/xxx')){
      readFile('xxx.html',res);
      }else if(req.url.st、artsWith('/yyy'){
      readFile('yyy.html')
      }else{
      //添加html页面表头防止乱码
      res.writeHead(200,{
      'Content-Type':'text/plain;charset=utf8'
      });
      
      res.end('页面不存在');
      }
      }).listen(端口号，'本机ip地址',()=>{
      console.log('running..')
      });
      ```

    - ```
      const http =require('http');
      const path =require('path')
      const fs =require('fs');
      //引入映射表文件
      const mime = require('mime.json');
      
      
      http.createServer((req,res)=>{
      fs.readFile(path.join(__dirname,req.url),(err,fileContent)=>{
      if(err){
      res.writeHead(404,{
      'Comtent-Type':'text/plain; charset=utf8'
      });
      res.end('未找到页面');
      }else{
      //设置默认文件类型
      let dtype='text/html'
      //获取请求文件的后缀
      let ext =path.extname(req.url);
      //如果请求文件后缀合理，就能获取到标准的响应格式
      if(mime[ext]){
      dtype=mime[ext];
      }
      //如果响应内容是文本，就设置utf8编码
      if(dtype[ext]){
      dtype+=';charset=utf8'
      }
      //响应头信息
      res.writeHead(200,{
      'Content-Type':dtype;
      });
      res.end(fileContent);
      }
      });
      }).listen(端口号,()=>{
      console.log('running..')
      });
      //localhost访问
      ```
    
    - 



- 实现静态服务器功能

  - ```
    const http =require('http');
    const path =require('path')
    const fs =require('fs');
    //引入映射表文件
    const mime = require('mime.json');
    
    
    http.createServer((req,res)=>{
    fs.readFile(path.join(__dirname,req.url),(err,fileContent)=>{
    if(err){
    res.writeHead(404,{
    'Comtent-Type':'text/plain; charset=utf8'
    });
    res.end('未找到页面');
    }else{
    //设置默认文件类型
    let dtype='text/html'
    //获取请求文件的后缀
    let ext =path.extname(req.url);
    //如果请求文件后缀合理，就能获取到标准的响应格式
    if(mime[ext]){
    dtype=mime[ext];
    }
    //如果响应内容是文本，就设置utf8编码
    if(dtype[ext]){
    dtype+=';charset=utf8'
    }
    //响应头信息
    res.writeHead(200,{
    'Content-Type':dtype;
    });
    res.end(fileContent);
    }
    });
    }).listen(端口号,()=>{
    console.log('running..')
    });
    //localhost访问
    ```

    - 引入映射表文件，根据映射表添加表头

  - ```
    const http = require(http);
    const ss=require('要引入模块的路径');
    const path =require('path');
    
    http.createServer((req,res)=>{
    ss.staticServer(req,res,path.join(创建文件路径));
    }).listen(3000,()=>{
    console.log('running');
    })
    ```

    - 使用模块调用其他模块



##### 参数的传递与获取

- get参数处理

  - const url = require('url');

  - parse方法

    - ```
      const url =require('url');
      
      let str ='http://www.baidu.com/abc?flag=123&keyworld=java';
      let ret =url.parse(str，true);//第二参数为true把query属性设置为一个对象
      console.log(ret);
      //parse把URL转换为一个对象
      
      //url格式:'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
      ```

  - format方法

    - ```
      const url =require('url')
      let obj={
      protocol:
      slashes:
      auth:
      host:
      port:
      hostname:
      hash:
      search:
      query:
      pathname:
      path:
      href:
      }
      let ret1=url.format(obj);
      console.log(ret1);
      
      返回一个完整的URL
      ```

  - url实现完整的服务器功能

    - ```
      const http =require('http');
      const path=require('path');
      const url=require('url');
      
      http.createServer((req,res)=>{
      let obj=url.parse(req.url,true);
      res.end(obj.query.username+'========'+obj.query.password);
      
      }).listen(3000,()=>{
      console.log('running..')
      })
      
      ```

    - 

  - ret的属性

    - protocol
    - slashes
    - auth
    - host
    - port
    - hostname
    - hash
    - search
    - query
    - pathname
    - path
    - href

- post参数获取 

  - ``const querystring=require('querystring');``引入

  - 实例

    - ```
      const querystring=require('querystring');
      
      //parse方法的作用就是把字符串转化为对象
      let param='username=luomingyang&password=123456';
      let obj =querystring.parse(param);
      console.log(obj.username); 
      //如果有重复属性则会放到一个数组中
      
      
      //把对象转化为字符串
      let obj1={
      flag:'123';
      abc:['hello','hi']
      }
      let str1=querystring.stringify(obj1);
      console.log(str1);
      ```

  - 参数从浏览器端传输到后台

    - ```
      const querystring=('querystring');
      const http=require('http');
      
      http.creatServer((req,res)=>{
      if(req.url.startsWith('/login')){//判断URL是不是以login为开头
      let pdata='';
      req.on('data',(chunk)=>{//有数据传输就会触发的事件
      pdata+=chunk;
      });
      
      req.on('end',()=>{//结束时触发事件在控制台打印pdata
      console.log(pdata);
      
      let obj=querystring.parse(pdata);//把pdata转换为对象，用来获取属性
      res.end(obj.username+'_________'obj.password);
      });
      }
      
      }).listen(3000,()=>{
      console.log('running...')
      })
      
      ```

   - 登录验证案例
     
     - login.html
     
       ```
       ​```
       <body>
       <form action="http:/localhost:3000/login" method="post">
       用户名:<input type="text" name="username"><br>
       密码:<input type="password" name="password"><br>
       <input type="button" value="提交">
       
       </form>
       
       </body>
       
       ​```
       ```
     
     - login.js
     
       ```
       const http =require('http')
       const ss   =require('要引入模块的路径');//这里封装了一个staticServer方法
       const querystring =require('querystring')
       const url =require('url')
       
       http.createServer((req,res)=>{
       //启动静态资源服务
       if(req.url.startWith('查看是否在本目录')){
       ss.staticServer(req,res,__dirname);
       }
       //动态资源服务
       if(req.url.startsWith('/login')){//判断请求地址
       //get请求
       if(req.method=='GET'){
       let param=url.parse(req.url,true).query();
       if(param.username=='admin'&&param.password=='123'){
       res.end(get successful);
       }else{
       res.end('get faild')
       }
       }
       
       //post请求
       if(req.method=='POST'){
       let pdata='';
       req.on('data',(chunk)=>{
       pdata+=chunk;
       })
       req.on('end',()=>{
       let obj =querystring.parse(pdata);
       if(obj.username=='admin'&&obj.password=='123'){
       res.end('psot true');
       }else{
       res.end('post false')
       }
       
       })
       }
       }
       
       }).listen(3000,()=>{
       console.log(ing...);
       })
       
       //请求方式也能用来分发路径
       ```
  
- 模板引擎的使用

  - 优点：使代码更加通用

  - 安装:npm install art-tmppate --save

  - ``const template=require('art-template')``引入

  - 核心方法

    - ```
      //基于模板名的渲染模板
      template(filename,data);
      
      //将模板源代码编译成函数
      template.compile(source,options);
      
      //将模板源代码编译成函数并立即执行
      template.render(source,data,options);
      ```

    - 实例:template(filename,data);

      - ```
        let html=template();
        let html=template(__dirname+'/xxx.art',{
        user:{
        name:'xxx';
        }
        })
        console.log(html);
        ```

      - 

    - 实例:template.compile(source,options);

      - ```
        let tpl ='<ul>{{each list as value}}<li>{{value}}</li>{{/each}}</ul>'
        let render=template.compile(tpl);
        let ret=render({
        list:['apple','orange','banana']
        });
        console.log(ret);
        ```

    - 实例template.render(source,data,options);

      - ```
        //let tpl ='<ul>{{each list as value}}<li>{{value}}</li>{{/each}}
        //用另外一种方法遍历
        let tpl ='<ul>{{each list}}<li>{{$index}}:{{$value}}</li>{{/each}}
        let ret=template.render(tpl,{
        list:['apple','orange','banana']
        })
        console.log(ret); 
        ```

    - template语法

      - 官网<a src=" https://aui.github.io/art-template/zh-cn/docs/syntax.html ">art-template</a>: https://aui.github.io/art-template/zh-cn/docs/syntax.html 

      - 条件

        - ```
          {{if value}} ... {{/if}}{{if v1}} ... {{else if v2}} ... {{/if}}
          ```

      - 循环

        - ```
          {{each target}}    {{$index}} {{$value}}{{/each}}
          ```

  - 基本使用

    - index.art

      - ```
        ​```
        <body>
        	<div>
        		<ul>
        			<li>语文:{{chinese}}<li>
        			<li>数学:{{math}}</li>
        			<li>外语:{english}</li>
        			<li>综合:{{summary}}</li>
        		</ul>
        	</div>
        </body>
        ​```
        ```

    - index.js

      - ```
        const template=require('art-template')
        
        let html=template();
        let html=template(__dirname+'/xxx.art',{
        user:{
        chinese:'120',
        math:'130',
        english:'146',
        summary:'268'
        }
        })
        console.log(html);
        ```

      - 