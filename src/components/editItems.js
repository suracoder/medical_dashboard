import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice,faTag } from '@fortawesome/free-solid-svg-icons'
import loadData from '../controller/loader'
import {sendImageData} from '../controller/loader'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar,FormControlLabel,Checkbox,Chip } from '@material-ui/core'


class EditItems extends React.Component{

    constructor(props){
        super(props)
        this.state=({chips:[],selectedchips:[],chipdata:[],
            photo:null,category:[],alert:false,alertmessage:'',catid:0,subcatid:0,productid:0,itemname:'',price:0,featured:false,description:''
        })
    }

    async componentDidMount(){
        const resp=await loadData({},'listCategory',false)
        this.setState({category:resp.data})
        this.loadTags()
    }

    selectCat(event){
        this.setState({catid:event.target.value})
    }
    setSubCat(event){
        this.setState({subcatid:event.target.value})
    }
    setProduct(event){
        this.setState({productid:event.target.value})
    }
    setName(event){
        this.setState({itemname:event.target.value})
    }
    setMoney(event){
        this.setState({price:event.target.value})
    }
    setChecked(event){
        this.setState({featured:event.target.checked})
    }
    setDesc(event){
        this.setState({description:event.target.value})
    }
    async submitform(){
        if(this.state.productid!==0 && this.state.itemname.length>0 && this.state.price!==0 && this.state.selectedchips.length>0){
            let fd = new FormData();
            let files=this.state.photo;
            for (let i = 0; i < files.length; i++) {
                fd.append("image", files[i])
            }
            
            fd.append('name',this.state.itemname)
            fd.append('price',this.state.price)
            fd.append('product',this.state.productid)
            fd.append('featured',this.state.featured)
            fd.append('description',this.state.description)
            fd.append('chips',JSON.stringify(this.state.selectedchips))
            const resp=await sendImageData(fd,'newItem',false)
            if(resp.status!==200){
                this.setState({alert:true,alertmessage:"cannot connect to the server"})
            }else{
                document.getElementById('itemname').value=''
                document.getElementById('itemprice').value=''
                document.getElementById('itemdesc').value=''
                this.setState({alert:true,alertmessage:"item added successfully"})
            }
        }else{
            this.setState({alert:true,alertmessage:"Fill the required forms"})
        }
    }

    handleimage(event){
        this.setState({photo:event.target.files})
    }

    async loadTags(){
        let resp=await loadData({},"listTags",false)
        this.setState({chips:resp.data,chipdata:resp.data})

    }
    handleChip(id,name,bool){
        const chiparray=this.state.selectedchips
        const chips=this.state.chips
        if(bool){
            let boool=true
            for(var i=0;i<chiparray.length;i++){
                if(id===chiparray[i].id){
                    boool=false
                    break
                }
            }
            if(boool){
                chiparray.push({id:id,name:name})
            }
            this.setState({selectedchips:chiparray})
           
            chips.map((dat,i)=>{
                if(id===dat.id){
                    chips.splice(i,1)
                }
                return null
            })
            this.setState({chips:chips})
            

        }else{
            chiparray.map((dat,i)=>{
                if(id===dat.id){
                    chiparray.splice(i,1)
                    chips.push(dat)
                    return null
                }else{
                    return null
                }
            })
            this.setState({selectedchips:chiparray,chips:chips})
        }
    }

    




