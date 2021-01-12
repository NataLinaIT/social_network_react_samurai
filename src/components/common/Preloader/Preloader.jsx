import React from 'react'
import style from './Preloader.module.css'


let Preloader = () => {

  return (
    <div className={style.loader_container}>
      <div className={style.loader}></div>
    </div>
  )
}

export default Preloader
