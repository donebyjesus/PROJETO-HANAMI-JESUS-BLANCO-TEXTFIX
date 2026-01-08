import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    Copy,
    Trash2,
    BookOpen,
    MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'

/**
 * Componente principal TextFix - Formatador de Texto
 * Conceito: "Ordem a partir do Caos"
 * Identidade visual baseada no logo TextFix
 */
export function TextEditor() {
    const [text, setText] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { success, error } = useToast()

    // Carrega o texto salvo do localStorage ao montar o componente
    useEffect(() => {
        const savedText = localStorage.getItem('textfix-text')
        if (savedText) {
            setText(savedText)
        }
        // Auto-focus no textarea para acessibilidade
        textareaRef.current?.focus()
    }, [])

    // Salva o texto no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem('textfix-text', text)
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
     * Mostra feedback via Toast notification
     */
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            success('Texto copiado!', `${wordCount} palavras copiadas com sucesso`)
        } catch (err) {
            error('Erro ao copiar', 'Não foi possível copiar o texto')
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
                <Card className="overflow-hidden shadow-2xl">
                    {/* Header com gradiente TextFix: Ciano → Navy */}
                    <CardHeader className="bg-gradient-to-r from-[#00A3FF] to-[#1A365D] text-white">
                        <CardTitle className="flex items-center gap-4">
                            {/* Logo TextFix */}
                            <img
                                src="/icon-textfix.svg"
                                alt="Logo TextFix"
                                className="w-10 h-10"
                                aria-hidden="true"
                            />
                            <div>
                                <h1 className="text-3xl font-bold">TextFix</h1>
                                <p className="text-sm font-normal text-white/90 mt-1">
                                    Formatador de Texto Premium
                                </p>
                            </div>
                        </CardTitle>
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
                                className="min-h-[300px] text-base resize-y focus:ring-[#00A3FF] focus:border-[#00A3FF]"
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
                                className="text-sm px-4 py-2 border-primary/30 text-primary"
                                aria-label={`${wordCount} palavras`}
                            >
                                <MessageSquare className="w-4 h-4 mr-2" aria-hidden="true" />
                                {wordCount} Palavras
                            </Badge>
                            <Badge
                                variant="outline"
                                className="text-sm px-4 py-2 border-primary/30 text-primary"
                                aria-label={`${charCount} caracteres`}
                            >
                                📝 {charCount} Caracteres
                            </Badge>
                            <Badge
                                variant="outline"
                                className="text-sm px-4 py-2 border-primary/30 text-primary"
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
                                    className="hover:scale-105 transition-transform hover:bg-primary/10 hover:text-primary hover:border-primary"
                                >
                                    MAIÚSCULAS
                                </Button>
                                <Button
                                    onClick={handleLowercase}
                                    variant="outline"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Converter texto para minúsculas"
                                    className="hover:scale-105 transition-transform hover:bg-primary/10 hover:text-primary hover:border-primary"
                                >
                                    minúsculas
                                </Button>
                                <Button
                                    onClick={handleSentenceCase}
                                    variant="outline"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Converter primeira letra de cada frase para maiúscula"
                                    className="hover:scale-105 transition-transform hover:bg-primary/10 hover:text-primary hover:border-primary"
                                >
                                    Primeira Letra em Maiúscula
                                </Button>
                                <Button
                                    onClick={handleRemoveExtraSpaces}
                                    variant="outline"
                                    size="sm"
                                    disabled={!text}
                                    aria-label="Remover espaços extras e quebras de linha duplas"
                                    className="hover:scale-105 transition-transform hover:bg-primary/10 hover:text-primary hover:border-primary"
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

                        {/* Botão de copiar com cores TextFix */}
                        <div className="pt-4 border-t">
                            <Button
                                onClick={handleCopy}
                                disabled={!text}
                                size="lg"
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
                                aria-label="Copiar texto para área de transferência"
                            >
                                <Copy className="w-5 h-5 mr-2" aria-hidden="true" />
                                Copiar Texto
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
