export const financialKPIs = {
  revenue: { value: 4.8, unit: 'B', currency: '₹', color: '#00FFCC', sparkline: [3.2, 3.5, 3.8, 4.0, 4.1, 4.3, 4.5, 4.6, 4.7, 4.8] },
  grossMargin: { value: 44, unit: '%', color: '#FFD700', sparkline: null },
  ebitda: { value: 950, unit: 'M', currency: '₹', color: '#BF5AF2', sparkline: [700, 780, 720, 850, 810, 900, 870, 920, 940, 950] },
  ebitdaMargin: { value: 19.8, unit: '%', color: '#FFD700', sparkline: null },
  netIncome: { value: 610, unit: 'M', currency: '₹', color: '#00FFCC', sparkline: [400, 420, 450, 470, 500, 520, 550, 570, 590, 610] },
};

export const qoqGrowth = {
  revenue: { label: 'REV', change: '+4.8B', color: '#00FFCC' },
  gross: { label: 'GROSS', change: '+44%', color: '#FFD700' },
  ebitda: { label: 'EBITDA', change: '+95%', color: '#BF5AF2' },
};

export const additionalMetrics = {
  operatingCashFlow: { label: 'Operating Cash Flow', value: 1.2, unit: 'B', currency: '₹', color: '#00FFCC' },
  freeCashFlow: { label: 'Free Cash Flow (FCF)', value: 900, unit: 'M', currency: '₹', color: '#00FFCC' },
  evEbitda: { label: 'EV/EBITDA', value: 8.1, unit: '', color: '#FFFFFF' },
};

export const operatingExpenses = {
  quarters: [
    { label: 'Q1', value: 1.0, unit: 'B', color: '#00FFCC' },
    { label: 'Q2', value: 1.1, unit: 'B', color: '#FF9F0A' },
    { label: 'Q3', value: 1.2, unit: 'B', color: '#BF5AF2' },
    { label: 'Q4', value: 1.5, unit: 'B', color: '#64D2FF' },
  ],
  breakdown: [
    { category: 'Server Costs', pct: 22, color: '#FF453A' },
    { category: 'R&D', pct: 35, color: '#BF5AF2' },
    { category: 'Marketing', pct: 15, color: '#00FFCC' },
    { category: 'Cost Costs', pct: 10, color: '#FFD700' },
    { category: 'Other', pct: 8, color: '#8A8F98' },
  ],
};

export const financialAnalysis = {
  donut: [
    { segment: 'Core Platform', value: 2.1, unit: 'B', color: '#00FFCC' },
    { segment: 'Premium Add-ons', value: 1.1, unit: 'B', color: '#BF5AF2' },
    { segment: 'Service Fees', value: 1.1, unit: 'B', color: '#FFD700' },
  ],
  revenueComposition: {
    total: { value: 0.5, unit: 'B', currency: '₹', color: '#00FFCC' },
    label: 'BASIC SUBSCRIPTIONS',
    split: [
      { type: 'Premium', pct: 36, color: '#BF5AF2' },
      { type: 'Basic', pct: 34, color: '#00FFCC' },
    ],
    sparkline: [0.32, 0.35, 0.38, 0.37, 0.40, 0.42, 0.44, 0.46, 0.48, 0.50],
  },
};

export const marginTrends = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  series: [
    { name: 'Gross Margin', color: '#00FFCC', data: [42, 41, 40, 38, 39, 41, 43, 44, 45, 46] },
    { name: 'EBITDA', color: '#BF5AF2', data: [18, 17, 19, 16, 18, 20, 21, 22, 20, 20] },
    { name: 'Net Income Margin', color: '#FFD700', data: [12, 12, 13, 11, 12, 13, 14, 15, 15, 16] },
  ],
};

export const cashFlow = {
  netCashFromOps: { label: 'Net Cash from Ops', value: 1.2, unit: 'B', currency: '₹', color: '#00FFCC' },
  freeCashFlow: { label: 'Free Cash Flow', value: 900, unit: 'M', currency: '₹', color: '#00FFCC' },
};

export const forecast = {
  projectedRevenue: { label: 'Projected Revenue', value: 5.6, unit: 'B', currency: '₹', color: '#00FFCC' },
  revenueRange: { low: 5.6, high: 6.0, unit: 'B', currency: '₹' },
  projectedNetIncome: { label: 'Projected Net Income', value: 750, unit: 'M', currency: '₹', color: '#00FFCC' },
};

export const header = {
  company: 'SPEAKX',
  reportTitle: 'YEARLY PERFORMANCE REPORT',
  fiscalYear: 'FY 2124',
  subtitle: 'Critical data to the CFO and Financial Head',
  date: '14 OCT 2124',
  statusDots: 3,
};
