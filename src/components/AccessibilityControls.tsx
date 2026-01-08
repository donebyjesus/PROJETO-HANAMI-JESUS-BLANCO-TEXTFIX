import { useState, useEffect } from 'react'
import { ZoomIn, ZoomOut, Contrast, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Componente AccessibilityControls
 * 
 * Implementa controles de acessibilidade conforme WCAG 2.1 AA/AAA:
 * - Ajuste de tamanho de fonte (8px a 100px)
 * - Modo de alto contraste (preto e branco puro)
 * - Modo escala de cinza (grayscale)
 * 
 * Persistência: localStorage
 * Conformidade: WCAG 2.1 Level AA
 */
export function AccessibilityControls() {
    const [fontSize, setFontSize] = useState(16)
    const [highContrast, setHighContrast] = useState(false)
    const [grayscale, setGrayscale] = useState(false)

    // Carrega preferências salvas ao montar
    useEffect(() => {
        const savedFontSize = localStorage.getItem('accessibility-font-size')
        const savedHighContrast = localStorage.getItem('accessibility-high-contrast')
        const savedGrayscale = localStorage.getItem('accessibility-grayscale')

        if (savedFontSize) {
            const size = parseInt(savedFontSize)
            setFontSize(size)
            applyFontSize(size)
        }

        if (savedHighContrast === 'true') {
            setHighContrast(true)
            applyHighContrast(true)
        }

        if (savedGrayscale === 'true') {
            setGrayscale(true)
            applyGrayscale(true)
        }
    }, [])

    /**
     * Aplica tamanho de fonte ao documento
     * Atualiza o fontSize do body e a variável CSS
     */
    const applyFontSize = (size: number) => {
        // Aplica ao body para afetar todo o documento
        document.body.style.fontSize = `${size}px`
        // Também define a variável CSS para uso em componentes
        document.documentElement.style.setProperty('--base-font-size', `${size}px`)
    }

    /**
     * Aplica modo de alto contraste
     * Adiciona classe .high-contrast ao body
     */
    const applyHighContrast = (enabled: boolean) => {
        if (enabled) {
            document.body.classList.add('high-contrast')
            // Remove grayscale se estiver ativo
            document.body.classList.remove('grayscale')
            setGrayscale(false)
            localStorage.setItem('accessibility-grayscale', 'false')
        } else {
            document.body.classList.remove('high-contrast')
        }
    }

    /**
     * Aplica modo escala de cinza
     * Adiciona classe .grayscale ao body
     */
    const applyGrayscale = (enabled: boolean) => {
        if (enabled) {
            document.body.classList.add('grayscale')
            // Remove high-contrast se estiver ativo
            document.body.classList.remove('high-contrast')
            setHighContrast(false)
            localStorage.setItem('accessibility-high-contrast', 'false')
        } else {
            document.body.classList.remove('grayscale')
        }
    }

    /**
     * Aumenta o tamanho da fonte
     * Limite máximo: 100px
     */
    const increaseFontSize = () => {
        const newSize = Math.min(fontSize + 2, 100)
        setFontSize(newSize)
        applyFontSize(newSize)
        localStorage.setItem('accessibility-font-size', newSize.toString())
    }

    /**
     * Diminui o tamanho da fonte
     * Limite mínimo: 8px
     */
    const decreaseFontSize = () => {
        const newSize = Math.max(fontSize - 2, 8)
        setFontSize(newSize)
        applyFontSize(newSize)
        localStorage.setItem('accessibility-font-size', newSize.toString())
    }

    /**
     * Alterna modo de alto contraste
     */
    const toggleHighContrast = () => {
        const newState = !highContrast
        setHighContrast(newState)
        applyHighContrast(newState)
        localStorage.setItem('accessibility-high-contrast', newState.toString())
    }

    /**
     * Alterna modo escala de cinza
     */
    const toggleGrayscale = () => {
        const newState = !grayscale
        setGrayscale(newState)
        applyGrayscale(newState)
        localStorage.setItem('accessibility-grayscale', newState.toString())
    }

    return (
        <div
            className="flex items-center gap-1 sm:gap-2"
            role="toolbar"
            aria-label="Controles de acessibilidade"
        >
            {/* Diminuir Fonte */}
            <Button
                variant="ghost"
                size="sm"
                onClick={decreaseFontSize}
                disabled={fontSize <= 8}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-primary/10"
                title={`Diminuir tamanho da fonte (atual: ${fontSize}px)`}
                aria-label={`Diminuir tamanho da fonte. Tamanho atual: ${fontSize} pixels`}
            >
                <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Indicador de Tamanho */}
            <span
                className="text-xs font-medium text-muted-foreground min-w-[2.5rem] text-center hidden sm:inline"
                aria-live="polite"
                aria-atomic="true"
            >
                {fontSize}px
            </span>

            {/* Aumentar Fonte */}
            <Button
                variant="ghost"
                size="sm"
                onClick={increaseFontSize}
                disabled={fontSize >= 100}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-primary/10"
                title={`Aumentar tamanho da fonte (atual: ${fontSize}px)`}
                aria-label={`Aumentar tamanho da fonte. Tamanho atual: ${fontSize} pixels`}
            >
                <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Divisor */}
            <div className="w-px h-6 bg-border mx-1 hidden sm:block" aria-hidden="true" />

            {/* Alto Contraste */}
            <Button
                variant={highContrast ? "default" : "ghost"}
                size="sm"
                onClick={toggleHighContrast}
                className={`h-8 w-8 sm:h-9 sm:w-9 p-0 ${highContrast
                    ? 'bg-foreground text-background hover:bg-foreground/90'
                    : 'hover:bg-primary/10'
                    }`}
                title={highContrast ? "Desativar alto contraste" : "Ativar alto contraste (preto e branco)"}
                aria-label={`${highContrast ? 'Desativar' : 'Ativar'} modo de alto contraste`}
                aria-pressed={highContrast}
            >
                <Contrast className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Escala de Cinza */}
            <Button
                variant={grayscale ? "default" : "ghost"}
                size="sm"
                onClick={toggleGrayscale}
                className={`h-8 w-8 sm:h-9 sm:w-9 p-0 ${grayscale
                    ? 'bg-neutral-600 text-white hover:bg-neutral-700'
                    : 'hover:bg-primary/10'
                    }`}
                title={grayscale ? "Desativar escala de cinza" : "Ativar escala de cinza"}
                aria-label={`${grayscale ? 'Desativar' : 'Ativar'} modo escala de cinza`}
                aria-pressed={grayscale}
            >
                <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Indicador de Status (Screen Reader) */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {highContrast && "Modo de alto contraste ativado"}
                {grayscale && "Modo escala de cinza ativado"}
                {!highContrast && !grayscale && "Modo de cores normal"}
            </div>
        </div>
    )
}
