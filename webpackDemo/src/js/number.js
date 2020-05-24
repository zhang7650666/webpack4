function number() {
    var root = document.getElementById('root');
    var div = document.createElement('div');
    div.setAttribute('id', 'number');
    div.innerHTML = '3000';
    root.append(div);
    
}

export default number;