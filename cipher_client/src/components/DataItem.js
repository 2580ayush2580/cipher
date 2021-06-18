import React from 'react'
const DataItem = ({dataitem,temp2,settemp2}) => {
    const {title, description, video}=dataitem

    return (
        <div className="dataitem-wrapper">
            <div className="details">
                <div className="detail-image">
                    <div className="answer">
                        <video alt={title} src={video} controls></video>
                    </div>
                </div>
                <div className="detail">
                    <div className="answer"> <span className="black-color">Title: </span> {title} <br></br>
                    <span className="black-color">Description: </span> {description}</div>
                </div>
            </div>
        </div>
    )
}

export default DataItem
