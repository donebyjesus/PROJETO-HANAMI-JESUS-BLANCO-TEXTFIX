import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Copy, Trash2, BookOpen, MessageSquare, Bold, Italic, Underline,
    List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Highlighter, Palette, Eraser, Undo, Redo, AlignVerticalSpaceAround,
    Save, Clock, X
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'

/**
 * Interface para textos salvos
 * Armazena o conteúdo HTML, texto plano e timestamp
 */
interface SavedText {
    id: string
    content: string
    plainText: string
    timestamp: number
}

/**
 * Interface para entradas do histórico
 * Armazena o conteúdo HTML e descrição da mudança
 */
interface HistoryEntry {
    content: string
    description: string
    timestamp: number
}

/**
 * Componente TextEditor - Editor de Texto Rico
 * 
 * Funcionalidades:
 * - Editor contentEditable com formatação em tempo real
 * - 12 fontes disponíveis
 * - Tamanhos de 8px a 100px
 * - Interlineado personalizável (6 opções)
 * - Formatação: Negrito, Itálico, Sublinhado
 * - Listas: Marcadores e Numeradas
 * - Alinhamento: Esquerda, Centro, Direita, Justificado
 * - Cores: Texto e Destaque
 * - Histórico: Desfazer/Refazer (Ctrl+Z/Ctrl+Y)
 * - Transformações: MAIÚSCULAS, minúsculas, Primeira Letra, Remover espaços
 * - Textos salvos: Últimos 5 com timestamp
 * - Toolbar sticky responsiva
 * - Atalhos de teclado
 */
