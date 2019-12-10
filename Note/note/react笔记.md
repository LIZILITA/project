# react笔记

#### 生命周期函数详解

- shouldcomponentupdate函数返回true和false，
  - 如果return true状态值和页面会被更新
  - return false
- 在shouldcomponentupdate中通过this.state.count的值是上次更新前的旧数据
  - 用nextstate nextprops参数传进来，用nextstate.count来取得页面的最新状态
- componentwillupdate
  - 页面将要更新的时候在进入这个生命周期函数的时候dom都是旧的
  - 在便签中添加ref属性，然后在访问这个标签的时候使用this.refs.标签名.属性
- render函数(更新用)
  - 在组件运行阶段中，每当调用render函数的时候，页面上的元素还是旧的
  - 短路运算：this.refs.h3&&this.refs.h3.innerhtml
- componentdidupdate
  - 组件完成了更新，此时页面中的元素都是最新的，可以放心操作
- class创建组件

  - class XXXextends react.component
  - constructor
    - this.state={}

  - render（）{return div}
- export default只能导出一个组件
- componentwillreceiveupdate

  - 组件将要接受外界传过来的新的props值
  - 当子组件被第一次渲染到页面的时候不会触发函数

  - 修改属性值的时候点击事件的函数this.函数名
  - 函数=()=>{this.setstate{值：}}
  - 只有在父组件中通过某些事件修改了传递给子组件的props数据之后，才会触发函数
  - 获取的属性值是旧的属性值，想获取新的属性值还必须接受参数nextprops才能获取最新的属性值 

##### 组件生命周期的执行顺序

- mounting

  - constructor
  - componentwillmount
  - render
  - componentdidmount

- updating

  - componentwillreceiveprops（nextprops）
  - shouldcomponentupdate（nextprops nextstate）
  - componentwillupdate（nextprops nextstate）
  - render
  - componentdidupdate（prevprops ，prevprops(上一次的属性)）

- unmounting

  - componentwillunmount

- #### 绑定this传参的几种形式

  - 在事件处理函数中，直接使用bind绑定this并传参
    - 改为箭头函数   函数名=()=>{}
    - 在调用函数的时候用this.函数名.bind(this)
      - bind的作用：为前面的函数修改函数内部的this指向，指向bind参数列表中的第一个参数
      - bind函数中的第一个参数，是用来修改this指向的，第一个参数后面的所有参数，都会当作将来要调用 前面函数 时候的参数传递进去(函数的形参)
    - bind和call/apply之间的区别
      - bind修改this指向之后不会立即调用前面的函数
      - call和appley修改完this指向之后会立即调用前面的函数
  - 在构造函数中绑定并传参
    - this.函数名.bind(this)
    - bind方法有返回值
      - 返回由指定的this值和初始化参数改造的原函数拷贝
      - 就是被改变this指向之后的函数的引用
    - bind不会修改原函数的this指向
      - 如果要修改应该在constructor中用this修改原函数的this指向
    - 箭头函数外部this要和内部this保持一致
  - 在调用函数时onclick={()=>{this.函数名}}
    - 箭头函数外部的this要与内部的this保持一致
    - 实例调用实例

- #### react实现数据绑定

  - react只支持，把数据从state上传输到页面，但是，无法自动实现数据从 页面 传输到state中进行保存，也就是，react不支持数据的自动逆向传输，只实现了数据的单项绑定

  - 如果为表单元素，提供了value属性绑定，那么，必须同时为表单元素绑定readonly，或者提供要给onchange事件

    - 如果提供了readonly，表示这个元素是只读
    - 如果提供了onchange表示，这个元素的值可以被修改，但是，要自己定义修改的逻辑

  - 如果想让 文本框在出发onchange的时候，同时把文本框最新的值保存到state中，那么，我们需要手动调用this.setstate

  - 获取文本框中 最新文本的三种方式

    - 使用dom中的getelement来取得元素
    - 使用ref属性来拿
      - 在元素中添加ref属性ref=“txt”
      - 调用的时候使用this.refs.txt.属性名
    - 使用事件对象的参数 e 事件对象来拿
      - 在箭头函数小括号中添加一个e
      - 在函数中使用e.target.属性名  来获取
        - e.target就表示触发这个事件的事件源的对象
    - 修改完之后应该调用this.setstate({属性：xxx})
      - 用来保存修改后的属性

    - 

