import React, {Component} from 'react';
import _ from 'lodash';

class Home extends Component{
    render() {
        return (<div>{_.join(['this', 'is', 'homePagte'], "~")}</div>)
    }
}

export default Home;