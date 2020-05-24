function counter() {
    var root = document.getElementById('root');
    var div = document.createElement('div');
    div.setAttribute('id', 'counter');
    div.innerHTML = '1';
    root.append(div);
    div.onclick = function() {
        div.innerHTML = parseInt(div.innerHTML, 10) + 1;
    }
}

export default counter;