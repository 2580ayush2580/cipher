import React, { useState } from 'react'
import { Button, Form} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import NavBar from './NavBar'

const Data = () => {
    
    const history=useHistory()
    const [temp, settemp] = useState(false)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [video, setVideo] = useState('')
    const [alert, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)
    const [disabled, setdisabled] = useState(true)
    const [progress, setprogress] = useState(0)
    const [showprogress, setshowprogress] = useState(false)

    const data=localStorage.getItem('user')
    let currentUser
    if(data)
    {
      currentUser=JSON.parse(data)
    }

    if(!currentUser){
        history.push('/login')
    }
   
    const submitHandler=async (e)=>{
        e.preventDefault()
        const config = {
            headers: {
            'Content-type':'application/json',
            Authorization:`Bearer ${currentUser.token}` 
            },
        }
        try{
            setloading(true)
            const {data}=await axios.post('http://localhost:5000/api/data',{title,description,video},config)
            // const {data}=await axios.post('https://pure-river-17146.herokuapp.com/api/data',{email,userName,mobileNumber,address},config)
            
            setsuccess(data.success)
            setalert(data.message)
            setloading(false)
            data.success?history.push('/home'):history.push('/add-post');
            if(temp)
                settemp(false)
            else
                settemp(true)
        }catch(e){
            setsuccess(false)
            setloading(false)
            setalert('Some error occured')
        }
    }

    const handleVideo=async (e)=>{
        if(e?.target?.files[0]){
            setshowprogress(true)
            let imageData = new FormData();
            imageData.append("file", e?.target?.files[0]);
        let filesize = (e.target?.files[0]?.size / 1024 / 1024).toFixed(4); // MB
        if (
          e.target.files[0].type === "video/mp4" ||
          e.target.files[0].type === "video/x-msvideo" ||
          e.target.files[0].type === "video/ogg" ||
          e.target.files[0].type === "video/x-matroska" ||
          e.target.files[0].type === "video/webm"
        ) {
          if (filesize <= 500) {
            imageData.append("upload_preset", "upxcvcad");
            let res = await axios.post(
              "https://api.cloudinary.com/v1_1/dlaablgiq/video/upload",
              imageData,
              {
                onUploadProgress: function (progressEvent) {
                  var progress = Math.round(
                    (progressEvent.loaded * 100.0) / progressEvent.total
                  );
                  setprogress(progress)
                },
              }
            );
            if (res) {
                setshowprogress(false)
                setVideo(res.data.url)
                setdisabled(false)
                setloading(false)
                setsuccess(true)
                setalert("Video Uploaded, Now Click submit")
            }
          } else {
            setshowprogress(false)
            setsuccess(false)
            setalert("File size is too large!");
          }
        } else {
            setshowprogress(false)
            setsuccess(false)
            setalert("Please upload a video file!");
        }
        }
        else{
            setshowprogress(false)
            setsuccess(false)
            setalert("Please upload a video file!");
        }
      }

    return (
        <>
        <NavBar></NavBar>
        <div className="data-wrapper">
            <div>
                <div className="table">
                    <div>
                        <h1>Add Video</h1>
                    </div>
                    {success===true?<div className="inform success">{alert}</div>:null}
                    {success===false?<div className="inform fail">{alert}</div>:null}
                    {showprogress===true?<div><div>Wait...</div><progress value={progress} max="100"></progress></div>:null}
                    {loading && <Loader></Loader>}
                    <Form>
                        <Form.Group controlId='title' >
                            <Form.Control 
                                type='text' 
                                placeholder="Enter Title" 
                                value={title} 
                                onChange={(e)=>settitle(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' >
                            <Form.Control 
                                type='text' 
                                placeholder="Enter Description" 
                                value={description} 
                                onChange={(e)=>setdescription(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='img'>
                            <Form.Control 
                                type='file' 
                                placeholder="Enter Img" 
                                onChange={(e)=>{ 
                                    handleVideo(e)
                                }}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button type="submit" variant="primary" disabled={disabled} onClick={submitHandler}>Submit</Button>
                </div>
            </div>    
        </div>
    </>
    )
}

export default Data
