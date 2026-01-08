import { ToastProvider } from '@/components/ui/use-toast'
import { TextEditor } from '@/components/TextEditor'
import { QuickLinks } from '@/components/QuickLinks'
import { UnitConverter } from '@/components/UnitConverter'
import { Logo } from '@/components/Logo'
import { AccessibilityControls } from '@/components/AccessibilityControls'

function App() {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-background">
                {/* Header TextFix */}
                <header className="border-b bg-gradient-to-r from-primary/5 via-background to-secondary/5 backdrop-blur-sm sticky top-0 z-30 shadow-soft">
                    <div className="container mx-auto px-4 py-4 sm:py-6">
                        {/* Controles de Acessibilidade - Topo */}
                        <div className="flex justify-end mb-4">
                            <AccessibilityControls />
                        </div>

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

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    <div className="space-y-8 max-w-6xl mx-auto">
                        {/* TextEditor */}
                        <section>
                            <TextEditor />
                        </section>

                        {/* QuickLinks & UnitConverter em grid responsivo */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <QuickLinks />
                            <UnitConverter />
                        </section>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t mt-16 py-8 bg-gradient-to-r from-primary/5 to-secondary/5">
                    <div className="container mx-auto px-4 text-center">
                        <Logo size={120} className="mx-auto mb-4 opacity-60" />
                        <p className="text-sm text-muted-foreground">
                            Desenvolvido com ❤️ para máxima acessibilidade
                        </p>
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
