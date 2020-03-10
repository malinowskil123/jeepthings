import React from 'react'
import defaultImg from '../../assets/default.png'
import './DisplayPost.css'

function DisplayPost(props) {
  return (
    <div className='DisplayPost'>
      <div className='display-post-header'>
        <h1 className='display-post-text'>{props.title}</h1>
      </div>
      <div className='display-post-content'>
        <img
          src={props.img || defaultImg}
          alt='item img'
          className='display-post-img'
        />
        <h1 className='display-post-text'>${props.price}</h1>
      </div>
    </div>
  )
}

export default DisplayPost
