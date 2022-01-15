import * as React from 'react';
import { MdAdd } from 'react-icons/md';
import Level from '../../components/Level';
import TaskGroup from '../../components/TaskGroup';
import styles from './home.module.css';

const Home = () => {
    return (
        <div className='w-full h-full grid grid-cols-1 grid-rows-[20rem 1fr] lg:grid-cols-3 '>
            <Level />
            <div className={styles.taskGroups}>
                <TaskGroup />
                <TaskGroup />
                <TaskGroup />
            </div>
            <button className={styles.newTaskButton}> <MdAdd size={35} color="white" /> Add Task </button>
        </div>
    );
}

export default Home;