import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftRight, Calculator } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'

/**
 * Tipos de conversão suportados
 */
type ConversionType = 'length' | 'weight' | 'temperature'

interface Unit {
    name: string
    symbol: string
    toBase: (value: number) => number
    fromBase: (value: number) => number
}

/**
 * Definições de unidades
 */
const units: Record<ConversionType, Record<string, Unit>> = {
    length: {
        meter: {
            name: 'Metro',
            symbol: 'm',
            toBase: (v) => v,
            fromBase: (v) => v
        },
        kilometer: {
            name: 'Quilômetro',
            symbol: 'km',
            toBase: (v) => v * 1000,
            fromBase: (v) => v / 1000
        },
        mile: {
            name: 'Milha',
            symbol: 'mi',
            toBase: (v) => v * 1609.34,
            fromBase: (v) => v / 1609.34
        }
    },
    weight: {
        kilogram: {
            name: 'Quilograma',
            symbol: 'kg',
            toBase: (v) => v,
            fromBase: (v) => v
        },
        gram: {
            name: 'Grama',
            symbol: 'g',
            toBase: (v) => v / 1000,
            fromBase: (v) => v * 1000
        },
        pound: {
            name: 'Libra',
            symbol: 'lb',
            toBase: (v) => v * 0.453592,
            fromBase: (v) => v / 0.453592
        }
    },
    temperature: {
        celsius: {
            name: 'Celsius',
            symbol: '°C',
            toBase: (v) => v,
            fromBase: (v) => v
        },
        fahrenheit: {
            name: 'Fahrenheit',
            symbol: '°F',
            toBase: (v) => (v - 32) * 5 / 9,
            fromBase: (v) => (v * 9 / 5) + 32
        },
        kelvin: {
            name: 'Kelvin',
            symbol: 'K',
            toBase: (v) => v - 273.15,
            fromBase: (v) => v + 273.15
        }
    }
}

/**
 * Componente UnitConverter - Conversor de Unidades
 */
export function UnitConverter() {
    const [conversionType, setConversionType] = useState<ConversionType>('length')
    const [fromUnit, setFromUnit] = useState('meter')
    const [toUnit, setToUnit] = useState('kilometer')
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState<number | null>(null)
    const { success, error } = useToast()

    /**
     * Realiza a conversão
     */
    const handleConvert = () => {
        const value = parseFloat(inputValue)

        if (isNaN(value)) {
            error('Valor inválido', 'Por favor, insira um número válido')
            return
        }

        const currentUnits = units[conversionType]
        const from = currentUnits[fromUnit]
        const to = currentUnits[toUnit]

        // Converte para unidade base e depois para unidade de destino
        const baseValue = from.toBase(value)
        const convertedValue = to.fromBase(baseValue)

        setResult(convertedValue)
        success(
            'Conversão realizada!',
            `${value} ${from.symbol} = ${convertedValue.toFixed(4)} ${to.symbol}`
        )
    }

    /**
     * Troca as unidades de origem e destino
     */
    const handleSwapUnits = () => {
        const temp = fromUnit
        setFromUnit(toUnit)
        setToUnit(temp)

        if (result !== null && inputValue) {
            setInputValue(result.toFixed(4))
            setResult(parseFloat(inputValue))
        }
    }

    /**
     * Limpa os campos
     */
    const handleClear = () => {
        setInputValue('')
        setResult(null)
    }

    /**
     * Muda o tipo de conversão
     */
    const handleChangeType = (type: ConversionType) => {
        setConversionType(type)
        const firstUnit = Object.keys(units[type])[0]
        const secondUnit = Object.keys(units[type])[1]
        setFromUnit(firstUnit)
        setToUnit(secondUnit)
        setInputValue('')
        setResult(null)
    }

    const currentUnits = units[conversionType]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card>
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
                    <CardTitle className="flex items-center gap-3">
                        <Calculator className="w-6 h-6" aria-hidden="true" />
                        <span>UnitConverter</span>
                    </CardTitle>
                    <p className="text-white/90 text-sm mt-1">
                        Converta entre diferentes unidades de medida
                    </p>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                    {/* Seletor de tipo de conversão */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Tipo de Conversão
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={conversionType === 'length' ? 'default' : 'outline'}
                                className="cursor-pointer px-4 py-2"
                                onClick={() => handleChangeType('length')}
                            >
                                Comprimento
                            </Badge>
                            <Badge
                                variant={conversionType === 'weight' ? 'default' : 'outline'}
                                className="cursor-pointer px-4 py-2"
                                onClick={() => handleChangeType('weight')}
                            >
                                Peso
                            </Badge>
                            <Badge
                                variant={conversionType === 'temperature' ? 'default' : 'outline'}
                                className="cursor-pointer px-4 py-2"
                                onClick={() => handleChangeType('temperature')}
                            >
                                Temperatura
                            </Badge>
                        </div>
                    </div>

                    {/* Conversão */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                        {/* De */}
                        <div>
                            <label htmlFor="from-value" className="text-sm font-medium mb-2 block">
                                De
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="from-value"
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="0"
                                    aria-label="Valor a converter"
                                    onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                                />
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg bg-background"
                                    aria-label="Unidade de origem"
                                >
                                    {Object.entries(currentUnits).map(([key, unit]) => (
                                        <option key={key} value={key}>
                                            {unit.name} ({unit.symbol})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Botão de troca */}
                        <Button
                            onClick={handleSwapUnits}
                            variant="outline"
                            size="icon"
                            className="mb-2"
                            aria-label="Trocar unidades"
                        >
                            <ArrowLeftRight className="w-4 h-4" />
                        </Button>

                        {/* Para */}
                        <div>
                            <label htmlFor="to-value" className="text-sm font-medium mb-2 block">
                                Para
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="to-value"
                                    type="number"
                                    value={result !== null ? result.toFixed(4) : ''}
                                    readOnly
                                    placeholder="0"
                                    className="bg-muted"
                                    aria-label="Resultado da conversão"
                                />
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg bg-background"
                                    aria-label="Unidade de destino"
                                >
                                    {Object.entries(currentUnits).map(([key, unit]) => (
                                        <option key={key} value={key}>
                                            {unit.name} ({unit.symbol})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={handleConvert}
                            disabled={!inputValue.trim()}
                            className="flex-1 sm:flex-none"
                        >
                            <Calculator className="w-4 h-4 mr-2" aria-hidden="true" />
                            Converter
                        </Button>
                        <Button
                            onClick={handleClear}
                            variant="outline"
                            disabled={!inputValue && result === null}
                            className="flex-1 sm:flex-none"
                        >
                            Limpar
                        </Button>
                    </div>

                    {/* Resultado destacado */}
                    {result !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg"
                        >
                            <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
                                Resultado:
                            </p>
                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                                {inputValue} {currentUnits[fromUnit].symbol} = {result.toFixed(4)} {currentUnits[toUnit].symbol}
                            </p>
                        </motion.div>
                    )}

                    {/* Informação adicional */}
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                        <p>💡 <strong>Dica:</strong> Pressione Enter para converter rapidamente</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
