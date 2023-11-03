import styles from './page.module.css'
import GotoAccounting from './components/navButton/GotoAccounting'
import Database from './components/database/database'

export default function Home() {
  return (
  <div>  
    <div className={styles.heading}><h1 className={styles.h1}>React 練習專案</h1></div>
    <div className={styles.welcome}><h2>歡迎光臨我的頁面</h2></div>
    <div className={styles.buttonDiv}><GotoAccounting /></div>
    <div><Database /></div>
  </div>
  )
}
