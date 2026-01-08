import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
    id: string
    title?: string
    description?: string
    variant?: "default" | "success" | "error" | "warning"
    duration?: number
    onClose: (id: string) => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ id, title, description, variant = "default", duration = 3000, onClose }, ref) => {
        React.useEffect(() => {
            const timer = setTimeout(() => {
                onClose(id)
            }, duration)

            return () => clearTimeout(timer)
        }, [id, duration, onClose])

        const variantStyles = {
            default: "bg-card border-border",
            success: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
            error: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
            warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
        }

        const iconColors = {
            default: "text-foreground",
            success: "text-green-600 dark:text-green-400",
            error: "text-red-600 dark:text-red-400",
            warning: "text-yellow-600 dark:text-yellow-400",
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all",
                    "animate-in slide-in-from-right-full",
                    variantStyles[variant]
                )}
                role="alert"
                aria-live="polite"
            >
                <div className="flex gap-3">
                    <div className="flex-1">
                        {title && (
                            <div className={cn("font-semibold text-sm mb-1", iconColors[variant])}>
                                {title}
                            </div>
                        )}
                        {description && (
                            <div className="text-sm opacity-90">
                                {description}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => onClose(id)}
                        className={cn(
                            "rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
                            iconColors[variant]
                        )}
                        aria-label="Fechar notificação"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        )
    }
)
Toast.displayName = "Toast"

export { Toast }
