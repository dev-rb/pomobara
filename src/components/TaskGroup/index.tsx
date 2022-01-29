import { createSelector } from '@reduxjs/toolkit';
import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useGetTasksQuery } from '../../redux/apis/tasksApi';
import { IRootState } from '../../redux/store';
import Task, { ITask, TaskStatus } from '../Task';

interface TaskGroupProps {
    groupTitle: string,
    tasks?: ITask[]
}

const makeSelectTasks = () =>
    createSelector(
        (state?: ITask[]) => state,
        (_: any, filter: string) => filter,
        (tasks, filter: string) => tasks?.filter((task) => { return TaskStatus[task.status] === filter }));

const TaskGroup = ({ groupTitle }: TaskGroupProps) => {

    const selectTasks = React.useMemo(makeSelectTasks, []);

    // const tasks = useSelector((state: IRootState) => selectTasks(state, groupTitle), shallowEqual);

    const { tasks = [], refetch } = useGetTasksQuery(undefined, {
        selectFromResult: ({ data }) => ({
            tasks: selectTasks(data, groupTitle)
        })
    });

    React.useEffect(() => {
        console.log(tasks)
    }, [tasks])

    return (
        <div className='w-full max-w-md h-fit flex flex-col gap-4 md:max-w-lg'>
            <div className='flex justify-between items-center'>
                <h1 className='text-white m-0 text-2xl font-semibold'>{groupTitle}</h1>
                <button className='bg-transparent outline-hidden border-none text-[#2881D9] font-normal'> View All </button>
            </div>
            <div className='w-full h-full flex flex-col gap-8'>
                {tasks && tasks.map((task) => <Task key={task.id} {...task} />)}
            </div>
        </div>
    );
}

export default TaskGroup;