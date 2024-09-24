import React from 'react'
import download from '../utils/index'
const Card = (props) => {
  return (
    <div className='rounded-xl relative shadow-card hover:shadow-cardhover'>
        <img src={props.photo} alt="hello" className="w-full h-auto object-cover rounded-xl" />
        <div onClick={()=>download(props.key,props.photo)} class="cursor-pointer p-2 border border-gray-300 bg-blue-500 text-white w-1/2 rounded-md m-2">
                download
        </div>
    </div>
  )
}

export default Card