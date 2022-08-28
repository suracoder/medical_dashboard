
import React from 'react'
import { Container, Button, TextField, Snackbar,Chip } from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import loadData from '../controller/loader'
class Addtags extends React.Component {
    
    constructor(props){
        super(props)
       this.state=({alert:false,alertmessage:null,name:null,chips:[]})
    }

    setName(event){
        this.setState({name:event.target.value})
    }
    async componentDidMount(){
        this.loadTags()
    }

    async loadTags(){
        let resp=await loadData({},"listTags",false)
        this.setState({chips:resp.data})

    }

    async sendValue(){
        
        const resp=await loadData({name:this.state.name},"addTag",false)
        if(resp.status!==200){
            this.setState({alert:true,alertmessage:"cannot connect to the server try again"})
        }else{
            this.setState({alert:true,alertmessage:"Tag Added Successfully"})
            this.loadTags()
      
        }
    }

    render() {
        return <div>
            <Container spacing={12}>
            <Snackbar open={this.state.alert} autoHideDuration={500} >
            <p className="blackbg padding radius" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>{this.state.alertmessage}</p></Snackbar>

            <div className="flex">
                <FontAwesomeIcon icon={faTag} className="marginrit heightfull" style={{ width: '35px' }} />
                <h1>Add Tags</h1>
            </div>
            <br></br>
            <TextField onChange={this.setName.bind(this)} className="w-100 whitebg radius" variant={"outlined"} label="Tag Name"/>
            <br></br><br></br>
            <Button onClick={this.sendValue.bind(this)} className="active w-100 morepadding radius" size="large" >ADD TAG</Button>
            
        </Container>
        <Container>
        <h1>Tags</h1>
        <br></br>
        
        {this.state.chips.map((dat,index)=>{
            return <Chip className="maarginrit " icon={<FontAwesomeIcon icon={faTag}/>} label={dat.name}/>
        })}
        </Container>
        
        </div>
    }
}
export default Addtags
