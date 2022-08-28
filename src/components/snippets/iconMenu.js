import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class IconMenu extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            active:'',
            color:this.props.color
        })
    }
    
    render(){
        return (<div className="flex">
        <FontAwesomeIcon icon={this.props.icon} className="riticon" />
<p className={this.props.textclass+" "} >{this.props.text}</p>
        </div>
        )
    }
}


export default IconMenu