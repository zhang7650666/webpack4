import avatar from '../img/girl.jpeg';
import { create } from 'domain';


function createAvatar() {
    var img = new Image();
    img.src = avatar;
    img.classList.add('avatar');
    var dom = document.getElementById('root');
    dom.append(img);
}

export default  createAvatar;