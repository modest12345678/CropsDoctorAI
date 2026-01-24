import { useEffect, useState } from "react";
import { CheckCircle2, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessAnimationProps {
    show: boolean;
    message?: string;
    onComplete?: () => void;
}

/**
 * Celebratory success animation with confetti effect
 * Shows when plant is detected as "Healthy"
 */
export function SuccessAnimation({ show, message = "Healthy Plant!", onComplete }: SuccessAnimationProps) {
    const [visible, setVisible] = useState(false);
    const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

    useEffect(() => {
        if (show) {
            setVisible(true);
            // Generate confetti particles
            const particles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 0.5,
                color: ['#22c55e', '#10b981', '#34d399', '#fbbf24', '#f59e0b'][Math.floor(Math.random() * 5)],
            }));
            setConfetti(particles);

            // Trigger haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate([10, 50, 10]);
            }

            // Auto-hide after animation
            const timer = setTimeout(() => {
                setVisible(false);
                onComplete?.();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Confetti */}
            {confetti.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute animate-confetti"
                    style={{
                        left: `${particle.x}%`,
                        top: '-10px',
                        animationDelay: `${particle.delay}s`,
                    }}
                >
                    <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: particle.color }}
                    />
                </div>
            ))}

            {/* Success badge */}
            <div className={cn(
                "flex flex-col items-center gap-4 p-8 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl",
                "animate-in zoom-in-50 duration-300 backdrop-blur-sm border border-green-200 dark:border-green-800"
            )}>
                <div className="relative">
                    <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
                    <PartyPopper className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2 animate-wiggle" />
                </div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {message}
                </h2>
                <p className="text-muted-foreground text-center max-w-xs">
                    Your plant looks healthy! Keep up the great work! 🌱
                </p>
            </div>
        </div>
    );
}
