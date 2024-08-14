import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Statistic = ({numOfProperty,description,icon}) => {
    const [count, setCount] = useState(0);
    const targetCount = parseInt( numOfProperty); // Set the target count
    const duration = 2000; // Duration in milliseconds
    
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        let observer;
        if (elementRef.current) {
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            }, {
                threshold: 0.1, // Adjust the threshold as needed
            });

            observer.observe(elementRef.current);
        }

        return () => {
            if (observer && elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let start = 0;
        const end = targetCount;
        const increment = end / (duration / 50); // Calculate increment step
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.round(start));
            }
        }, 50);

        return () => clearInterval(timer);
    }, [hasStarted, targetCount, duration]);

    return (  
        <div className='statisticCard' ref={elementRef}>
            <div className='text-center'>
                <FontAwesomeIcon className='icon text-center' icon={icon} size="3x" color="#fd650b" />
            </div>
            <h2 className='statisticHeader'>{parseInt((count / 1000000).toFixed(1))}</h2>
            <p className='pl-5 text-center'>{description}</p>
        </div>
    );
}

export default Statistic;
