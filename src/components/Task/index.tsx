import * as React from 'react';
import { FiClock } from 'react-icons/fi';
import styles from './task.module.css';

export enum TaskStatus {
    'Completed',
    'Ongoing',
    'Not Started'
}

export interface ITask {
    text: string,
    due: string,
    status: TaskStatus
}

const statusColors = {
    0: '#3AD928',
    1: '#D98C28',
    2: '#D92828'
}

const Task = ({ text, due, status }: ITask) => {

    const style = { '--statusColor': statusColors[status] } as React.CSSProperties;

    return (
        <div className={styles.taskContainer}>
            <div className={styles.taskInfo}>
                <h2> {text} </h2>
                <div className={styles.status} style={style} />
            </div>

            <div className={styles.taskDue}>
                <FiClock size={20} color={'#737A7E'} />
                <p> {due} </p>
            </div>
        </div>
    );
}

export default Task;