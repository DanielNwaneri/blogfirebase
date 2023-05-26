import React from 'react'
import ReactDOM  from 'react-dom';
import loadingGif from '../Asset/loadinggif-icon.jpg';


const LoadingGif = () => {
    return ReactDOM.createPortal(
        <div className= 'wrapper'>
          <div className='loader'>
        <img src={loadingGif} alt='loading gif' width={200} />
          </div>
        </div>,
        document.getElementById('loading')
      )
}

export default LoadingGif;