- #### react路由

  - react-router-dom路由的基本使用

    - 如果要使用路由模块，第一步，运行yarn add react-router-dom
    - 第二步，在中导入路由模块
      - import{hashRouter，Route，Link}from 'react-router-dom'
        - hashrouter表示一个路由的根容器，将来，所有的路由相关的东西。都要包裹在hashrouter里面，而且，一个网站中，只需要使用一次hashrouter就可以了
        - router表示一个路由规则，在router上，有两个比较重要的属性，path component
        - link表示一个路由的链接，就像是VUE中的<router-link to=""></router-link>
      - 在render函数中返回一个<Hashrouter></Hashrouter>
        - 当使用hashrouter把根组件的元素包裹起来之后，网站就已经启用路由了
        - 注意：在一个hashrouter中只能有一个hashrouter
        - 在一个网站中只需要使用唯一的一次hashrouter标签
    - link标签的使用
      - 在一个组件中创建超链接，添加to属性添加文件路径
    - router创建的标签就是路由规则
      - 添加path属性
        - 表示要匹配的路由
        - 路径/type/id
      - 添加component属性
        - 表示要展示的组件
        - {Home}
      - 在VUE中有个router-view的路由标签，专门用来放置，匹配到的路由组件，但是，在react-router中，并没有类似于这样的标签，而是，直接把router标签，当作的 坑 (占位符)
      - router具有两种身份
        - 是一个路由匹配规则
        - 它是一个占位符表示将来匹配到的组件都放到这个位置
      - 组件匹配到的位置
        - router是一个占位符

  - 匹配路由参数

    - 注意：默认情况下，路由中的规则，是模糊匹配的，如果路由可以部分匹配成功，就会展示这个路由对应的组件
      - 如果想让路由规则path精确匹配，可以添加exact属性
    - 如果要匹配参数，可以在匹配规则中 ，使用:修饰符，表示这个位置匹配到的是参数
    - 如果想要从路由规则中，提取匹配到的参数，进行使用，可以使用this.props.match.params.***来访问
      - 可以在constructor中设置属性时添加一个属性为this.props.match.params在使用的时候直接用this.state.属性名.***取得属性值

    #### 为react项目启用antdesiign组件

- 引入组件

  -  import { DatePicker } from 'antd'; ReactDOM.render(<DatePicker />, mountNode); 
  -  引入样式
     -  import 'antd/dist/antd.css';
  -  一般，我们使用第三方ui组件，他们的样式表文件都是以.css结尾的，所以我们最好不要为.css后缀名的文件，启用模块化
     - 我们推荐自己不要直接手写.css的文件，而是自己手写scss或less文件，这样，我们只需为scss文件或less文件启用模块化就好了

- 实现antdesign组件的按需导入

  - 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。(添加到babelrc文件中)

    ```js
       // .babelrc or babel-loader option
        {
          "plugins": [
            ["import", {
              "libraryName": "antd",
              "libraryDirectory": "es",
              "style": "css" // `style: true` 会加载 less 文件
            }]
          ]
        }
    ```

  - 然后只需从 antd 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

    ```jsx
    // babel-plugin-import 会帮助你加载 JS 和 CSS
    import { DatePicker } from 'antd';
    ```

  - 手动引入

    ```jsx
    import DatePicker from 'antd/es/date-picker'; // 加载 JS
    import 'antd/es/date-picker/style/css'; // 加载 CSS
    // import 'antd/es/date-picker/style';         // 加载 LESS
    ```

  - 具体操作

    - cnpm i babel-plugin-import -D
    - 修改babelrc中的配置文件
      - 添加["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css" 
          }]





# 深入浅出React和Redux

#### react 新的前端思维方式

- create-react-app工具

  - 介绍
    - 因为react技术依赖一个庞大的技术栈，Facebook的开发人员提供了一个快速开发react应用的工具，
  - 使用
    - 安装
      - npm install --global create-react-app
    - 添加基础应用框架
      - create-react-app first_react_app
    - 启用react组件
      - npm start

