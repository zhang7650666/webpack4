import * as _ from 'lodash';

class Greeter {
    greeting: string;
    constructor(msg: string){
        this.greeting = msg
    };
    greet() {
        // return 'hello, ' + this.greeting;
        return _.join()
        // return _.join(['hello', this.greeting], '**');
    }
}

const greeter = new Greeter('world');

let btn = document.createElement('button');
btn.textContent = 'say hello';

btn.onclick = function() {
    alert(greeter.greet());
};

document.body.appendChild(btn);