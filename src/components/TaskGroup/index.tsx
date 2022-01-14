import * as React from 'react';
import styles from './taskgroup.module.css';

const TaskGroup = () => {
    return (
        <div className={styles.taskGroup}>
            <div className={styles.groupHeader}>
                <h1>Ongoing</h1>
                <button> View All </button>
            </div>
            <div className={styles.groupTasks}>

            </div>
        </div>
    );
}

export default TaskGroup;