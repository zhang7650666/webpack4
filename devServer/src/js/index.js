import React, {Component} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './home';
import ListPage from './list'

class App extends Component{
    // componentDidMount(){
    //     axios.get('/api/common/system/productSide').then((res) => {
    //         console.log('res', res);
    //     })
    // }
    render() {
        return (<BrowserRouter>
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/list" component={ListPage}/>
            </div>
        </BrowserRouter>)
    }
}

ReactDom.render(<App/>, document.getElementById('root'))
