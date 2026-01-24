/**
 * Haptic feedback for mobile devices
 * Uses Vibration API for Android and navigator.vibrate
 */
export function useHapticFeedback() {
    const trigger = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') => {
        // Check if vibration is supported
        if (!('vibrate' in navigator)) return;

        const patterns: Record<string, number | number[]> = {
            light: 10,
            medium: 25,
            heavy: 50,
            success: [10, 50, 10], // Double tap for success
            error: [50, 30, 50, 30, 50], // Triple long for error
        };

        try {
            navigator.vibrate(patterns[type] || 10);
        } catch (e) {
            // Silently fail if vibration not available
        }
    };

    return { trigger };
}

/**
 * HOC wrapper to add haptic feedback to onClick
 */
export function withHaptic<T extends { onClick?: (...args: unknown[]) => void }>(
    props: T,
    type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light'
): T {
    const originalOnClick = props.onClick;

    return {
        ...props,
        onClick: (...args: unknown[]) => {
            // Trigger haptic
            if ('vibrate' in navigator) {
                const patterns: Record<string, number | number[]> = {
                    light: 10,
                    medium: 25,
                    heavy: 50,
                    success: [10, 50, 10],
                    error: [50, 30, 50, 30, 50],
                };
                try { navigator.vibrate(patterns[type] || 10); } catch (e) { /* ignore */ }
            }
            // Call original handler
            originalOnClick?.(...args);
        },
    };
}
