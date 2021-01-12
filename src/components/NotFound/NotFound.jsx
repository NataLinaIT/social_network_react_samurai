import React from 'react'
import image from "../../assets/images/404.png"
import s from "./NotFound.module.css"

let NotFound = () => {
    return (
      <div className={s.notfound_wrapper}>
        <img src={image} alt="background"/>
        <div className={s.notFound}>404</div>
        <div className={s.title}>Oops! This Page is Not Found.</div>
        <div className={s.hilightText}>The requested page dose not exist.</div>
      </div>
    )
}

export default NotFound