    render(){
        return <div className="padding">
         <Snackbar open={this.state.alert} autoHideDuration={500} ><p className="blackbg padding radius" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>{this.state.alertmessage}</p></Snackbar>
        
        <div className="flex">
        <FontAwesomeIcon icon={faDice} className="marginrit heightfull" style={{width:'35px'}}/>
            <h1>Add Items</h1>
        </div>
        <br></br>
        <div className="">
        <FormControl variant="outlined" className="w-100 whitebg">
                <InputLabel id="demo-simple-select-outlined-label">Select Category</InputLabel>
                    <Select required 
                        id="selectProduct"
                        label="Select Product"
                        
                        onChange={this.selectCat.bind(this)}
                    >

                        {this.state.category.map((data, index) => {
                            return <MenuItem id={"menu_"+data.id} value={data.id}>{data.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                </div>
        <br></br>
        <FormControl variant="outlined" className="w-100 whitebg">
                    <InputLabel id="demo-label">Select SubCategory</InputLabel>
                    <Select required
                        id="selectSubCat"
                        label="Select SubCategory"
                        
                        onChange={this.setSubCat.bind(this)}

                    >

                        {this.state.category.map((data, index) => {
                            
                            if(data.id===this.state.catid){
                                return data.SubCategories.map((subdata,index)=>{
                                    return <MenuItem key={"submenu_"+index} id={"submenu_" + subdata.id} value={subdata.id}>{subdata.name}</MenuItem>
                       
                                })
                               
                            }else{
                                return null;
                            }
                           })}

                    </Select>
                </FormControl>
                <br></br><br></br>
        <FormControl variant="outlined" className="w-100 whitebg">
                    <InputLabel id="demo-label">Select Product</InputLabel>
                    <Select required
                        id="selectProduct"
                        label="Select Product"
                        onChange={this.setProduct.bind(this)}
                    >

                        {this.state.category.map((data, index) => {
                            if(data.id===this.state.catid){
                                return data.SubCategories.map((subdata,index)=>{
                                    if(subdata.id===this.state.subcatid){
                                        return subdata.Products.map((product,index)=>{
                                            return <MenuItem key={"product"+index} id={"product" + product.id} value={product.id}>{product.name}</MenuItem>
                       
                                        })
                                       
                                    }else{
                                        return null;
                                    }
                                   
                                })
                               
                            }else{
                                return null;
                            }
                           })}

                    </Select>
                </FormControl>
                <br></br><br></br>
                <div className="flex">
                <TextField onChange={this.setName.bind(this)} label="Item Name" variant="outlined" className="w-100 whitebg marginrit" id="itemname"/>
                
                <TextField type="number" onChange={this.setMoney.bind(this)} label="money" variant="outlined" className="whitebg" id="itemprice"/><br></br>
                
                </div>
                <TextField type="number" onChange={this.setMoney.bind(this)} label="quantity" variant="outlined" className="whitebg" id="item"/><br></br>

                <br></br>
                <TextField onChange={this.setDesc.bind(this)} label="Item Description" variant="outlined" className="w-100 whitebg marginrit" id="itemdesc"/>
                <br></br><br></br>
                <input type="file" name="images" onChange={this.handleimage.bind(this)} multiple/>
                <br></br><br></br>
                <FormControlLabel
        control={
          <Checkbox
            name="checkedF"
            color="primary"
            className="padding"
            onChange={this.setChecked.bind(this)}
            
          />
          
        }
        label="Set Featured"
      />
     
      <br></br><br></br>
      {
              this.state.chips.map((dat,index)=>{
                  return <Chip icon={<FontAwesomeIcon icon={faTag}/>} label={dat.name} onClick={()=>{this.handleChip(dat.id,dat.name,true)}} onDelete={()=>{this.handleChip(dat.id,false)} }/>
              })
          }
        <br></br><br></br>
        <p>selected tags list</p>
      {
          this.state.selectedchips.map((dat,index)=>{
              return <Chip icon={<FontAwesomeIcon icon={faTag}/>} label={dat.name} onClick={()=>{this.handleChip(dat.id,true)}} onDelete={()=>{this.handleChip(dat.id,false)}} color="primary"/>
           
                  
             
              
          })
      }
      <br></br><br></br>
                        <Button onClick={this.submitform.bind(this)} variant="contained" color="primary" disableElevation className="active morepadding w-100"  size="large">SUBMIT</Button>
        </div>
    }
}


export default EditItems