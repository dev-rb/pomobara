import * as React from 'react';
import styles from './level.module.css';

const initial = 408.4070449667
const need = 200;


const Level = () => {

    const [currentXp, setCurrentXp] = React.useState(initial);
    const [currentLvl, setCurrentLvl] = React.useState(1);
    // current / totalXp

    React.useEffect(() => {
        setTimeout(() => {
            setCurrentXp(408.4070449667 * (1 - 0.5));


        }, 1000)

        let localCount = currentLvl;
        let speed = 200;
        let count = function () {
            if (need - localCount > 20) {
                speed -= 10;
            }

            if (localCount != need) {
                setCurrentLvl((prev) => prev + 1);
                localCount++;
                setTimeout(count, speed)
            }
        }
        setTimeout(count, speed)
    }, [])


    return (
        <div className='relative max-w-xs w-full h-fit lg:col-start-1  before:w-2/5 before:h-2/5 before:absolute before:left-[30%] before:top-[2%] before:-z-[1] before:bg-level-bara before:bg-cover'>
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
                <text x="45%" y="50%" textAnchor='middle' fill='#777777'>
                    <tspan alignmentBaseline='text-before-edge' fontSize={'0.7rem'} fontWeight={'400'} fontFamily='Open Sans'>lvl. </tspan>
                    <tspan alignmentBaseline='central' fontSize={'3rem'} fontWeight={'600'} fontFamily='Open Sans' dy='-.14em'>{currentLvl}</tspan>
                </text>

                <circle className='relative stroke-level-glow-color' cx="100" cy="100" r="65" transform='rotate(-90 100 100)' style={{ transition: 'stroke-dashoffset 1.5s ease' }} filter="url(#glow)" fill='transparent' strokeWidth={2} strokeDashoffset={currentXp} strokeDasharray={408.4070449667} />
            </svg>
        </div>
    );
}

export default Level;