- 关于jsx

  - 介绍

    - 是javascript的语法扩展(eXtension，让我们能在javascript代码中编写像html一样的代码

  - 原理

    - 创建html元素还是通过对dom树进行操作的方式createElement的方式

    - 事件处理方式

      - jsx的onclick事件处理方式和html的onclick有很大不同
      - onclick添加的事件处理函数是在全局的环境下执行的，这污染了全局环境，
      - jsx的onclick挂载的每个函数，都可以控制在组件范围内，不会污染全局空间

      - react控制了组件的生命周期，在unmount的时候能清除掉相关的所有事件处理函数，所以不用担心内存泄露问题

- react技术栈

  - package.json
    - start命令调用了react-script命令，react-script是create-react-app添加的一个npm包，所有的配置文件在node_modules/react-script目录下
  - eject 命令
    - 把react-script中的一系列技术栈配置都弹射到应用的顶层，我们可以查看配置细节，还可以更灵活的定制应用的配置
      - 注意:eject命令是不可逆的，
    - npn run eject
      - 这个命令会改变一些文件也会添加一些文件，
        - 当前目录下会增加两个目录，一个是script，另一个是config，同时package.json也会被改变为nodejs的命令
        - 这会让start脚本使用script目录下的start.js，而不是node_modules目录下的react-script了
      - 在config目录下的webpack.config.dev.js文件中定制的就是npm start所做的构造过程

- react的工作方式
  - jQuery的工作原理
    - 选中一些DOM元素并对其进行一些操作
    - 但是这种模式会造成代码结构复杂，难以维护。
  - react的理念
    - UI=render(data)
    - 对于开发者来说，重要的是区分哪些属于data，哪些属于render
    - 想要更新界面，要做的就是更新data，用户界面自然会做出相应‘
    - 所以react实践的也是响应式编程(Reactive Programming)的思想
  - virtual DOM
    - react利用了virtue DOM，让每次渲染都只重新渲染最少的dom元素
  - react工作方式的优点
    - 使用jQuery的方式在当项目变得逐渐庞大时，用jQuery写出的代码往往会相互纠，难以维护
    - rect等于强制所有组件都按照这种数据结构驱动渲染的模式来工作，无论应用规模有多大，都能让程序处于可控范围之内

#### 设计高质量的react组件

- 易于维护组件的设计要素

  - 作为软件设计的通则，组件的划分需要满足，高内聚(High Cohesion)和低耦合(Low Coupling)的原则
    - 高内聚
      - 指的是吧逻辑紧密相关的内容放在一个组件中
      - react讲一个组件的html css js 放在一起，所以天生具有高内聚的特点
    - 低耦合
      - 指的是不同组件之间的依赖关系要尽量弱化
      - react对外接口非常规范，方便开发者设计低耦合的系统

- react组件的数据

  - react组件的数据分为两种，prop和state，无论是prop还是state的改变，都可能引发组件的重新渲染

    - prop是组件的对外接口，对外用prop
    - state是内部状态，内部使用state

  - react的prop(property)

    - prop是从外部传递给组件的数据，一个react通过定义自己能够接受的prop就定义了自己的对外公共接口

    - 给prop赋值

      - 在调用组件的时候给组件添加的属性就是传入组件中的prop值
        - react组件的prop支持字符串，数字，对象可以是任何一种javascript语言所支持的数据类型

    - 读取prop值

      - 必须通过构造函数调用super(props)，类实例的成员函数才能通过this.props访问父组件传入的props值

      - ```
        render(){
        const {caption}=this.props
        return(<div>
        <span>{caption} count:{this.state.count}</span>
        </div>)
        }
        ```

      - 在上面的代码中我们使用了ES6的解构赋值(destructuring assignment)语法从this.props中获得了名为caption的prop值

    - propTypes检查

      - 一个组件应该可以规范以下这些方面：

        - 这个组件应该支持哪些prop
        - 每个prop应该是什么样的格式

      - propTypes定义

        - ```
          组件名.propTypes={
          属性一:PropTypes.String.isRequired,
          属性二：PropTypes.number
          }
          ```

          - 属性一要求是String类型，该属性在调用组件时为必填属性
          - 属性二要求为数字类型，不要求必填

        - 在发布产品时，将会用一种自动化的方法将propTypes去掉，这样最终部署到产品环境的代码会更优

  - react的state

    - 由于react组件不能修改传入的prop，所以需要记录自身的数据变化，就要使用state

    - 初始化state

      - 通常在构造函数的结尾通过对this.state的赋值完成对组件state的初始化

      - 给组件添加默认的prop值和state值

        - ```
          组件名.defaultProps={//添加默认的props值
          属性一:xxx
          }
          ```

        - ```
          this.state={
          属性名:props.属性一
          }
          ```

        - 通过给prop默认值同时给state值默认值

    - 读取和更新state

      - 通过this.setState()函数来修改值
      - this.setState函数要做的事情，
        - 改变this.state的值
        - 驱动组件经历更新过程

    - prop和state的对比

      - prop用于定义外部接口，state用于记录内部状态
      - prop的赋值在外部世界使用组件时，state的赋值在组件内部
      - 组件不应该改变prop的值，而state存在的目的就是让组件来改变的。

    - UI=render(data)

      - 严格来说，react并没有办法阻止你去修改传入的prop对象。
      - 但是组件去修改传入的prop值可能会让程序陷入混乱

  - 组件的生命周期

    - react严格定义了组件的生命周期。

      - 装载过程(Mount)，也就是把组件第一次在DOM树中渲染的过程
      - 更新过程(Update)，当组件被重新渲染的过程
      - 卸载过程(Unmount)，组件从DOM删除的过程

  - 装载过程

    - constructor

      - 初始化state，因为组件生命周期中任何函数都可能访问state，那么整个生命周期中第一个被调用的构造函数自然是初始化state最理想化的地方
        - 用this.state来初始化state

      - 绑定成员函数的this环境
        - 通过bind方法让当前实例中的函数被调用的时候，this始终是指向当前组件的实例

    - getInitialState和getDefaultprops

      - getInitialState的返回值会用来初始化组件的state，但是这个方法只在React.createClass方法创造的组件类才会发生作用。
        - getDefault函数的返回值可以作为props的初始值，和getInitialState一样这个函数只能在React.createClass方法创造的组件中才会用到

    - getDefaultProps

    - componentWillMount和componentDIdmount

      - 在装载过程中，componentWillMount会在调用render函数之前被调用，componentDIdmount会在调用render函数之后被调用
        - 所有在componentWillmount中做的事情都可以提前到constructor中去做，可以认为componentWillmount存在的目的就是为了和componentDidMmount对称
        - 如果有多个组件，则componentDIdmount函数会同时在最后调用，因为render函数要做的是返回一个jsx表示的对象，并不是渲染界面。react会在render函数都执行完之后才会渲染页面

    - render

      - render函数是整个组件中最重要的函数，React.Component类除对render以外的生命周期函数都有默认实现，一个组件必须完成render函数

    - componentDidMount
    - 更新过程

      - 更新过程会依次代用下面的生命周期函数其中render函数和装载过程一样。
      - componentWillReceiveProps
        - shouldComponentUpdate
        - componentWillUpdate
        - render
        - componentDidUpdate
      - componentWillReceiveProps(nextProps)
        - 只要是父组件的render函数被调用，在render函数里面被渲染的子组件就会经历更新过程，不管父组件传给子组件的props有没有改变，都会触发子组件的componentWillReceiveProps函数
        - 注意，通过this.Setstate方法触发的更新过程不会触发这个函数的调用，因为这个函数适合根据新的props值(参数nextProps)来计算是不是要更新内部状态state
        - 在react组件组合中，完全可以只渲染一个子组件，而其他组件则完全不需要渲染，这是react提升性能的重要方式
      - componentWillUpdate(nextProps nextState)
        - render函数决定了该渲染什么，componentWillUpdate函数决定了一个组件什么时候不需要渲染
        - componentWillUpdate函数返回一个布尔值，来告诉react库这个组件在这次更新过程中是否要继续
        - componentWillUpdate根据传进来的参数nextprops和nextstate来判断返回true还是false
      - componentWillUpdate和componentDidUpdate
        - 分别在render函数之前和之后调用。
        - Did函数并不只在浏览器端执行的，无论更新过程发生在浏览器端还是服务器端，该函数都会被调用
        - 可以在componentDidUpdate函数中执行其他UI库的代码
    - 卸载过程
      - react组件的卸载过程只会触发一个函数compontWillUnmount
      - 在compontWillUnmount中清理DOM元素防止内存泄露

  - 组件向外传递数据

    - 在props中添加一个onUpdate，类型是一个函数，当Counter的状态改变的时候，就会调用这个给定的函数，从而达到通知父组件的作用

  - react组件state和prop的局限

    - 如果一个子组件出现了bug导致向父组件传递的值发生错误，就有可能出现状态不一致的情况
    - 三级或三级以上的组件结构，顶层的祖父组件想要传递一个值给最底层的组件，用prop的方式，就只能通过父组件中转。

  

- 






- 

#### 从Flux到Redux

- Flux

  - 历史

    - 由Facebook公司推出，与react一同面世。
    - React用来替换jQuery，flux就是替代backbone，ember.js等MVC一族的框架为目的

  - MVC框架

    - Model(模型)
      - 负责管理数据，大部分业务逻辑也应该放在Model中
    - view(视图)
      - 负责渲染用户界面，应该避免在View中涉及业务逻辑
    - Controller(控制器)
      - 负责接受用户输入，根据用户输入调用对应的Model部分逻辑，把产生的数据结果交给View部分，让View渲染出必要的输出

  - MVC框架的缺陷

    - 对于MVC框架，，为了让数据流可控，Contorller应该是中心，当View要传递消息给Model时，应该调用Controller的方法，同样，当Model要更新View时，也应该通过Controller引发新的渲染
    - 用户请求到达Controller，由Controller调用Model获得数据，然后把数据交给view，但是在实际实现中，总是允许view和Model直接可以进行通信，，就会造成Model和View之间数据传输的混乱

  - flux框架

    - Dispatcher
      - 处理动作分发，维持Store之间的关系
    - Store
      - 负责储存数据和处理数据的相关逻辑
    - Action
      - 驱动Dispatcher的javascript对象
    - View
      - 视图部分，负责显示用户界面

  - 安装使用

    - npm install --save flux

    - Dispatcher

      - 首先我们需要创建一个Dispatcher，用来引入flux库中的Dispatcher类
      - 然后创造一个新的对象作为这个文件的默认输出就够了。

    - action

      - 代表一个动作，只是个普通的javascript对象，纯粹的数据

      - 作为管理要action的对象必须有一个名为type的字符串对象

      - 定义action通常需要两个文件，一个定义action类型，一个定义action的构造函数。

        - 分成两个文件的主要原因是在Store中会根据action类型做不同操作，也就有单独导入action类型的操作

        - 在ActionTypes.js中我们定义action的类型(字符串)

          - ```
            export const xxxxx='xxxxx'
            .....
            ```

        - 在Actions.js中我们定义action的构造函数

          - ```
            import * as ActionTypes from './ActionTypes.js';
            import AppDispatcher from './AppDispatcher.js';
            
            export const xxxx = (counterCaption) => {
            AppDispatcher.dispatch({
            type:ActionTypes.XXXXX
            counterCaption:counterCaption
            })
            }
            ......
            ```

          - 这个文件虽然被命名为Actions.js，但是要注意里面定义的并不是action对象本身，而是能够产生并派发action对象的函数

    - Store

      - 一个Store也是一个对象，这个对象储存应用状态，同时还要接受Dispatcher派发的动作，根据动作来决定是否要更新应用状态

      - 我们创造两个Store，一个是为Counter组件服务的CounterStore，另一个就是为数据服务的SummaryStore。

        - Counter

          - ```
            import AppDispatcher from '../AppDispatcher.js';
            import * as ActionTypes from '../ActionTypes.js';
            import {EventEmitter} from 'events';
            
            const CHANGE_EVENT = 'changed';
            
            const counterValues = {
              'First': 0,
              'Second': 10,
              'Third': 30
            };
            
            const CounterStore = Object.assign({}, EventEmitter.prototype, {
              getCounterValues: function() {
                return counterValues;
              },
              emitChange: function() {
                this.emit(CHANGE_EVENT);
              },
              addChangeListener: function(callback) {
                this.on(CHANGE_EVENT, callback);
              },
              removeChangeListener: function(callback) {
                this.removeListener(CHANGE_EVENT, callback);
              }
            });
            
            //把CounterStore注册到全局唯一的Dispatcher上去
            CounterStore.dispatchToken = AppDispatcher.register((action) => {
              if (action.type === ActionTypes.INCREMENT) {
                counterValues[action.counterCaption] ++;
                CounterStore.emitChange();
              } else if (action.type === ActionTypes.DECREMENT) {
                counterValues[action.counterCaption] --;
                CounterStore.emitChange();
              }
            });
            
            export default CounterStore;
            
            ```
          
            - emit函数
              - 可以广播一个特定事件，第一个参数是字符串类型的事件名称
            - on函数
			        - 可以增加一个挂在这个EventEmitter对象特定事件上的处理函数，第一个参数是字符串类型的事件名称，第二个参数是处理函数
            - removeListener函数
              - 和on函数所做的事情相反，删除挂在这个EventEmitter对象特定事件上的处理函数，和on函数一样，第一个参数是事件名称，第二个参数是处理函数。
              - 如果要调用removeListener函数，就一定要保留对处理函数的引用     
              - 对于CounterStore对象，emitChange，addChangeListener和removeChangeListener函数就是利用EventEmitter上述的三个函数完成对CounterStore状态更新的广播，添加监听函数和删除监听函数的作用
            
            ---
              - 在CounterStore注册的回调函数在接受到action之后就会被调用，唯一的一个参数就是那个action对象，回调函数要做的就是根据action对象来决定如何更新自己的状态
            
              - Dispatcher有一个函数叫register，接受一个回调函数作为 参数。返回值是一个	token
            
      
    - View
    
      - 创建时要读取Store上状态来初始化组件内部状态
      - 当Store上状态发生变化时，组件要立刻同步更新内部状态保持一致
      - View如果要改变Store状态，必须而且只能派发action

- Flux的优势
  - 单向数据流的管理方式
    - 在flux的理念里，如果要改变界面，必须改变Store中的状态，如果要改变Store中的状态，就需要派发一个action对象，这就是规矩。这时想要追溯一个逻辑就变的十分简单
    - 简单来说，在flux的体系下，驱动界面改变始于一个动作的派发。
- Flux的不足
  - Store之间依赖关系，
    - 在flux体系中，如果两个Store之间有逻辑依赖关系，就必须用上Dispatcher的waitFor函数
    - 解决方法
      - CounterStore必须要把注册回调函数时产生的dispatchToken公开
      - SummaryStore必须要在
  - 难以进行服务器端渲染
    - 如果要在服务器端渲染，输出的不是一个dom树，而是一个字符串准确来说就是一个全是HTML的字符串
    - flux不是设计用作服务器端渲染的。
  - Store混杂了逻辑和状态
    - Store封装了数据和处理数据的逻辑，用面向对象的思维来看，这是一件好事，因为面向对象就是这样定义的。
    - 但是我们需要动态地替换掉一个Store逻辑时，只能把这个Store整体换掉，那也就无法保持其状态。
    - 热加载
      - 在不修改应用状态的前提下重新加载应用逻辑
- 

##### redux

- Redux的基本原则
  - 唯一数据源
    - 唯一的数据源指的是应用的状态数据应该只储存在唯一的一个Store上
    - redux让整个应用的只保持一个Store，所有组件的数据源，就是这个Store上的状态
  - 保持状态只读
    - 保持状态只读，就是说不能直接修改状态，要修改Store的状态，必须要通过派发，一个action对象完成。
  - 数据改变只能通过纯函数完成
    - 这里所说的纯函数就是Reducer，redux这个名字的前三个字母Red代表的就是Reducer。、
- Redux实例
  
  - ```
    //Action
    import * as ActionTypes from './ActionTypes.js';
    
    export const increment = (counterCaption) => {
      return {
        type: ActionTypes.INCREMENT,
        counterCaption: counterCaption
      };
    };
    
    export const decrement = (counterCaption) => {
      return {
        type: ActionTypes.DECREMENT,
        counterCaption: counterCaption
      };
    };
    
    ```
  
    - redux中每个action构造函数都返回一个对象，Flux中则把构造的动作函数立刻通过调用Dispatcher的dispatch函数派发给store
  
  - ```
    //Store
    import {createStore} from 'redux';
    import reducer from './Reducer.js';
    
    const initValues = {
      'First': 0,
      'Second': 10,
      'Third': 20
    };
    
    const store = createStore(reducer, initValues);
    
    export default store;
    
    ```
  
    - createStore函数第一个参数表示更新状态的reducer，第二个参数是状态的初始值，第三个参数可选，代表Store Enhancer
    - 符合唯一数据源的原则
  
  - ```
    //Reducer
    import * as ActionTypes from './ActionTypes.js';
    
    export default (state, action) => {
      const {counterCaption} = action;
    
      switch (action.type) {
        case ActionTypes.INCREMENT:
          return {...state, [counterCaption]: state[counterCaption] + 1};
        case ActionTypes.DECREMENT:
          return {...state, [counterCaption]: state[counterCaption] - 1};
        default:
          return state
      }
    }
    
    ```
  
    - 和Flux应用中的每个Store注册的回调函数一样，reducer函数中往往包含action.type为判断条件的语句。
    - reduncer只关心如何更新state
  
  - 关于扩展操作符
  
    - ```
      return {... state,[counterCaption] : state[counterCaption]+1 }
      
      //等同于下方的代码
      const newState=Object.assign({},state);
      
      newState[counterCaption]++;
      
      return newState;
      ```
  
    - 像上面这样写，创造了一个newState完全复制了state，通过对newState的修改避免了对state的修改。
  
  - ```
    //ControlPanel
    import React, { Component } from 'react';
    import Counter from './Counter.js';
    import Summary from './Summary.js';
    
    const style = {
      margin: '20px'
    };
    
    class ControlPanel extends Component {
      render() {
        return (
          <div style={style}>
            <Counter caption="First" />
            <Counter caption="Second" />
            <Counter caption="Third" />
            <hr/>
            <Summary />
          </div>
        );
      }
    }
    
    export default ControlPanel;
    
    ```
  
    - 和flux中的渲染相同
  
  - ```
    //Counter
    import React, { Component, PropTypes } from 'react';
    
    import store from '../Store.js';
    import * as Actions from '../Actions.js';
    
    const buttonStyle = {
      margin: '10px'
    };
    
    class Counter extends Component {
      constructor(props) {
        super(props);
    
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getOwnState = this.getOwnState.bind(this);
    
        this.state = this.getOwnState();
      }
    //在视图文件中我们要引入Store，通过store.getState()能获得store上储存的状态
      getOwnState() {
        return {
          value: store.getState()[this.props.caption]
        };
      }
    
    //通过派发action来改变store中的状态
      onIncrement() {
        store.dispatch(Actions.increment(this.props.caption));
      }
    
      onDecrement() {
        store.dispatch(Actions.decrement(this.props.caption));
      }
      
    //我们通过Store的subscribe监听其变化，只要Store状态发生变化，就会调用这个组件的onChange方法
      onChange() {
        this.setState(this.getOwnState());
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.caption !== this.props.caption) ||
          (nextState.value !== this.state.value);
      }
    //挂载监听函数
      componentDidMount() {
        store.subscribe(this.onChange);
      }
      //清理监听函数
      componentWillUnmount() {
        store.unsubscribe(this.onChange);
      }
    
      render() {
        const value = this.state.value;
        const {caption} = this.props;
    
        return (
          <div>
            <button style={buttonStyle} onClick={this.onIncrement}>+</button>
            <button style={buttonStyle} onClick={this.onDecrement}>-</button>
            <span>{caption} count: {value}</span>
          </div>
        );
      }
    }
    
    Counter.propTypes = {
      caption: PropTypes.string.isRequired
    };
    
    export default Counter;
    ```
  
    - 说明见注释
  
  - ```
    //Summary
    import React, { Component } from 'react';
    
    import store from '../Store.js';
    
    class Summary extends Component {
      constructor(props) {
        super(props);
    
        this.onChange = this.onChange.bind(this);
    
        this.state = this.getOwnState();
      }
    
      onChange() {
        this.setState(this.getOwnState());
      }
    
    //在getOwnState函数中计算出总和
      getOwnState() {
        const state = store.getState();
        let sum = 0;
        for (const key in state) {
          if (state.hasOwnProperty(key)) {
            sum += state[key];
          }
        }
    
        return { sum: sum };
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        return nextState.sum !== this.state.sum;
      }
    
      componentDidMount() {
        store.subscribe(this.onChange);
      }
    
      componentWillUnmount() {
        store.unsubscribe(this.onChange);
      }
    
      render() {
        const sum = this.state.sum;
        return (
          <div>Total Count: {sum}</div>
        );
      }
    }
    
    export default Summary;
    ```

- 容器组件和傻瓜组件
  - 在redux框架下，一个react组件基本上要完成两个功能
    - 和Redux Store 打交道，读取Store的状态，用于初始化组件的状态，同时还要监听Store的状态改变。当Store状态发生变化时，需要更新组件状态，从而驱动组件重新渲染，当需要更新Store状态时，就要派发action对象
    - 根据当前的props和state，渲染出用户界面



#### 模块化react和redux应用

#### react组件的性能优化

#### react高级组件

#### redux和服务器通信

#### 单元测试

#### 扩展redux

#### 动画

#### 多页面应用

#### 同构xxxxxxxxxx1 1