import React from 'react'
import { Button, TextField, Paper, Select, MenuItem, FormControl, InputLabel, InputAdornment, Snackbar,Container  } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faSearch,faCog } from '@fortawesome/free-solid-svg-icons'
import loadData from '../controller/loader'
class SparePart extends React.Component{
    constructor(props){
        super(props)
        this.state=({loaded:false,data:[],name:'',description:'',alert:false,alertmessage:''})
    }


    async componentDidMount(){
        
    }
    async sendData(){
        let paramss={name:this.state.name,description:this.state.description}
        const resp=await loadData(paramss,"addSparePart",false);
        this.setState({data:resp.data,loaded:true,alert:true,alertmessage:"SparePart added successfully"})

        
    }
    addName(event){
        this.setState({name:event.target.value})
    }
    addDescription(event){
        this.setState({description:event.target.value})
    }
    render(){
        return <div className="top-part"><Container>
         <Snackbar open={this.state.alert} autoHideDuration={500} ><p className="blackbg padding radius" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>{this.state.alertmessage}</p></Snackbar>
             
            <div class="flex"><FontAwesomeIcon icon={faCog}/><h1>Add SparePart</h1></div>
            <br></br>
            <div>
                <TextField onChange={this.addName.bind(this)} className="w-100" variant="outlined" type="text" label="Sparepart Name"/>
                <br></br><br></br>
                <TextField onChange={this.addDescription.bind(this)} className="w-100" variant="outlined" type="text" label="Sparepart Description" multiline/>
                <br></br><br></br>
                <Button onClick={this.sendData.bind(this)} variant="filled" color="primary" className="w-100 morepadding radius active">ADD Sparepart</Button>
            </div>
        </Container></div>
    }
}

export default SparePart;