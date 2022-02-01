import * as React from 'react';
import { Timer } from '../../util/timer';

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
        for (let i = 0; i < totalOccurences; i++) {
            if (focusCount % 4 === 0 && focusCount !== 0) {
                order.push('longBreakTime');
                focusCount = 0;
            }
            else if (i % 2 === 0) {

                order.push('focusTime');
                focusCount++;

            } else if (i % 2 !== 0) {
                order.push('shortBreakTime');
            }
        }
        // console.log(order)
        return order;
    }

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
    const [startTimings, setStartTimings] = React.useState<number[]>([]);
    const [time, setTime] = React.useState({ min: 0, seconds: 0 });

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

    const generateStartAngles = () => {
        let angles = [0];
        let totalOccurences = settings['focusTime'].occurences + settings['shortBreakTime'].occurences + settings['longBreakTime'].occurences;
        order.forEach((val) => {
            angles.push((((settings[val as keyof TimerSettings].length) / totalTime) * 100) + angles[angles.length - 1] + (65 / (totalOccurences / 4)))
        })
        // console.log(65 / (totalOccurences / 4))
        setStartAngles(angles);
    }

    const generateStartTimings = () => {
        let timings = [0];

        order.forEach((val) => {
            timings.push(settings[val as keyof TimerSettings].length + timings[timings.length - 1]);
        })
        setStartTimings(timings);
    }

    React.useEffect(() => {
        generateStartAngles();
        generateStartTimings();

    }, [])

    // React.useEffect(() => {
    //     console.log(startAngles)
    // }, [startAngles])

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

    const updateTime = (mins: number, seconds: number) => {
        setTime({ min: mins, seconds: seconds });
    }

    return (
        <svg viewBox='0 0 200 200' xmlns="http://www.w3.org/2000/svg" className='TestAnim'>
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
            <text x="50%" y="50%" textAnchor='middle' fill='white'>
                <tspan dominantBaseline='middle' fontSize={'2rem'} fontWeight={'400'} fontFamily='Open Sans'>{time.min < 10 ? "0" + time.min : time.min}:{time.seconds < 10 ? "0" + time.seconds : time.seconds} </tspan>
            </text>
            {startAngles.map((val, index) => {
                const style = {
                    '--start': `${startTimings[index] * 60}s`,
                    '--end': `${settings[order[index > 7 ? 0 : index] as keyof TimerSettings].length * 60}s`
                } as React.CSSProperties;
                return (
                    <TimerPath
                        key={val}
                        style={style}
                        strokeColor={getColorForTime(order[index])}
                        arc={describeArc(100, 100, 65, val, startAngles[index + 1])}
                        delay={startTimings[index] * 60}
                        duration={settings[order[index > 7 ? 0 : index] as keyof TimerSettings].length}
                        updateTime={updateTime}
                    />
                );
            })}

            {/* Focus Time */}
            {/* <circle className='relative stroke-focus-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={255} strokeDasharray={408.4070449667} /> */}
            {/* Short Break Time */}
            {/* <circle className='relative stroke-short-break-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={455} strokeDasharray={408.4070449667} /> */}
            {/* Long Break Time */}
            {/* <circle className='relative stroke-long-break-glow' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={305} strokeDasharray={408.4070449667} /> */}
        </svg>
    );
}

interface TimerPathProps {
    style: React.CSSProperties,
    strokeColor: string,
    arc: string,
    delay: number,
    duration: number,
    updateTime: (mins: number, seconds: number) => void
}

const TimerPath = ({ style, strokeColor, arc, delay, duration, updateTime }: TimerPathProps) => {

    const [currentAmount, setCurrentAmount] = React.useState(1);

    const updatePath = () => {
        let date = (new Date(timer.duration));
        // console.log("Raw Duration:", timer.duration)
        if (date.getMinutes() === 0) {
            console.log("Finished Timer");
            timer.stopTimer();
            return;
        }
        updateTime(date.getUTCMinutes(), date.getUTCSeconds());
        // console.log("Time", date.getUTCMinutes(), date.getUTCSeconds(), date.getMilliseconds())
        setCurrentAmount((prev) => prev + ((1 / 15)));
    }
    let timer = new Timer(1 * 60000, undefined, updatePath);

    React.useEffect(() => {
        // console.log(new Date(duration * 1000).getTime() / 1000)
        setTimeout(() => {
            timer.startTimer();
            console.log(`Delay: ${delay}, Fin`)
        }, delay * 1000)

        return () => {
            timer.stopTimer();
        }
    }, [])

    React.useEffect(() => {

        // console.log(currentAmount, timer.elapsedTime)
    }, [currentAmount])

    return (
        <path
            style={style}
            fill='none' strokeLinecap='round' strokeLinejoin='round'
            strokeDasharray={`${(15 - currentAmount) * 408.4070449667 / 100} 408.4070449667`} stroke={strokeColor}
            strokeWidth={1} d={arc} filter="url(#glow)" />
    );
}

export default PomoTimer;