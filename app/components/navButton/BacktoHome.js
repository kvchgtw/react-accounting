'use client';
import React from "react";
import styles from './styles/BacktoHome.module.css'


const BacktoHome = () => {
    return (
        <div className={styles.BacktoHomeDiv}>
            <button className={styles.button} onClick={()=> 
            window.location.href="/"
            }>返回首頁</button>
        </div>
    )
}

export default BacktoHome