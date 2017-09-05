/**
 * Created by lengye on 2017/9/1.
 */
import React,{Component} from 'react'
import Newshead from './apphead/newshead'
import Newsfooter from './apphead/newsfoot'
export default class App extends Component {
    render() {
        return (
            <div>
                <Newshead/>
                {this.props.children}
                <Newsfooter/>
            </div>
        )
    }
}