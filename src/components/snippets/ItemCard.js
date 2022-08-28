import React from 'react'
import {Button,Snackbar} from '@material-ui/core'
import loadData from '../../controller/loader'

class ItemCard extends React.Component{

    constructor(props){
        super(props)
        this.state={bool:props.bool,alert:false,alertmessage:"success refresh this page for effects",disp:'block'}
    }

    async handleClick(id){
        let resp=await loadData({itemid:id,bool:this.state.bool},"addSlide",false)
        if(resp.status===200){
            console.log("succeess")

            this.setState({alert:true,disp:'none'})
            window.setTimeout(()=>{this.setState({alert:false})},5000)
        }
    }


    render(){
        
        return <div className=" radius  card-div whitebg" style={{display:this.state.disp}}>
         <Snackbar open={this.state.alert} autoHideDuration={500} ><p className="blackbg padding radius" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>{this.state.alertmessage}</p></Snackbar>
             
            <div className="card-image radius"  style={{background:`url(${this.props.imageurl})`,backgroundSize:'cover'}}></div>
            <div className="padding">
            <h1>{this.props.header}</h1>
            <p>CLick to {this.state.bool? "remove":"add"} this item to slideshow</p>
            <Button color={"primary"} className="btn-bg" onClick={()=>{this.handleClick(this.props.id)}}>{this.state.bool? "REMOVE":"ADD"} SLIDE</Button></div>
            
        </div>
    }
}
export default ItemCard