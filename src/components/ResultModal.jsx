import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import './ResultModal.css'
const ResultModal = forwardRef(({remainingTime, targetTime, onReset}, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        }
    }));

    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const userLost = remainingTime <= 0;
    const score = Math.round((1 - remainingTime / (targetTime*1000)) * 100);

    return (
        <dialog className='result-model' ref={dialog}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method='dialog' onSubmit={onReset}> 
                <button>Close</button>
            </form>
        </dialog>
    )
});

export default ResultModal