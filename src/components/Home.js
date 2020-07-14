import React,{useState,useRef} from "react";
import axios from 'axios'; 
import "./Home.css"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const handleChange=(setSucess,setUrl)=>{
    setSucess(false);
    setUrl("");
}

const handleUpload=(uploadInput,setUrl,setSucess)=>{
let files=uploadInput.current.files[0];
let fileParts= files.name.split('.');
let fileName=fileParts[0];
let fileType=fileParts[1];

console.log(fileName,fileType);
console.log("Preparing the upload");
    axios.post("http://localhost:5000/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      setUrl(url);
      console.log("Recieved a signed request " + signedRequest);
      
     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,files,options)
      .then(result => {
        console.log("Response from s3")
        setSucess(true);
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
}
const Success = ({url}) => (
    <div style={{padding:50}}>
      <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
      <a href={url}>Access the file here</a>
      <br/>
    </div>
)
const Home=()=>{
     const uploadInput = useRef();
    const[sucess,setSucess]=useState(false);
const[url,setUrl]=useState('');
    return(
<div className="purple-square-container">
<div className="purple-square">
<div>
<h1>UPLOAD A FILE</h1>
          {sucess ? <Success url={url}/> : null}
          <input onChange={()=>handleChange(setSucess,setUrl)} ref={uploadInput} type="file"/>
          <br/>
          <button onClick={()=>handleUpload(uploadInput,setUrl,setSucess)}>UPLOAD</button>
          </div>
          </div>
</div>

)

}

export default Home;