export function TextEditor() {
    // Estados do editor
    const [text, setText] = useState('')
    const [selectedFont, setSelectedFont] = useState('Arial')
    const [fontSize, setFontSize] = useState('16')
    const [lineHeight, setLineHeight] = useState('1.5')
    const [textColor, setTextColor] = useState('#000000')
    const [highlightColor, setHighlightColor] = useState('#FFFF00')

    // Estados do histórico
    const [history, setHistory] = useState<HistoryEntry[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [showHistoryPopup, setShowHistoryPopup] = useState(false)

    // Estados dos textos salvos
    const [showSavedTexts, setShowSavedTexts] = useState(false)
    const [savedTexts, setSavedTexts] = useState<SavedText[]>([])

    const editorRef = useRef<HTMLDivElement>(null)
    const { success, error } = useToast()

    // Opções de fontes disponíveis
    const fonts = ['Arial', 'Times New Roman', 'Georgia', 'Courier New', 'Verdana', 'Helvetica', 'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Palatino', 'Garamond', 'Bookman']

    // Tamanhos de fonte de 8px a 100px
    const fontSizes = ['8', '10', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '40', '48', '56', '64', '72', '80', '88', '96', '100']

    // Opções de interlineado
    const lineHeights = [
        { value: '1', label: 'Simples' },
        { value: '1.15', label: '1.15' },
        { value: '1.5', label: '1.5' },
        { value: '2', label: 'Duplo' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: 'Triplo' }
    ]

    // Carrega texto salvo e lista de textos ao montar o componente
    useEffect(() => {
        const savedText = localStorage.getItem('textfix-text')
        const savedTextsList = localStorage.getItem('textfix-saved-texts')
        if (savedTextsList) setSavedTexts(JSON.parse(savedTextsList))
        if (savedText && editorRef.current) {
            editorRef.current.innerHTML = savedText
            setHistory([{
                content: savedText,
                description: 'Texto inicial carregado',
                timestamp: Date.now()
            }])
            setHistoryIndex(0)
        }
        editorRef.current?.focus()
    }, [])

    // Gerencia atalhos de teclado (Ctrl+B/I/U/Z/Y/S)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'b': e.preventDefault(); executeCommand('bold'); break
                    case 'i': e.preventDefault(); executeCommand('italic'); break
                    case 'u': e.preventDefault(); executeCommand('underline'); break
                    case 'z': e.preventDefault(); handleUndo(); break
                    case 'y': e.preventDefault(); handleRedo(); break
                    case 's': e.preventDefault(); handleSaveText(); break
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [historyIndex, history])

    /**
     * Salva o conteúdo atual no histórico com descrição
     * Remove itens futuros se estiver no meio do histórico
     */
    const saveToHistory = (content: string, description: string = 'Edição de texto') => {
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push({
            content,
            description,
            timestamp: Date.now()
        })
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
    }

    /**
     * Desfaz a última alteração (Ctrl+Z)
     * Volta um passo no histórico
     */
    const handleUndo = () => {
        if (historyIndex > 0 && editorRef.current) {
            const newIndex = historyIndex - 1
            setHistoryIndex(newIndex)
            editorRef.current.innerHTML = history[newIndex].content
            setText(editorRef.current.innerText)
        }
    }

    /**
     * Refaz a última alteração desfeita (Ctrl+Y)
     * Avança um passo no histórico
     */
    const handleRedo = () => {
        if (historyIndex < history.length - 1 && editorRef.current) {
            const newIndex = historyIndex + 1
            setHistoryIndex(newIndex)
            editorRef.current.innerHTML = history[newIndex].content
            setText(editorRef.current.innerText)
        }
    }

    /**
     * Manipula entrada de texto no editor
     * Salva no localStorage e adiciona ao histórico
     */
    const handleInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML
            localStorage.setItem('textfix-text', content)
            setText(editorRef.current.innerText)
            saveToHistory(content, 'Edição de texto')
        }
    }

    /**
     * Executa comandos de formatação do contentEditable
     * @param command - Comando a ser executado (bold, italic, etc)
     * @param value - Valor opcional para o comando
     */
    const executeCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value)
        editorRef.current?.focus()

        // Descrições amigáveis para o histórico
        const descriptions: Record<string, string> = {
            'bold': 'Aplicado negrito',
            'italic': 'Aplicado itálico',
            'underline': 'Aplicado sublinhado',
            'insertUnorderedList': 'Criada lista com marcadores',
            'insertOrderedList': 'Criada lista numerada',
            'justifyLeft': 'Alinhado à esquerda',
            'justifyCenter': 'Centralizado',
            'justifyRight': 'Alinhado à direita',
            'justifyFull': 'Justificado',
            'fontName': `Mudado para ${value}`,
            'foreColor': `Cor do texto alterada`,
            'backColor': `Cor de destaque alterada`
        }

        if (editorRef.current) {
            const content = editorRef.current.innerHTML
            localStorage.setItem('textfix-text', content)
            setText(editorRef.current.innerText)
            saveToHistory(content, descriptions[command] || 'Formatação aplicada')
        }
    }

    /**
     * Aplica transformações de texto preservando a formatação HTML
     * Percorre recursivamente todos os nós de texto
     * @param transformer - Função que transforma o texto
     */
    const transformTextPreservingFormat = (transformer: (text: string) => string) => {
        if (!editorRef.current) return
        const processNode = (node: Node): void => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                node.textContent = transformer(node.textContent)
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                Array.from(node.childNodes).forEach(processNode)
            }
        }
        processNode(editorRef.current)
        handleInput()
    }

    /**
     * Salva o texto atual na lista de textos salvos
     * Mantém apenas os últimos 5 textos
     */
    const handleSaveText = () => {
        if (!editorRef.current || !text.trim()) {
            error('Erro', 'Não há texto para salvar')
            return
        }
        const newSavedText: SavedText = {
            id: Date.now().toString(),
            content: editorRef.current.innerHTML,
            plainText: text.trim().substring(0, 100) + (text.length > 100 ? '...' : ''),
            timestamp: Date.now()
        }
        const updatedTexts = [newSavedText, ...savedTexts].slice(0, 5)
        setSavedTexts(updatedTexts)
        localStorage.setItem('textfix-saved-texts', JSON.stringify(updatedTexts))
        success('Texto salvo!', 'Adicionado à lista de textos salvos')
    }

    /**
     * Carrega um texto salvo no editor
     * Restaura o conteúdo HTML completo com formatação
     */
    const handleLoadText = (savedText: SavedText) => {
        if (editorRef.current) {
            editorRef.current.innerHTML = savedText.content
            setText(editorRef.current.innerText)
            saveToHistory(savedText.content)
            setShowSavedTexts(false)
            success('Texto carregado!', 'Texto restaurado com sucesso')
        }
    }

    /**
     * Copia o texto para a área de transferência
     * Usa a API clipboard do navegador
     */
    const handleCopy = async () => {
        try {
            if (editorRef.current) {
                await navigator.clipboard.writeText(editorRef.current.innerText)
                success('Texto copiado!', `${wordCount} palavras copiadas`)
            }
        } catch {
            error('Erro ao copiar', 'Não foi possível copiar o texto')
        }
    }

    // Calcula estatísticas do texto: palavras, caracteres e tempo de leitura
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
    const charCount = text.length
    const readingTime = Math.ceil(wordCount / 200) // 200 palavras por minuto

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
            <Card className="overflow-visible shadow-2xl">
                <CardContent className="p-0">
                    {/* Toolbar Sticky */}
                    <div className="sticky top-[80px] z-20 bg-white border-b shadow-md">
                        <div className="p-3 sm:p-4 space-y-3">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center text-xs sm:text-sm">
                                <div className="flex gap-1">
                                    <Button onClick={handleUndo} variant="outline" size="sm" disabled={historyIndex <= 0} title="Desfazer (Ctrl+Z)" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10">
                                        <Undo className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    </Button>
                                    <Button onClick={handleRedo} variant="outline" size="sm" disabled={historyIndex >= history.length - 1} title="Refazer (Ctrl+Y)" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10">
                                        <Redo className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    </Button>
                                </div>
                                <div className="w-px h-5 sm:h-6 bg-border"></div>
                                <select value={selectedFont} onChange={(e) => { setSelectedFont(e.target.value); executeCommand('fontName', e.target.value) }} className="px-1.5 sm:px-2 py-1 sm:py-1.5 border rounded-lg bg-background text-[10px] sm:text-xs min-w-[90px] sm:min-w-[110px]" title="Tipo de fonte">
                                    {fonts.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                                </select>
                                <select value={fontSize} onChange={(e) => { setFontSize(e.target.value); executeCommand('fontSize', '7') }} className="px-1.5 sm:px-2 py-1 sm:py-1.5 border rounded-lg bg-background text-[10px] sm:text-xs w-[50px] sm:w-[60px]" title="Tamanho">
                                    {fontSizes.map(s => <option key={s} value={s}>{s}px</option>)}
                                </select>
                                <div className="flex items-center gap-0.5 sm:gap-1">
                                    <AlignVerticalSpaceAround className="w-3 h-3 text-muted-foreground hidden sm:block" />
                                    <select value={lineHeight} onChange={(e) => { setLineHeight(e.target.value); if (editorRef.current) editorRef.current.style.lineHeight = e.target.value }} className="px-1.5 sm:px-2 py-1 sm:py-1.5 border rounded-lg bg-background text-[10px] sm:text-xs w-[60px] sm:w-[75px]" title="Interlineado">
                                        {lineHeights.map(lh => <option key={lh.value} value={lh.value}>{lh.label}</option>)}
                                    </select>
                                </div>
                                <div className="w-px h-5 sm:h-6 bg-border hidden sm:block"></div>
                                <div className="flex items-center gap-0.5 sm:gap-1">
                                    <Palette className="w-3 h-3 text-muted-foreground hidden sm:block" />
                                    <input type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); executeCommand('foreColor', e.target.value) }} className="w-7 sm:w-8 h-6 sm:h-7 border rounded cursor-pointer" title="Cor do texto" />
                                </div>
                                <div className="flex items-center gap-0.5 sm:gap-1">
                                    <Highlighter className="w-3 h-3 text-muted-foreground hidden sm:block" />
                                    <input type="color" value={highlightColor} onChange={(e) => { setHighlightColor(e.target.value); executeCommand('backColor', e.target.value) }} className="w-7 sm:w-8 h-6 sm:h-7 border rounded cursor-pointer" title="Cor de destaque" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                <Button onClick={() => executeCommand('bold')} variant="outline" size="sm" title="Negrito (Ctrl+B)" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><Bold className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <Button onClick={() => executeCommand('italic')} variant="outline" size="sm" title="Itálico (Ctrl+I)" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><Italic className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <Button onClick={() => executeCommand('underline')} variant="outline" size="sm" title="Sublinhado (Ctrl+U)" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><Underline className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <div className="w-px h-5 sm:h-6 bg-border"></div>
                                <Button onClick={() => executeCommand('insertUnorderedList')} variant="outline" size="sm" title="Lista com marcadores" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><List className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <Button onClick={() => executeCommand('insertOrderedList')} variant="outline" size="sm" title="Lista numerada" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><ListOrdered className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <div className="w-px h-5 sm:h-6 bg-border"></div>
                                <Button onClick={() => executeCommand('justifyLeft')} variant="outline" size="sm" title="Alinhar à esquerda" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><AlignLeft className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <Button onClick={() => executeCommand('justifyCenter')} variant="outline" size="sm" title="Centralizar" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><AlignCenter className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <Button onClick={() => executeCommand('justifyRight')} variant="outline" size="sm" title="Alinhar à direita" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><AlignRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <Button onClick={() => executeCommand('justifyFull')} variant="outline" size="sm" title="Justificar" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><AlignJustify className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <div className="w-px h-5 sm:h-6 bg-border"></div>
                                <Button onClick={() => transformTextPreservingFormat(t => t.toUpperCase())} variant="outline" size="sm" disabled={!text} title="MAIÚSCULAS" className="h-7 sm:h-8 px-1.5 sm:px-2 text-[10px] sm:text-xs font-bold hover:bg-primary/10">AA</Button>
                                <Button onClick={() => transformTextPreservingFormat(t => t.toLowerCase())} variant="outline" size="sm" disabled={!text} title="minúsculas" className="h-7 sm:h-8 px-1.5 sm:px-2 text-[10px] sm:text-xs hover:bg-primary/10">aa</Button>
                                <Button onClick={() => transformTextPreservingFormat(t => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, m => m.toUpperCase()))} variant="outline" size="sm" disabled={!text} title="Primeira Letra" className="h-7 sm:h-8 px-1.5 sm:px-2 text-[10px] sm:text-xs hover:bg-primary/10">Aa</Button>
                                <Button onClick={() => transformTextPreservingFormat(t => t.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n').trim())} variant="outline" size="sm" disabled={!text} title="Remover espaços" className="h-7 sm:h-8 px-1.5 sm:px-2 hover:bg-primary/10"><Eraser className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                                <Button onClick={() => { if (editorRef.current) { editorRef.current.innerHTML = ''; setText(''); localStorage.removeItem('textfix-text'); saveToHistory('') } }} variant="destructive" size="sm" disabled={!text} title="Limpar tudo" className="h-7 sm:h-8 px-1.5 sm:px-2"><Trash2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /></Button>
                            </div>
                            <div className="hidden sm:block text-[10px] text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                                💡 <strong>Atalhos:</strong> Ctrl+B (Negrito) | Ctrl+I (Itálico) | Ctrl+U (Sublinhado) | Ctrl+Z (Desfazer) | Ctrl+Y (Refazer) | Ctrl+S (Salvar)
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div contentEditable ref={editorRef} onInput={handleInput} className="min-h-[400px] p-4 border-2 border-primary/30 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary text-base overflow-auto" style={{ fontFamily: selectedFont, lineHeight }} data-placeholder="Cole ou digite seu texto aqui..." />

                        <div className="flex flex-wrap gap-3 relative">
                            <Badge variant="outline" className="text-sm px-4 py-2 border-primary/30 text-primary"><MessageSquare className="w-4 h-4 mr-2" />{wordCount} Palavras</Badge>
                            <Badge variant="outline" className="text-sm px-4 py-2 border-primary/30 text-primary">📝 {charCount} Caracteres</Badge>
                            <Badge variant="outline" className="text-sm px-4 py-2 border-primary/30 text-primary"><BookOpen className="w-4 h-4 mr-2" />{readingTime} min</Badge>

                            <div className="relative">
                                <Badge variant="outline" className="text-sm px-4 py-2 border-accent/30 text-accent cursor-pointer hover:bg-accent/10" onClick={() => setShowHistoryPopup(!showHistoryPopup)} title="Ver histórico">📜 {history.length} mudanças</Badge>
                                <AnimatePresence>
                                    {showHistoryPopup && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-full mb-2 right-0 bg-white border shadow-lg rounded-lg p-3 w-64 z-30">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-xs font-semibold">Histórico</h4>
                                                <Button variant="ghost" size="sm" onClick={() => setShowHistoryPopup(false)} className="h-5 w-5 p-0"><X className="w-3 h-3" /></Button>
                                            </div>
                                            <div className="max-h-48 overflow-y-auto space-y-1">
                                                {history.slice().reverse().map((_, idx) => {
                                                    const actualIdx = history.length - 1 - idx
                                                    return <div key={idx} className={`text-xs p-1.5 rounded ${actualIdx === historyIndex ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'}`}>{actualIdx === historyIndex ? '→ ' : '  '}Mudança #{actualIdx + 1}</div>
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="relative">
                                <Badge variant="outline" className="text-sm px-4 py-2 border-secondary/30 text-secondary cursor-pointer hover:bg-secondary/10" onClick={() => setShowSavedTexts(!showSavedTexts)} title="Ver textos salvos"><Clock className="w-4 h-4 mr-2" />{savedTexts.length} salvos</Badge>
                                <AnimatePresence>
                                    {showSavedTexts && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-full mb-2 right-0 bg-white border shadow-lg rounded-lg p-3 w-80 z-30">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-xs font-semibold">Últimos 5 Textos</h4>
                                                <Button variant="ghost" size="sm" onClick={() => setShowSavedTexts(false)} className="h-5 w-5 p-0"><X className="w-3 h-3" /></Button>
                                            </div>
                                            {savedTexts.length === 0 ? (
                                                <p className="text-xs text-muted-foreground text-center py-4">Nenhum texto salvo</p>
                                            ) : (
                                                <div className="max-h-64 overflow-y-auto space-y-2">
                                                    {savedTexts.map(saved => (
                                                        <div key={saved.id} className="border rounded p-2 hover:bg-muted/50 group">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <button onClick={() => handleLoadText(saved)} className="flex-1 text-left">
                                                                    <p className="text-xs text-foreground line-clamp-2">{saved.plainText}</p>
                                                                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(saved.timestamp).toLocaleString('pt-BR')}</p>
                                                                </button>
                                                                <Button variant="ghost" size="sm" onClick={() => { const updated = savedTexts.filter(t => t.id !== saved.id); setSavedTexts(updated); localStorage.setItem('textfix-saved-texts', JSON.stringify(updated)) }} className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100" title="Deletar"><Trash2 className="w-3 h-3 text-destructive" /></Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="pt-4 border-t flex flex-wrap gap-2">
                            <Button onClick={handleSaveText} disabled={!text} size="lg" variant="outline" className="hover:bg-secondary/10 hover:text-secondary" title="Salvar texto (Ctrl+S)"><Save className="w-5 h-5 mr-2" />Salvar Texto</Button>
                            <Button onClick={handleCopy} disabled={!text} size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg" title="Copiar texto"><Copy className="w-5 h-5 mr-2" />Copiar Texto</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
