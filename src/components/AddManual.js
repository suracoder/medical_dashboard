import React from 'react'
import {TextField,Button} from '@material-ui/core'
import loadData from '../controller/loader'

class AddManual extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            manual:null,name:'',description:''
        })
    }

    handleManual(event){
        console.log(event)
        this.setState({
            manual:event.target.files[0]
        })
    }
    handleName(event){
        this.setState({
            name:event.target.value
        })
    }
    handleDescription(event){
        this.setState({
            description:event.target.value
        })
    }
    async sendData(){
        let fd = new FormData();
        let files=this.state.manual;
        console.log(files)
            fd.append("manual", files)
            fd.append("name",this.state.name)
            fd.append("description",this.state.description)
        let params={name:this.state.name,description:this.state.description,manual:this.state.manual}
        let resp=await loadData(fd,"submitManual",false)
        console.log(resp.data)
    }


    render(){
        return <div className="">
            <h1>Add Manuals</h1>
            <br></br><br></br>
            <TextField onChange={this.handleName.bind(this)} label="Manual name" type="text" className="w-100 whitebg" variant="outlined"/><br></br><br></br>
            <TextField onChange={this.handleDescription.bind(this)} label="Manual Description" type="text" className="w-100 whitebg" variant="outlined" multiline/>
            <br></br><br></br>
            <p>choose only pdf files</p>
            <input type="file" name="manual" onChange={this.handleManual.bind(this)}/>
            <br></br><br></br>
            <Button className="w-100 radius morepadding active" onClick={this.sendData.bind(this)}>Add manuals</Button>
        </div>
    }
}

export default AddManual