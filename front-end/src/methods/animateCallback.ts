/**
 * Call a callback for every animation frame for a given duration.
 */
export function animateCallback(callback: (t: number) => void, duration: number) {
    const startTime = Date.now();
    function animate() {
        const elapsed = Date.now() - startTime;
        callback(Math.min(elapsed / duration, 1))
        if (elapsed < duration) {
            window.requestAnimationFrame(animate);
        }
    }
    animate();
}