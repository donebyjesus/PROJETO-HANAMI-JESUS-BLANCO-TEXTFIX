import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    Type,
    Copy,
    Trash2,
    Check,
    BookOpen,
    MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

/**
 * Componente principal do editor de texto Hanami
 * Fornece formatação de texto com alta acessibilidade
 */
export function TextEditor() {
    const [text, setText] = useState('')
    const [copied, setCopied] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Carrega o texto salvo do localStorage ao montar o componente
    useEffect(() => {
        const savedText = localStorage.getItem('hanami-text')
        if (savedText) {
            setText(savedText)
        }
        // Auto-focus no textarea para acessibilidade
        textareaRef.current?.focus()
    }, [])

    // Salva o texto no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem('hanami-text', text)
    }, [text])

    /**
     * Converte todo o texto para MAIÚSCULAS
     */
    const handleUppercase = () => {
        setText(text.toUpperCase())
    }

    /**
     * Converte todo o texto para minúsculas
     */
    const handleLowercase = () => {
        setText(text.toLowerCase())
    }

    /**
     * Converte a primeira letra de cada frase para maiúscula
     * Mantém o resto em minúsculas
     */
    const handleSentenceCase = () => {
        const result = text
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase())
        setText(result)
    }

    /**
     * Remove espaços extras entre palavras e quebras de linha duplas
     * Mantém apenas um espaço entre palavras e uma quebra de linha entre parágrafos
     */
    const handleRemoveExtraSpaces = () => {
        const result = text
            .replace(/[ \t]+/g, ' ') // Remove espaços e tabs extras
            .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove quebras de linha triplas ou mais
            .trim()
        setText(result)
    }

    /**
     * Limpa todo o conteúdo do editor
     */
    const handleClear = () => {
        setText('')
        textareaRef.current?.focus()
    }

    /**
     * Copia o texto para a área de transferência
     * Mostra feedback visual por 2 segundos
     */
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Erro ao copiar texto:', err)
        }
    }

    /**
     * Calcula estatísticas do texto
     */
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
    const charCount = text.length
    // Estimativa: 200 palavras por minuto
    const readingTime = Math.ceil(wordCount / 200)

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                        <CardTitle className="flex items-center gap-3 text-3xl">
                            <Type className="w-8 h-8" aria-hidden="true" />
                            <span>Hanami Text Formatter</span>
                        </CardTitle>
                        <p className="text-white/90 mt-2">
                            Formatador de texto premium com alta acessibilidade
                        </p>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        {/* Área de texto principal */}
                        <div>
                            <label htmlFor="text-editor" className="sr-only">
                                Área de edição de texto
                            </label>
                            <Textarea
                                id="text-editor"
                                ref={textareaRef}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Cole ou digite seu texto aqui..."
                                className="min-h-[300px] text-base resize-y"
                                aria-label="Editor de texto principal"
                                aria-describedby="text-stats"
                            />
                        </div>

                        {/* Barra de estatísticas */}
                        <div
                            id="text-stats"
                            className="flex flex-wrap gap-3"
                            role="status"
                            aria-live="polite"
                        >
                            <Badge
                                variant="outline"
                                className="text-sm px-4 py-2"
                                aria-label={`${wordCount} palavras`}
                            >
                                <MessageSquare className="w-4 h-4 mr-2" aria-hidden="true" />
                                {wordCount} Palavras
                            </Badge>
                            <Badge
                                variant="outline"
                                className="text-sm px-4 py-2"
                                aria-label={`${charCount} caracteres`}
                            >
                                <Type className="w-4 h-4 mr-2" aria-hidden="true" />
                                {charCount} Caracteres
                            </Badge>
                            <Badge
                                variant="outline"
                                className="text-sm px-4 py-2"
                                aria-label={`Tempo de leitura estimado: ${readingTime} ${readingTime === 1 ? 'minuto' : 'minutos'}`}
                            >
                                <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" />
                                {readingTime} min de leitura
                            </Badge>
                        </div>

                        {/* Barra de ações de formatação */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Ações de Formatação
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    onClick={handleUppercase}
                                    variant="outline"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Converter texto para maiúsculas"
                                    className="hover:scale-105 transition-transform"
                                >
                                    MAIÚSCULAS
                                </Button>
                                <Button
                                    onClick={handleLowercase}
                                    variant="outline"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Converter texto para minúsculas"
                                    className="hover:scale-105 transition-transform"
                                >
                                    minúsculas
                                </Button>
                                <Button
                                    onClick={handleSentenceCase}
                                    variant="outline"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Converter primeira letra de cada frase para maiúscula"
                                    className="hover:scale-105 transition-transform"
                                >
                                    Primeira Letra em Maiúscula
                                </Button>
                                <Button
                                    onClick={handleRemoveExtraSpaces}
                                    variant="outline"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Remover espaços extras e quebras de linha duplas"
                                    className="hover:scale-105 transition-transform"
                                >
                                    Remover Espaços Extras
                                </Button>
                                <Button
                                    onClick={handleClear}
                                    variant="destructive"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Limpar todo o texto"
                                    className="hover:scale-105 transition-transform"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" />
                                    Limpar Tudo
                                </Button>
                            </div>
                        </div>

                        {/* Botão de copiar */}
                        <div className="pt-4 border-t">
                            <Button
                                onClick={handleCopy}
                                disabled={!text}
                                size="lg"
                                className="w-full sm:w-auto hover:scale-105 transition-transform"
                                aria-label={copied ? "Texto copiado com sucesso" : "Copiar texto para área de transferência"}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2" aria-hidden="true" />
                                        Copiado com sucesso!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-5 h-5 mr-2" aria-hidden="true" />
                                        Copiar Texto
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer com créditos */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-8 text-sm text-muted-foreground"
                >
                    <p>
                        Desenvolvido com ❤️ para máxima acessibilidade
                    </p>
                </motion.footer>
            </motion.div>
        </div>
    )
}
