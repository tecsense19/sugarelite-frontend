"use client"
// useSwipe.js
import { useEffect, useRef } from 'react';

const useSwipe = (callback) => {
    const swipeRef = useRef(null);

    useEffect(() => {
        const Hammer = require("hammerjs")
        const handlePan = (event) => {
            callback({
                deltaX: event.deltaX,
                deltaY: event.deltaY
            });
        };

        const hammer = new Hammer(swipeRef.current);
        hammer.on('pan', handlePan);

        return () => {
            hammer.off('pan', handlePan);
        };
    }, [callback]);

    return swipeRef;
};

export default useSwipe;
