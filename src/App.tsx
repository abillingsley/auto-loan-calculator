import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CarSimple, Calculator, Percent, CalendarBlank } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useKV } from '@github/spark/hooks'

function App() {
  const [vehiclePrice, setVehiclePrice] = useKV<number>('vehiclePrice', 35000)
  const [downPayment, setDownPayment] = useKV<number>('downPayment', 7000)
  const [interestRate, setInterestRate] = useKV<number>('interestRate', 6.5)
  const [loanTerm, setLoanTerm] = useKV<48 | 60 | 72 | 84>('loanTerm', 60)

  const [vehiclePriceInput, setVehiclePriceInput] = useState((vehiclePrice || 35000).toString())
  const [downPaymentInput, setDownPaymentInput] = useState((downPayment || 7000).toString())

  const totalFinanced = Math.max(0, (vehiclePrice || 35000) - (downPayment || 7000))

  const calculateMonthlyPayment = () => {
    if (totalFinanced <= 0) return 0
    const rate = interestRate || 6.5
    const term = loanTerm || 60
    
    if (rate === 0) return totalFinanced / term

    const monthlyRate = rate / 100 / 12
    const numPayments = term
    const payment = totalFinanced * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    return payment
  }

  const monthlyPayment = calculateMonthlyPayment()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCurrencyWithCents = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleVehiclePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setVehiclePriceInput(value)
    const numValue = parseInt(value || '0', 10)
    setVehiclePrice(numValue)
  }

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setDownPaymentInput(value)
    const numValue = parseInt(value || '0', 10)
    setDownPayment(Math.min(numValue, vehiclePrice || 35000))
  }

  const handleVehiclePriceBlur = () => {
    setVehiclePriceInput((vehiclePrice || 35000).toString())
  }

  const handleDownPaymentBlur = () => {
    setDownPaymentInput((downPayment || 7000).toString())
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CarSimple className="text-primary" size={32} weight="duotone" />
          </div>
          <h1 className="text-[32px] font-bold tracking-tight leading-none text-foreground mb-2">
            Auto Finance Calculator
          </h1>
          <p className="text-muted-foreground text-[15px]">
            Estimate your monthly car payment
          </p>
        </div>

        <Card className="p-6 sm:p-8 shadow-lg">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="vehicle-price" className="text-[14px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Est. Vehicle Price
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-[15px] pointer-events-none">$</span>
                  <Input
                    id="vehicle-price"
                    type="text"
                    value={vehiclePriceInput}
                    onChange={handleVehiclePriceChange}
                    onBlur={handleVehiclePriceBlur}
                    className="pl-7 py-3 pr-4 text-[15px] font-medium"
                    placeholder="35000"
                  />
                </div>
                <p className="text-[13px] text-muted-foreground">
                  {formatCurrency(vehiclePrice || 35000)}
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="down-payment" className="text-[14px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Down Payment
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-[15px] pointer-events-none">$</span>
                  <Input
                    id="down-payment"
                    type="text"
                    value={downPaymentInput}
                    onChange={handleDownPaymentChange}
                    onBlur={handleDownPaymentBlur}
                    className="pl-7 py-3 pr-4 text-[15px] font-medium"
                    placeholder="7000"
                  />
                </div>
                <p className="text-[13px] text-muted-foreground">
                  {formatCurrency(downPayment || 7000)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[14px] font-semibold uppercase tracking-wider text-muted-foreground">
                Total Finance Cost
              </Label>
              <div className="py-3 px-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-[15px] font-medium text-card-foreground">
                  {formatCurrency(totalFinanced)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[14px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Percent size={16} weight="bold" />
                  Interest Rate
                </Label>
                <span className="text-[20px] font-bold text-accent">
                  {(interestRate || 6.5).toFixed(2)}%
                </span>
              </div>
              <Slider
                value={[interestRate || 6.5]}
                onValueChange={(value) => setInterestRate(value[0])}
                min={0}
                max={20}
                step={0.25}
                className="py-2"
              />
              <div className="flex justify-between text-[13px] text-muted-foreground">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="loan-term" className="text-[14px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CalendarBlank size={16} weight="bold" />
                Loan Term
              </Label>
              <Select value={(loanTerm || 60).toString()} onValueChange={(value) => setLoanTerm(parseInt(value) as 48 | 60 | 72 | 84)}>
                <SelectTrigger id="loan-term" className="py-3 px-4 text-[15px] font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="48">48 months (4 years)</SelectItem>
                  <SelectItem value="60">60 months (5 years)</SelectItem>
                  <SelectItem value="72">72 months (6 years)</SelectItem>
                  <SelectItem value="84">84 months (7 years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Calculator size={16} weight="bold" />
                Estimated Monthly Payment
              </div>
              
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-6 sm:p-8 border-2 border-accent/30">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={monthlyPayment.toFixed(2)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        duration: 0.2
                      }}
                      className="text-center"
                    >
                      <div className="font-display text-[36px] sm:text-[48px] font-bold leading-none text-accent-foreground">
                        {formatCurrencyWithCents(monthlyPayment)}
                      </div>
                      <div className="text-[13px] text-muted-foreground mt-2 uppercase tracking-wide">
                        per month
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[13px]">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Total of payments</p>
                  <p className="font-semibold text-card-foreground">
                    {formatCurrency(monthlyPayment * (loanTerm || 60))}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Total interest</p>
                  <p className="font-semibold text-card-foreground">
                    {formatCurrency(Math.max(0, (monthlyPayment * (loanTerm || 60)) - totalFinanced))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <p className="text-center text-[13px] text-muted-foreground mt-6">
          This calculator provides estimates only. Actual rates and terms may vary.
        </p>
      </div>
    </div>
  )
}

export default App
