import { ToastProvider } from '@/components/ui/use-toast'
import { TextEditor } from '@/components/TextEditor'
import { QuickLinks } from '@/components/QuickLinks'
import { UnitConverter } from '@/components/UnitConverter'

function App() {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-30">
                    <div className="container mx-auto px-4 py-4">
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            🌸 Hanami Micro-SaaS
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Ferramentas premium com alta acessibilidade
                        </p>
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
                <footer className="border-t mt-16 py-8 bg-card/30">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Desenvolvido com ❤️ para máxima acessibilidade
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            © 2026 Hanami Micro-SaaS. Todos os direitos reservados.
                        </p>
                    </div>
                </footer>
            </div>
        </ToastProvider>
    )
}

export default App
