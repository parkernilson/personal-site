interface AnimateCallbackOptions {
    duration: number | "infinite",
    easing?: (t: number)=>number
}

/**
 * Call a callback for every animation frame for a given duration.
 */
export function animateCallback(callback: (t: number, x: number, elapsed: number) => void, {duration, easing}: AnimateCallbackOptions) {
    return new Promise<void>((resolve, reject) => {
        const startTime = Date.now();

        function animate() {
            // determine elapsed time
            const elapsed = Date.now() - startTime;

            if (duration === "infinite") {
                const t = null;
                const x = null;
                callback(t, x, elapsed);
                window.requestAnimationFrame(animate);
            } else {
                // t is the percentage of time that has elapsed formatted in range [0, 1]
                const t = Math.min(elapsed / duration, 1);
                // call the callback with t, and with x which is t passed through the easing function. If no easing function is given, pass t as x
                callback(t, easing ? easing(t) : t, elapsed);

                // if the animation is not complete, request another animation frame
                if (elapsed < duration) {
                    window.requestAnimationFrame(animate);
                } else {
                    // if complete, resolve the promise
                    resolve();
                }
            }
        }

        animate();
    })
}