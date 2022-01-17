import * as React from 'react';
import Task, { TaskStatus } from '../Task';
import styles from './taskgroup.module.css';

const TaskGroup = () => {
    return (
        <div className='w-full max-w-md h-fit flex flex-col gap-4 md:max-w-lg'>
            <div className='flex justify-between items-center'>
                <h1 className='text-white m-0 text-2xl font-semibold'>Ongoing</h1>
                <button className='bg-transparent outline-hidden border-none text-[#2881D9] font-normal'> View All </button>
            </div>
            <div className='w-full h-full fllex flex-col gap-8'>
                <Task id='' due='AAA' status={TaskStatus.Completed} text='Class Essay sad as das da dasd s aaaaa' />
            </div>
        </div>
    );
}

export default TaskGroup;