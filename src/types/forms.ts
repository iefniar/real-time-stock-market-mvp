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
