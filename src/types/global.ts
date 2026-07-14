export type SignUpFormData = {
  fullName: string
  email: string
  password: string
  country: string
  investmentGoals: string
  riskTolerance: string
  preferredIndustry: string
}

export type Option = {
  value: string
  label: string
}

// Sign-up form select options
export const INVESTMENT_GOALS: Option[] = [
  { value: 'Growth', label: 'Growth' },
  { value: 'Income', label: 'Income' },
  { value: 'Balanced', label: 'Balanced' },
  { value: 'Conservative', label: 'Conservative' }
]

export const RISK_TOLERANCE_OPTIONS: Option[] = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' }
]

export const PREFERRED_INDUSTRIES: Option[] = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Consumer Goods', label: 'Consumer Goods' }
]

export type LogInFormData = {
  email: string
  password: string
}

export type User = {
  id: string
  name: string
  email: string
}

export type Stock = {
  symbol: string
  name: string
  exchange: string
  type: string
}

export type StockWithWatchlistStatus = Stock & {
  isInWatchlist: boolean
}

export type StockDetails = {
  symbol: string
  company: string
  currentPrice: number
  changePercent: number
  priceFormatted: string
  changeFormatted: string
  peRatio: string
  marketCapFormatted: string
}

export type StockWithData = {
  userId: string
  symbol: string
  company: string
  addedAt: Date
  currentPrice?: number
  changePercent?: number
  priceFormatted?: string
  changeFormatted?: string
  marketCap?: string
  peRatio?: string
}
