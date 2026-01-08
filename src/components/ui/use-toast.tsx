import * as React from "react"
import { createPortal } from "react-dom"
import { Toast, ToastProps } from "./toast"

type ToastData = Omit<ToastProps, "onClose">

interface ToastContextType {
    toast: (data: Omit<ToastData, "id">) => void
    success: (title: string, description?: string) => void
    error: (title: string, description?: string) => void
    warning: (title: string, description?: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<ToastData[]>([])

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    const addToast = React.useCallback((data: Omit<ToastData, "id">) => {
        const id = Math.random().toString(36).substring(7)
        setToasts((prev) => [...prev, { ...data, id }])
    }, [])

    const toast = React.useCallback(
        (data: Omit<ToastData, "id">) => {
            addToast(data)
        },
        [addToast]
    )

    const success = React.useCallback(
        (title: string, description?: string) => {
            addToast({ title, description, variant: "success" })
        },
        [addToast]
    )

    const error = React.useCallback(
        (title: string, description?: string) => {
            addToast({ title, description, variant: "error" })
        },
        [addToast]
    )

    const warning = React.useCallback(
        (title: string, description?: string) => {
            addToast({ title, description, variant: "warning" })
        },
        [addToast]
    )

    return (
        <ToastContext.Provider value={{ toast, success, error, warning }}>
            {children}
            {createPortal(
                <div
                    className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-h-screen overflow-hidden pointer-events-none"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {toasts.map((toastData) => (
                        <Toast key={toastData.id} {...toastData} onClose={removeToast} />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = React.useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within ToastProvider")
    }
    return context
}
