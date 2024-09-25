import React from 'react'
import download from '../utils/index'
import downloadPng from '../assets/download.png'
const Card = (props) => {
  return (
    <div className='rounded-xl relative shadow-card hover:shadow-cardhover'>
        <img src={props.photo} alt="hello" className="relati size-36 object-cover rounded-xl" />
        <div onClick={()=>download(props.key,props.photo)} class="cursor-pointer absolute bottom-2 left-24 z-10">
                <img src={downloadPng} class="size-7" alt='download'/>
        </div>
    </div>
  )
}

export default Card