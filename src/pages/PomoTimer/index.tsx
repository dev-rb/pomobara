import * as React from 'react';

interface TimerSettings {
    focusTime: { length: number, occurences: number },
    shortBreakTime: { length: number, occurences: number },
    longBreakTime: { length: number, occurences: number }
}

const defaultSettings: TimerSettings = { focusTime: { length: 25, occurences: 8, }, shortBreakTime: { length: 5, occurences: 7 }, longBreakTime: { length: 15, occurences: 1 } };

const PomoTimer = () => {

    const [timerSettings, setTimerSettings] = React.useState<TimerSettings>(defaultSettings);

    const getTotalTime = React.useMemo(() => {
        let totalTime = 0;

        Object.values(timerSettings).forEach((setting: { length: number, occurences: number }) => {
            totalTime += setting.length * setting.occurences;
        })

        return totalTime;
    }, [timerSettings])

    const createOrderOfTimes = () => {
        let totalTime = getTotalTime;

        let order: string[] = [];

        let focusOccurences = timerSettings['focusTime'].occurences;
        let shortOccurences = timerSettings['shortBreakTime'].occurences;
        let longOccurences = timerSettings['longBreakTime'].occurences;

        let totalOccurences = focusOccurences + shortOccurences + longOccurences;

        let focusCount = 0;

        // console.log(timerSettings[order[0] as keyof TimerSettings])

        for (let i = 1; i < totalOccurences + 1; i++) {
            if (focusCount % 4 === 0 && focusCount !== 0) {
                order.push('longBreakTime');
            }
            else if (i % 2 === 0) {
                console.log(i)
                order.push('focusTime');
                focusCount++;
            } else if (i % 3 === 0) {
                order.push('shortBreakTime');
            }
        }

        console.log(order)
        // f s f s f s f l
        // Object.entries(timerSettings).forEach((setting: [string, any]) => {
        //     console.log(setting[1])
        // })
    }

    React.useEffect(() => {
        console.log(getTotalTime)
        createOrderOfTimes()

    }, [])


    return (
        <div className='w-full h-full max-w-2xl'>
            <TimerDisplay />
        </div>
    );
}

const TimerDisplay = () => {
    return (
        <svg viewBox='0 0 200 200' xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id='glow'>
                    <feGaussianBlur className='blur' result='coloredBlur' stdDeviation={4} />
                    <feMerge>
                        <feMergeNode in='coloredBlur' />
                        <feMergeNode in='coloredBlur' />
                        <feMergeNode in='SourceGraphic' />
                    </feMerge>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="65" fill='#151718' stroke="#242627" strokeWidth={4} />

            {/* Focus Time */}
            <circle className='relative stroke-focus-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={255} strokeDasharray={408.4070449667} />
            {/* Short Break Time */}
            <circle className='relative stroke-short-break-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={455} strokeDasharray={408.4070449667} />
            {/* Long Break Time */}
            <circle className='relative stroke-long-break-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={305} strokeDasharray={408.4070449667} />
        </svg>
    );
}

export default PomoTimer;