"use client"

import { useEffect, useState } from "react";
import { MotionDiv } from '@/lib/motion';

interface CountdownTimerProps {
    validUntil: Date | string | null;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ExpiredCountdown = ({ validUntil }: CountdownTimerProps) => {
    
    const calculateTimeLeft = () => {
        if (!validUntil) return null;

        const difference = new Date(validUntil).getTime() - new Date().getTime();
        let timeLeft = null;

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => validUntil ? calculateTimeLeft() : null);

    useEffect(() => {
        if (!validUntil) return;

        const calculateTimeLeftLocal = () => {
            const difference = new Date(validUntil).getTime() - new Date().getTime();
            let timeLeft = null;

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeftLocal());
        }, 1000);

        return () => clearInterval(timer);
    }, [validUntil]);

    if (!timeLeft) {
        return <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xl font-bold text-red-500">Promo has expired!</MotionDiv>;
    }

    const timeParts = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
    ];

    return (
        <MotionDiv className="flex justify-center gap-2 sm:gap-4 text-center" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            {timeParts.map((item, idx) => (
                <MotionDiv key={item.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg min-w-15 sm:min-w-17.5 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-800 dark:text-slate-100">
                        {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {item.label}
                    </div>
                </MotionDiv>
            ))}
        </MotionDiv>
    );
};

export default ExpiredCountdown;