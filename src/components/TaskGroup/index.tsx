import * as React from 'react';
import Task, { TaskStatus } from '../Task';
import styles from './taskgroup.module.css';

const TaskGroup = () => {
    return (
        <div className={styles.taskGroup}>
            <div className={styles.groupHeader}>
                <h1>Ongoing</h1>
                <button> View All </button>
            </div>
            <div className={styles.groupTasks}>
                <Task due='AAA' status={TaskStatus.Completed} text='Class Essay sad as das da dasd s aaaaa' />
            </div>
        </div>
    );
}

export default TaskGroup;