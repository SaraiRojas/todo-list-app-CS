import styles from './AddTaskBtn.module.css'
import {useTask} from '../../context/TaskContext'

const AddTaskBtn = () => {

  const {setModalOpen} = useTask();

  const handleOnClick= () => setModalOpen(true)

  return <button className={styles.btn} onClick={handleOnClick}> + New Task</button>
}

export default AddTaskBtn
