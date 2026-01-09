import { ToastProvider } from '@/components/ui/use-toast'
import { TextEditor } from '@/components/TextEditor'

import { Logo } from '@/components/Logo'
import { AccessibilityControls } from '@/components/AccessibilityControls'

function App() {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-background">
                {/* Header TextFix */}
                <header className="border-b bg-gradient-to-r from-primary/5 via-background to-secondary/5 backdrop-blur-sm top-0 z-30 shadow-soft">
                    <div className="container mx-auto px-4 py-4 sm:py-6">
                        <div className="flex flex-col items-center justify-center gap-3">
                            {/* Logo TextFix */}
                            <Logo size={180} className="mb-2" />

                            {/* Tagline */}
                            <p className="text-sm sm:text-base text-muted-foreground font-medium text-center">
                                Ferramenta premium com alta acessibilidade
                            </p>
                        </div>
                    </div>
                </header>

                {/* Barra de Acessibilidade Flutuante */}
                <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 bg-white/90 backdrop-blur shadow-md rounded-lg p-2 border border-border">
                    <AccessibilityControls orientation="vertical" />
                </div>

                {/* Conteúdo Principal */}
                <main className="container mx-auto px-4 py-8">
                    <div className="space-y-8 max-w-6xl mx-auto">
                        {/* Editor de Texto */}
                        <section>
                            <TextEditor />
                        </section>
                    </div>
                </main>

                {/* Rodapé */}
                <footer className="border-t mt-16 py-8 bg-gradient-to-r from-primary/5 to-secondary/5">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-xs text-muted-foreground mt-2 font-medium">
                            © 2026 TextFix - Ferramenta Premium de Formatação de Texto
                        </p>
                    </div>
                </footer>
            </div>
        </ToastProvider>
    )
}

export default App
