import axios from 'axios'
import React,{useEffect, useState}  from 'react'
import DataItem from './DataItem'
import Loader from './Loader'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

const DataList = ({currentUser,temp}) => {

    const [temp2, settemp2] = useState(false)
    const [datalist, setdatalist] = useState([])
    const [, seterror] = useState(null)
    const [, setalert] = useState(null)
    const [loading, setloading] = useState(null)
    const [success, setsuccess] = useState(null)

    useEffect(() => {
        const data=localStorage.getItem('user')
        let currentUser
        if(data)
        {
          currentUser=JSON.parse(data)
        }
    
        const getdata=async ()=>{        
            const config = {
                headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${currentUser.token}` 
                },
            }
            try{
                setloading(true)
                const {data}=await axios.get(`http://localhost:5000/api/data`,config)
                // const {data}=await axios.get('https://pure-river-17146.herokuapp.com/api/data',config)

                setsuccess(data.success)
                setdatalist(data.data)
                setalert(data.message)
                setloading(false)
            }catch(e){
                seterror('Unable to Load')
                setloading(false)
            }
        }
        getdata()
        
        // eslint-disable-next-line
    }, [temp,temp2])

    return (
        <>
        <NavBar></NavBar>
        <div className="d-flex">
            <div className="my-custom-add-post">
              <Link className="my-custom-add-post-link" to="/add-post">Add a Video</Link>
            </div>
        </div>
            {
                loading?<Loader></Loader>:
                !success?<div>Failed to load</div>:
                <div className="list">
                <ul>
                    {datalist.map(dataitem=>{ 
                   return <DataItem key={dataitem._id} currentUser={currentUser} dataitem={dataitem} temp2={temp2} settemp2={settemp2}></DataItem>
})}
                </ul>
                </div>
            }
        </>
    )
}

export default DataList