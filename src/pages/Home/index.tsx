import * as React from 'react';
import { MdAdd } from 'react-icons/md';
import Level from '../../components/Level';
import TaskGroup from '../../components/TaskGroup';
import styles from './home.module.css';

const Home = () => {
    return (
        <div className='w-full h-full grid grid-cols-1 grid-rows-[20rem 1fr] justify-items-center pb-32 lg:grid-cols-3 lg:col-span-1 lg:row-span-1 lg:pt-16 lg:pb-0'>
            <Level />
            <div className='w-full h-auto flex flex-col items-center gap-8 row-span-2 lg:col-start-2 lg:row-span-1'>
                <TaskGroup />
                <TaskGroup />
                <TaskGroup />
            </div>
            <button className='w-3/5 h-12 bg-blue-600 justify-center items-center gap-4 text-xl text-white outline-none border-none hidden lg:flex'> <MdAdd size={35} color="white" /> Add Task </button>
        </div>
    );
}

export default Home;