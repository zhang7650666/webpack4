// import Header from './header';
// import Sidebar from './sidebar';
// import Content from './content'
// const avatar = require('../img/girl.jpeg')

// console.log('avatar', avatar);

// new Header();
// new Sidebar();
// new Content();



// import createAvatar from './createAvatar';
// import '../css/index.scss'
// import style from '../css/index.scss';

// import avatar from '../img/girl.jpeg';
// const img = new Image();
// img.src = avatar;
// img.classList.add(style.avatar)

// const dom = document.getElementById('root');
// dom.append(img);

// createAvatar();


// console.log('Hello world');

// var root = document.getElementById('root');
// var btn = document.createElement('button');

// btn.innerHTML = '新增';
// root.appendChild(btn);
// console.log(root, btn)
// btn.onclick = function() {
//     var div = document.createElement('div');
//     div.innerHTML = 'item';
//     root.appendChild(div);
// }


// import counter from './counter';
// import number from './number';
// counter();
// number();

// if(module.hot) {
//     module.hot.accept('./number', () => {
//         number();
//     })
// }


// babel
// import '@babel/polyfill'
// const arr = [
//     new Promise(() => {}),
//     new Promise(() => {})
// ];

// arr.map((item) => {
//     console.log(item);
// })


// tree shaking (提取有用代码)
// import {add} from './math';

// console.log('add', add(100, 50));

// console.log('add', add(200, 50));


// code splitting 代码分割

// import _ from 'lodash';

// console.log('lodash join', _.join(['a', 'b', 'c'], '**'))


// 模块的异步加载(getComponent 是webpack提供的方法)
// async function getComponent() {
//     const {default: _} = await import(/*webpackChunkName:"lodash" */ 'lodash');
//     var div = document.createElement('div');
//     div.innerHTML = _.join(['Hadwin', 'zhanghuawei'], "_");
//     return div;
// }

// // 返回的其实是一个promise对象
// document.addEventListener('click', () => {
//     getComponent().then((ele) => {
//         var root = document.getElementById('root');
//         root.appendChild(ele);
//     })
// })

// import '../css/index.scss';

// document.addEventListener('click', () => {
//     import(/*webpackPrefetch: true*/ './click').then(({default: fn}) => {
//         fn();
//     })
// })

// webpack 与浏览器缓存
// import _ from 'lodash';
// import $ from 'jquery';
// import {ui} from './jquery-ui';

// ui();

// $('#root').html(_.join(['Hadwin', 'zhang'], '***'));
// let hi = 'hello world'
// $('body h4').html(`世界你好 ${hi}`)

console.log('指向', this);

console.log('指向1', this === window);
