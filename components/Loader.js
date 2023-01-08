import styles from './loading.module.css'
export default function Loader() {
  return (
    <div className={styles['main-wrapper']} >
        <div className={styles['container']}>
            <div className={styles['circle']}></div>
            <div className={styles['circle']}></div>
            <div className={styles['circle']}></div>
            <div className={styles['shadow']}></div>
            <div className={styles['shadow']}></div>
            <div className={styles['shadow']}></div>
        </div>
    </div>
  )
}
