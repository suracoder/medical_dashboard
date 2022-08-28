import Axios from 'axios'
import ConfigData from '../config.json'
async function loadData(params,endpoint,boolean){
    let resp=[];
    try{
     return resp=await Axios.post(ConfigData.server_url+endpoint,params)
    }catch(error){
        console.log("ksskksksksks"+error)
         return resp=[{error:1,status:202,data:[]}]
    }
}
async function sendImageData(params,endpoint,boolean){
    
    const config = {
        method:'POST',
        url:'http://localhost:355/api/admin/newItem',
        data:params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    let resp=[]
    try{
        return resp=await Axios(config)
    }catch(error){
        console.log("ksskksksksks"+error)
        return resp=[{error:1,status:202,data:[]}]
    }
}
export default loadData
export  {sendImageData}