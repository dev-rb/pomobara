import * as React from 'react';

interface TimerSettings {
    focusTime: { length: number, occurences: number },
    shortBreakTime: { length: number, occurences: number },
    longBreakTime: { length: number, occurences: number }
}

const defaultSettings: TimerSettings = { focusTime: { length: 25, occurences: 4, }, shortBreakTime: { length: 5, occurences: 3 }, longBreakTime: { length: 15, occurences: 1 } };

const timeColors: { [key: string]: string } = {
    'focusTime': '#D92828',
    'shortBreakTime': '#FFF',
    'longBreakTime': '#2881D9'
}

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
        let order: string[] = [];

        let totalOccurences = timerSettings['focusTime'].occurences + timerSettings['shortBreakTime'].occurences + timerSettings['longBreakTime'].occurences;

        let focusCount = 0;
        // console.log(timerSettings[order[0] as keyof TimerSettings])
        for (let i = 0; i < totalOccurences; i++) {
            if (focusCount % 4 === 0 && focusCount !== 0) {
                order.push('longBreakTime');
                focusCount = 0;
            }
            else if (i % 2 === 0) {
                // console.log(i)

                order.push('focusTime');
                focusCount++;

            } else if (i % 2 !== 0) {
                order.push('shortBreakTime');
            }
        }

        console.log(order)

        return order;
    }

    React.useEffect(() => {
        // console.log(getTotalTime)
        createOrderOfTimes()

    }, [])


    return (
        <div className='w-full h-full max-w-2xl'>
            <TimerDisplay order={createOrderOfTimes()} settings={timerSettings} totalTime={getTotalTime} />
        </div>
    );
}

interface DisplayProps {
    order: string[],
    settings: TimerSettings,
    totalTime: number
}

const TimerDisplay = ({ order, settings, totalTime }: DisplayProps) => {

    const [startAngles, setStartAngles] = React.useState<number[]>([]);
    // const [angles, setAngles] = React.useState<number[]>([]);

    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    React.useEffect(() => {
        let startAngles = [0];
        let totalOccurences = settings['focusTime'].occurences + settings['shortBreakTime'].occurences + settings['longBreakTime'].occurences;
        order.forEach((val) => {
            startAngles.push(((settings[val as keyof TimerSettings].length) / totalTime) * 100 + startAngles[startAngles.length - 1] + 65 / (totalOccurences / 4))
            // setAngles((prev) => [...prev, ((settings[val as keyof TimerSettings].length) / totalTime) * 1000])
        })
        // startAngles.shift();
        setStartAngles(startAngles)
    }, [])

    React.useEffect(() => {
        console.log(startAngles)
        // console.log(angles)
    }, [startAngles])

    const getColorForTime = (time: string) => {
        return timeColors[time]
    }

    function makeRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <svg viewBox='0 0 200 200' xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id='glow' x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur className='blur' result='coloredBlur' stdDeviation={2} />
                    <feMerge>
                        <feMergeNode in='coloredBlur' />
                        <feMergeNode in='coloredBlur' />
                        <feMergeNode in='SourceGraphic' />
                    </feMerge>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="58" fill='#151718' stroke="#242627" strokeWidth={1} />

            {startAngles.map((val, index) => <path fill='none' stroke={getColorForTime(order[index])} strokeWidth={1} d={describeArc(100, 100, 65, val, startAngles[index + 1])} filter="url(#glow)" />)}

            {/* Focus Time */}
            {/* <circle className='relative stroke-focus-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={255} strokeDasharray={408.4070449667} /> */}
            {/* Short Break Time */}
            {/* <circle className='relative stroke-short-break-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={455} strokeDasharray={408.4070449667} /> */}
            {/* Long Break Time */}
            {/* <circle className='relative stroke-long-break-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={305} strokeDasharray={408.4070449667} /> */}
        </svg>
    );
}

export default PomoTimer;