import React,{Component} from 'react'
import MobileHeader from './MobileHeader'
import MobileFooter from './MobileFooter'
export default class MobileApp extends Component{
    render(){
        return(
                <div>
                    <MobileHeader/>
                    {this.props.children}
                </div>

        )
    }
}
