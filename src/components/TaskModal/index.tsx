import * as React from 'react';
import styles from './taskmodal.module.css';
import { FiCalendar, FiClock } from 'react-icons/fi';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

const CustomDateInput = React.forwardRef(({ onClick, id, onChange, value }: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
        <div className='w-full bg-transparent border-2 border-[#474D4E] h-[3rem] rounded-md flex items-center px-2 gap-4' onClick={onClick} id={id} onChange={onChange} ref={ref} >
            <FiCalendar size={25} color='#454C4F' />
            {value}
        </div>
    )
});

const CustomTimeInput = React.forwardRef(({ onClick, id, onChange, value }: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
        <div className='w-full bg-transparent border-2 border-[#474D4E] h-[3rem] rounded-md flex items-center px-2 gap-4' onClick={onClick} id={id} onChange={onChange} ref={ref} >
            <FiClock size={25} color='#454C4F' />
            {value}
        </div>
    )
});


const TaskModal = () => {

    const [taskText, setTaskText] = React.useState("");
    const [taskDate, setTaskDate] = React.useState<Date | null>(null);
    const [taskTime, setTaskTime] = React.useState<Date | null>(null);
    const [taskStatus, setTaskStatus] = React.useState('Not Started');

    return (
        <div className='max-w-md w-screen bg-[#1C1E1F] max-h-[42rem] h-screen flex flex-col px-4 py-4 pt-8 z-10 lg:px-8 lg:max-w-2xl'>
            <div className='w-full flex items-center justify-center'>
                <h1 className='text-white text-2xl font-semibold'> Create a task </h1>
            </div>
            <div className='h-full w-full flex flex-col gap-8 mt-4 text-[#596367] text-base'>
                <div className='flex flex-col'>
                    <h6> Task Title </h6>
                    <textarea className='bg-[#2E3234] mt-2 resize-none text-white outline-none focus:outline-[#596367] focus:outline-[1px] min-h-[5rem] rounded-md p-2'></textarea>
                </div>

                <div className='flex flex-col w-full'>
                    <h6> Date & Time </h6>
                    <div className='flex flex-row justify-between w-full mt-2'>
                        <ReactDatePicker id={"test"} wrapperClassName='!w-full flex-1 max-w-[45%]' customInput={<CustomDateInput />} value={taskDate?.toDateString()} onChange={(date) => setTaskDate(date)} />
                        <ReactDatePicker id={"test"} wrapperClassName='!w-full flex-1 max-w-[45%]' showTimeSelect showTimeSelectOnly dateFormat="h:mm aa" customInput={<CustomTimeInput />} timeIntervals={15} value={taskTime?.toLocaleTimeString()} onChange={(date) => setTaskTime(date)} />
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <h6> Status of Task </h6>
                    <div className='flex flex-row justify-between gap-8 mt-4'>
                        <button className={`${taskStatus === 'Not Started' ? styles.active : styles.inactive} flex items-center justify-center w-40 p-3 rounded-md`} onClick={() => setTaskStatus('Not Started')}>
                            Not Started
                        </button>

                        <button className={`${taskStatus === 'Ongoing' ? styles.active : styles.inactive} flex items-center justify-center w-40 p-3 rounded-md`} onClick={() => setTaskStatus('Ongoing')}>
                            Ongoing
                        </button>

                        <button className={`${taskStatus === 'Complete' ? styles.active : styles.inactive} flex items-center justify-center w-40 p-3 rounded-md`} onClick={() => setTaskStatus('Complete')}>
                            Complete
                        </button>
                    </div>
                </div>

                <div className='flex justify-center border-t-2 border-t-[#2E3234] w-full p-12 mt-12'>
                    <button className='flex items-center justify-center text-white bg-[#2881D9] w-full h-14 rounded-lg text-xl lg:text-2xl'> Save </button>
                </div>

            </div>

        </div>
    );
}

export default TaskModal;