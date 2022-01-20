import * as React from 'react';

const TaskModal = () => {
    return (
        <div className='max-w-lg w-screen bg-[#1C1E1F] max-h-[32rem] h-screen flex flex-col px-4 py-4 z-10 lg:px-6'>
            <div className='w-full flex items-center justify-center'>
                <h1 className='text-white text-2xl font-semibold'> Create a task </h1>
            </div>
            <div className='h-full w-full'>
                <label>
                    Task Title
                    <textarea></textarea>
                </label>

                <div>

                </div>

                <div>

                </div>

                <div>

                </div>

            </div>

        </div>
    );
}

export default TaskModal;