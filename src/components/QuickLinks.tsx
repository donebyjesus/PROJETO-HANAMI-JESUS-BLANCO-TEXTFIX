import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, Copy, Check, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

/**
 * Componente QuickLinks - Acortador de URLs
 * Gera IDs únicos para URLs longas
 */
export function QuickLinks() {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [shortId, setShortId] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const { success, error } = useToast()

    /**
     * Gera um ID único de 6 caracteres
     */
    const generateShortId = (): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    /**
     * Valida se a URL é válida
     */
    const isValidUrl = (urlString: string): boolean => {
        try {
            new URL(urlString)
            return true
        } catch {
            return false
        }
    }

    /**
     * Encurta a URL gerando um ID único
     */
    const handleShortenUrl = () => {
        if (!url.trim()) {
            error('URL vazia', 'Por favor, insira uma URL para encurtar')
            return
        }

        if (!isValidUrl(url)) {
            error('URL inválida', 'Por favor, insira uma URL válida (ex: https://exemplo.com)')
            return
        }

        const id = generateShortId()
        const shortened = `https://hanami.link/${id}`

        setShortId(id)
        setShortUrl(shortened)

        // Salva no localStorage (simulação de banco de dados)
        const links = JSON.parse(localStorage.getItem('hanami-links') || '{}')
        links[id] = {
            original: url,
            short: shortened,
            created: new Date().toISOString(),
            clicks: 0
        }
        localStorage.setItem('hanami-links', JSON.stringify(links))

        success('URL encurtada!', `ID único: ${id}`)
    }

    /**
     * Copia a URL encurtada para a área de transferência
     */
    const handleCopyShortUrl = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl)
            success('Copiado!', 'URL encurtada copiada para a área de transferência')
        } catch (err) {
            error('Erro ao copiar', 'Não foi possível copiar a URL')
        }
    }

    /**
     * Limpa os campos
     */
    const handleClear = () => {
        setUrl('')
        setShortUrl('')
        setShortId('')
        inputRef.current?.focus()
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <Card>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <CardTitle className="flex items-center gap-3">
                        <Link className="w-6 h-6" aria-hidden="true" />
                        <span>QuickLinks</span>
                    </CardTitle>
                    <p className="text-white/90 text-sm mt-1">
                        Encurte URLs longas e gere IDs únicos
                    </p>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                    {/* Input de URL */}
                    <div>
                        <label htmlFor="url-input" className="text-sm font-medium mb-2 block">
                            URL Original
                        </label>
                        <Input
                            id="url-input"
                            ref={inputRef}
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://exemplo.com/pagina-muito-longa..."
                            aria-label="URL para encurtar"
                            onKeyDown={(e) => e.key === 'Enter' && handleShortenUrl()}
                        />
                    </div>

                    {/* Botões de ação */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={handleShortenUrl}
                            disabled={!url.trim()}
                            className="flex-1 sm:flex-none"
                        >
                            <Link className="w-4 h-4 mr-2" aria-hidden="true" />
                            Encurtar URL
                        </Button>
                        <Button
                            onClick={handleClear}
                            variant="outline"
                            disabled={!url && !shortUrl}
                            className="flex-1 sm:flex-none"
                        >
                            Limpar
                        </Button>
                    </div>

                    {/* Resultado */}
                    {shortUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg space-y-3"
                        >
                            <div>
                                <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                                    URL Encurtada:
                                </p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border rounded text-sm font-mono break-all">
                                        {shortUrl}
                                    </code>
                                    <Button
                                        onClick={handleCopyShortUrl}
                                        size="sm"
                                        variant="outline"
                                        aria-label="Copiar URL encurtada"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                                <Check className="w-4 h-4" aria-hidden="true" />
                                <span>ID único: <strong>{shortId}</strong></span>
                            </div>

                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                Abrir URL original
                            </a>
                        </motion.div>
                    )}

                    {/* Informação adicional */}
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                        <p>💡 <strong>Dica:</strong> As URLs encurtadas são salvas localmente no seu navegador</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
