function Header() {
    var dom = document.getElementById('root');
    var header = document.createElement('div');
    header.innerText = 'header';
    dom.append(header);
}

export default Header;

// CommonJS 导出某块规范
// module.exports = Header;