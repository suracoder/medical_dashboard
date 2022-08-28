import React from 'react'
import {Button,TextField} from '@material-ui/core'
import ItemCard from './snippets/ItemCard'
import loadData from '../controller/loader'

class Slides extends React.Component{

    constructor(props){
        super(props)
        this.state={loaded:false,data:[],slidedata:[]}
    }
    async componentDidMount(){
        let resp=await loadData({},"fetchSlides",false);
        if(resp.status===200){
            console.log(resp.data)
            this.setState({slidedata:resp.data})
        }
         resp=await loadData({},"listItems",false);
        if(resp.status===200){
            this.setState({loaded:true,data:resp.data})
        }
        
    }
    render(){
        return <div className="padding">
           
            <h1>
                Slideshow Items
            </h1>
            <ul>
                {this.state.slidedata.map((data,index)=>{
                    const url="http://localhost:355/pictures/"+data.Item.id+"photo1.jpg"
                return <li><ItemCard imageurl={url} header={data.name} description={data.description} bool={true} id={data.id} /></li>
           
                })}
            </ul>
            <br></br>
            <div className="w-100 flex"><h1 className="w-100">Choose items to Add to the Sideshow</h1></div>
            <div className="flex w-100 whitebg">
                <TextField className="w-80" placeholder="search with name" variant="outlined" /><Button className="w-20" variant="primary">SEARCH</Button>
            </div>
            <ul>

            
            {this.state.data.map((data,index)=>{
                let bools=false;
                this.state.slidedata.map((dat,index)=>{
                        if(data.id===dat.Item.id){
                                bools=true
                        }
                })
                if(!bools){
                    const url="http://localhost:355/pictures/"+data.id+"photo1.jpg"
                return <li><ItemCard imageurl={url} header={data.name} description={data.description} bool={false} id={data.id}/></li>
        
                }else{
                    return null
                }
                   })}
            
            </ul>
        </div>
    }
}

export default Slides