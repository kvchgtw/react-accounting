'use client';

import React from "react";
import styles from './styles/GotoAccounting.module.css'

const GotoAccounting = () => {
    return (
        <button className={styles.button} onClick={()=> 
        window.location.href="/accounting"
        }>點此開始</button>
    )
}

export default GotoAccounting