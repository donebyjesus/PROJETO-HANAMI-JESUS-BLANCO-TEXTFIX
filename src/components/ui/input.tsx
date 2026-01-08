import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    onValidate?: (value: string) => string | undefined
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, onValidate, onChange, ...props }, ref) => {
        const [validationError, setValidationError] = React.useState<string>()

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value

            // Validação em tempo real
            if (onValidate) {
                const errorMsg = onValidate(value)
                setValidationError(errorMsg)
            } else if (type) {
                // Validação automática baseada no tipo
                const errorMsg = validateByType(type, value)
                setValidationError(errorMsg)
            }

            onChange?.(e)
        }

        const displayError = error || validationError
        const hasError = Boolean(displayError)

        return (
            <div className="w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                        hasError && "border-destructive focus-visible:ring-destructive",
                        className
                    )}
                    ref={ref}
                    onChange={handleChange}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${props.id}-error` : undefined}
                    {...props}
                />
                {hasError && (
                    <p
                        id={`${props.id}-error`}
                        className="mt-1 text-sm text-destructive"
                        role="alert"
                    >
                        {displayError}
                    </p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

/**
 * Valida o valor do input baseado no tipo
 */
function validateByType(type: string, value: string): string | undefined {
    if (!value) return undefined

    switch (type) {
        case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(value)) {
                return "Por favor, insira um email válido"
            }
            break

        case "url":
            try {
                new URL(value)
            } catch {
                return "Por favor, insira uma URL válida (ex: https://exemplo.com)"
            }
            break

        case "number":
            if (isNaN(Number(value))) {
                return "Por favor, insira apenas números"
            }
            break

        case "tel":
            const phoneRegex = /^[\d\s\-\(\)\+]+$/
            if (!phoneRegex.test(value)) {
                return "Por favor, insira um telefone válido"
            }
            break
    }

    return undefined
}

export { Input }
