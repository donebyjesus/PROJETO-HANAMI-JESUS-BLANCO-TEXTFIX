/**
 * Componente Logo TextFix
 * 
 * Exibe o logo da aplicação com tamanho responsivo
 * Pode ser usado no header, footer ou outras seções
 */

interface LogoProps {
    /** Tamanho do logo em pixels (largura) */
    size?: number
    /** Classe CSS adicional */
    className?: string
    /** Se deve mostrar apenas o ícone (sem texto) */
    iconOnly?: boolean
}

export function Logo({ size = 120, className = '' }: LogoProps) {
    return (
        <div className={`flex items-center ${className}`}>
            <img
                src="/logo-textfix.png"
                alt="Logo TextFix - Ferramenta premium de formatação de texto"
                style={{ width: `${size}px`, height: 'auto' }}
                className="object-contain"
            />
        </div>
    )
}
