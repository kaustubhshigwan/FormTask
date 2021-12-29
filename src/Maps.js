import React,{Component} from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '@progress/kendo-theme-default/dist/all.css';
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import './style.css'
let nameData=[]
let comoboxValue=''
let topicDatavalue=''
let BodyDatavalue=''
let datasend
let mainData=''
let IDvalue=''
let lat
let lng
class Maps extends Component {
    constructor(){
      super()
           this.state={
             mainData:{
              ComboxData:'',
              inoutBOdyData:'',
              inputTopicData:'',
             },
             Combdata:[],
             geoLocate:{
               lat:null,
               lng:null,
             },
             combValue:'',
             ID:null,
             Topic:'',
             Body:'',               
           }
          
    }
  
     
     componentDidMount(){
       fetch('https://jsonplaceholder.typicode.com/users').then((res)=>{
         return res.json()
       }).then((data)=>{
          mainData=data;          
           nameData=data.map(item=>item.name)
           this.setState({             
             Combdata:nameData,
           })
       }).catch((err)=>{
         console.log(err)
       })
     }
      
     
    userName=(e)=>{
      
     comoboxValue=e.target.value
     this.setState({
       combValue:comoboxValue
     })
      IDvalue=mainData.map(item=>item.name==comoboxValue && item.id).filter(Boolean).toString()
    
      console.log(IDvalue,'idvalue')
      
    }

  
    topicData=(e)=>{
       topicDatavalue=e.target.value
       this.setState({
         Topic:e.target.value
       })
    
    
    }

    BodyData=(e)=>{
       BodyDatavalue=e.target.value
       this.setState({
         Body:e.target.value
       })
      
    }
    
    dataSubmit=(e)=>{
      if(IDvalue==''){
        alert('plz fill user name field')
     }else if(topicDatavalue=='') {
       alert('plz fill topic field')
     }else if(BodyDatavalue==''){
       alert('plz field body field')
     }
     this.setState({
      geoLocate:{
        lat:mainData.map((item)=>item.name==comoboxValue && item.address.geo.lat ).filter(Boolean),
        lng:mainData.map((item)=>item.name==comoboxValue && item.address.geo.lng ).filter(Boolean)            
      }
    })

      const dataStore=[{
        ID:IDvalue,
        Topic:topicDatavalue,
        Body:BodyDatavalue,
       }]
      
      console.log(dataStore,'datastore')
      
      
      fetch('https://jsonplaceholder.typicode.com/posts',{
             method:'POST',
             headers:{
               'Content-Type':'Application/json'
             },
             body:JSON.stringify({
                dataStore
             })
           })
           
          this.setState({
            Topic:'',
            Body:'',
            combValue:''

          })
    }
    
    formSubmit=(e)=>{
     e.preventDefault()
     
    }

  render(){
   console.log(this.state.geoLocate,'lat')
    
    const style = {
      
      width: 600,
      height: 600,
      
      }
    return (
      <div className="container" >
        <div className="map">
        <Map 
   google={this.props.google}
   zoom={2}
  
   initialCenter={{
   lat: this.state.geoLocate.lat,
   lng:this.state.geoLocate.lng,
   }}
   style={style}  >
   <Marker position={{ lat:this.state.geoLocate.lat, lng:this.state.geoLocate.lng}}  />
   </Map>
        </div>
         
    <form onSubmit={this.formSubmit} className="form" method="post"  >
         <div className="Fields"  >
          <label >select username</label>
         <ComboBox style={{width:400,height:50}} value={this.state.combValue} name="ComboBox" data={this.state.Combdata} onChange={this.userName} />
         </div>
         <div className="Fields">
           <label>Topic</label>
         <Input style={{width:400,height:50}} value={this.state.Topic}  type={'text'} name="topic" onChange={this.topicData} ></Input>
         </div>
          <div className="Fields">
            <label>Body</label>
          <Input style={{width:400,height:50}} value={this.state.Body} onChange={this.BodyData} name="Body" type={'text'} ></Input>
          </div>
     <Button type='submit' className="Btn" onClick={()=>this.dataSubmit()}>Submit</Button>
    </form>
    
      </div>
  )
  }
}
export default GoogleApiWrapper({
  apiKey:('AIzaSyB4UEQPH9ssRAKS0tQ2H1b6KStIF3rb6qE'),
  version:3.46
 })(Maps);