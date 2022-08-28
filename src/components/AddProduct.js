import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import loadData from '../controller/loader'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar, } from '@material-ui/core';

class AddProduct extends React.Component {
    constructor(props){
        super(props)
        this.state=({category:[{SubCategories:[]}],catid:0,subcatid:0,product:'',alert:false,alertmessage:"none"})
    }


    async componentDidMount(){
        const resp=await loadData({},"listCategory",false)
        this.setState({category:resp.data})
        console.log(resp.data)
    }

    changeSubValue(event){
        this.setState({catid:event.target.value,subcatid:0})
    }

    changeSubCatValue(event){
        this.setState({subcatid:event.target.value})
    }

    setProduct(event){
        this.setState({product:event.target.value})
    }

    async submitData(){
        if(this.state.product.length>0 && this.state.subcatid!==0){
            let params={'name':this.state.product,'subCategory':this.state.subcatid}
            const resp=await loadData(params,"/newProduct",false);
            if(resp.status!==200){
                this.setState({ alert: true,alertmessage:'Error connecting to the server' })
               
            }else{
                document.getElementById('product').value=''
                this.setState({ alert: true,alertmessage:'Subcategory Added successfully' })
               
            }
            
        }else{
            this.setState({ alert: true,alertmessage:'Fill the required forms' })
               
        
        }
    }


    render() {
        return <div className=" padding">
         <Snackbar open={this.state.alert} autoHideDuration={500} ><p className="blackbg padding radius" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>{this.state.alertmessage}</p></Snackbar>
             
            <div className="flex">
                <FontAwesomeIcon className="heightfull" style={{ width: '35px', marginRight: '5px' }} icon={faCartPlus} />
                <h1>Add Product</h1>
            </div>
            <br></br>
            <div className="">
                <FormControl variant="outlined" className="w-100 whitebg">
                    <InputLabel id="demo-simple-select-outlined-label">Select Category</InputLabel>
                    <Select required
                        id="selectCat"
                        label="Select Category"
                        value={this.state.catid}
                        onChange={this.changeSubValue.bind(this)}
                    >

                        {this.state.category.map((data, index) => {
                            return <MenuItem key={"menu_"+index} id={"menu_" + data.id} value={data.id}>{data.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>
                <br /><br />
                <FormControl variant="outlined" className="w-100 whitebg">
                    <InputLabel id="demo-label">Select SubCategory</InputLabel>
                    <Select required
                        id="selectSubCat"
                        label="Select SubCategory"
                        value={this.state.subcatid}
                        onChange={this.changeSubCatValue.bind(this)}
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
                <TextField variant="outlined" id="product" onChange={this.setProduct.bind(this)} className="w-100 marginrit" label="Product Name" />
                <br></br><br></br>
                <Button variant="contained" onClick={this.submitData.bind(this)} className="active w-100 morepadding" size="large" disableElevation>SUBMIT</Button>
            </div>
        </div>


    }
}


export default AddProduct