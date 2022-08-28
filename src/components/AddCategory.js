import React from 'react'
import { Button, TextField, Paper, Select, MenuItem, FormControl, InputLabel, InputAdornment, Snackbar,  } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import loadData from '../controller/loader'
class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = { catname: '', catdesc: '', cat: false, subcat: false,alertmessage:'' ,subcatid: '0', subcatname: '', subcatdesc: '', category: [], alert: false }
    }


    async componentDidMount() {
        const resp = await loadData({}, "listCategory", false);
        if (resp.status !== 200) {
            this.setState({ alert: true,alertmessage:'cannot connect to the internet' })
        }else{
             this.setState({ category: resp.data })
            console.log(resp.data)
        }
    }
    async loadCategory(){
        const resp = await loadData({}, "listCategory", false);
        if (resp.status !== 200) {
            this.setState({ alert: true,alertmessage:'cannot connect to the internet' })
        }else{
             this.setState({ category: resp.data })
            console.log(resp.data)
        }

    }

  
    async submitCategory() {
        if(this.state.catname.length>0 && this.state.catdesc.length>0){
        let params={name:this.state.catname,description:this.state.catdesc}
        const resp=await loadData(params,"/newCategory",false);
        if(resp.status===200){
            document.getElementById('catname').value=""
            document.getElementById('catdesc').value=""
            this.setState({ alert: true,alertmessage:'Category Added successfully' })
            this.loadCategory()
     
        }
    }else{
        this.setState({ alert: true,alertmessage:'Fill the required fields' })
    }


    }
    async submitSubCategory() {
        if(this.state.subcatname.length>0 && this.state.subcatdesc.length>0){
            let params={name:this.state.subcatname,description:this.state.subcatdesc,categoryId:this.state.subcatid}
            const resp=await loadData(params,"/newSubCategory",false);
            if(resp.status===200){
                document.getElementById('subcatname').value=" "
                document.getElementById('subcatdesc').value=" "
                this.setState({ alert: true,alertmessage:'Subcategory Added successfully' })
                this.loadCategory()
         
            }
        }else{
            this.setState({ alert: true,alertmessage:'Fill the required fields' })
               
        }
       


    }
    searchCategory(val){
        this.state.category.map((data,index)=>{
            if(data.name.search(val.target.value)>=0){
                    document.getElementById("selectCat").value=data.id
                    console.log(data.id+"kayo"+ document.getElementById("selectCat").value)
                    this.setState({subcatid:data.id})
                    return data.id;
            }else{
                return null;
            }
        })
    }
    writeCategoryName(event){
        this.setState({catname:event.target.value})
    }
    writeCategoryDesc(event){
        this.setState({catdesc:event.target.value})
    }
    writeSubCategoryName(event){
        this.setState({subcatname:event.target.value})
    }
    writeSubCategoryDesc(event){
        this.setState({subcatdesc:event.target.value})
    }
    setCatId(event){
        this.setState({subcatid:event.target.value})
    }
    


    render() {
        return <div>
                <Snackbar open={this.state.alert} autoHideDuration={500} ><p className="blackbg padding radius" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>{this.state.alertmessage}</p></Snackbar>
             
            {/* new category */}
            <Paper elevation={0} className=" padding almostwhitebg" >
                <Category text="Add Category" icon={faPen} />
                <center className="flex">
                 <TextField required id="catname" onChange={this.writeCategoryName.bind(this)} label="Category name" variant="outlined" className="whitebg marginrit" />
                <TextField required id="catdesc" onChange={this.writeCategoryDesc.bind(this)} label="Category description" multiline variant="outlined" className="whitebg w-50 marginrit " />
                <Button onClick={this.submitCategory.bind(this)} size="large" variant="contained" color="primary" className="morepadding w-35 active" disableElevation>Submit Category</Button>
           

                </center>
                </Paper>

            { /*new subbcategory  */}

            <Paper elevation={0} className="padding almostwhitebg">
                <Category text="Add SubCategory" icon={faPlus} />
                <TextField label="search category" onChange={this.searchCategory.bind(this)} variant="outlined" className="whitebg marginrit w-100" InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <FontAwesomeIcon icon={faSearch} color={"#3f51b5"} />
                        </InputAdornment>
                    ),
                }} />
                <br /> <br />
                <FormControl variant="outlined" className="w-100 whitebg">
                <InputLabel id="demo-simple-select-outlined-label">Select Category</InputLabel>
                    <Select required onChange={this.setCatId.bind(this)}
                        id="selectCat"
                        label="Select Category"
                        value={this.state.subcatid}
                    >

                        {this.state.category.map((data, index) => {
                            return <MenuItem id={"menu_"+data.id} value={data.id}>{data.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>

                <br /> <br />
                <TextField id="subcatname" required onChange={this.writeSubCategoryName.bind(this)} label="Subcategory name " variant="outlined" className="whitebg marginrit w-100" />
                <br /> <br />
                <TextField id="subcatdesc" required onChange={this.writeSubCategoryDesc.bind(this)} label="Subcategory description " multiline variant="outlined" className="whitebg w-100 marginrit " />
                <br /> <br />
                <Button onClick={this.submitSubCategory.bind(this)} size="large" variant="contained" color="primary" className="morepadding w-100 active" disableElevation>ADD SubCategory</Button>

            </Paper>

        </div>


    }


}

function Category(props) {
    return <p><b>
        <div className="flex"> <FontAwesomeIcon className=" heightfull" icon={props.icon} color="primary" style={{width:'20px'}} />
            <h1>{props.text}</h1></div>
        <br></br>
    </b></p>

}

export default AddCategory