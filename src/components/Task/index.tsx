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
        <div className='w-full bg-[#1C1E1F] flex flex-col justify-center items-center py-3 px-4 gap-4 rounded-md'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='max-w-[15rem] text-white text-xl font-semibold m-0 text-ellipsis whitespace-nowrap overflow-hidden'> {text} </h2>
                <div className={`${styles.status} w-2 h-2 rounded-full`} style={style} />
            </div>

            <div className='w-full flex items-center gap-4 text-[#737A7E] text-[0.825rem]'>
                <FiClock size={20} color={'#737A7E'} />
                <p className='m-0'> {due} </p>
            </div>
        </div>
    );
}

export default Task;