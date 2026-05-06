// lib/ncert-syllabus-commerce.ts
// Class 11 & 12 Commerce + Humanities stream syllabus

import type { ClassSyllabus } from './ncert-syllabus'

// ─────────────────────────────────────────────────────────
// CLASS 11 COMMERCE
// ─────────────────────────────────────────────────────────
export const CLASS_11_COMMERCE: ClassSyllabus = {
  classLevel: '11',
  subjects: [
    {
      name: 'Accountancy', slug: 'accountancy', icon: '📒', color: '#7c3400',
      chapters: [
        {
          id: 'c11ac1', title: 'Introduction to Accounting',
          topics: ['Accounting: concept and objectives', 'Role of accounting', 'Book-keeping and accounting', 'Users of accounting information', 'Qualitative characteristics of accounting information', 'Basis of accounting'],
          keyTerms: ['Accounting', 'Book-keeping', 'Financial statement', 'Assets', 'Liabilities', 'Capital', 'Revenue', 'Expense']
        },
        {
          id: 'c11ac2', title: 'Theory Base of Accounting',
          topics: ['Accounting principles', 'Accounting concepts and conventions', 'Double entry system', 'Accounting standards', 'GAAP'],
          keyTerms: ['Business entity', 'Going concern', 'Accrual', 'Consistency', 'Prudence', 'Materiality', 'Dual aspect']
        },
        {
          id: 'c11ac3', title: 'Recording of Transactions — I',
          topics: ['Accounting equation', 'Rules of debit and credit', 'Source documents', 'Preparation of journal'],
          formulas: ['Assets = Liabilities + Capital', 'Debit = Credit (in balanced accounts)'],
          keyTerms: ['Journal', 'Debit', 'Credit', 'Entry', 'Source document', 'Voucher', 'Invoice']
        },
        {
          id: 'c11ac4', title: 'Recording of Transactions — II',
          topics: ['Cash book (single, double, triple column)', 'Petty cash book', 'Other subsidiary books', 'Ledger posting'],
          keyTerms: ['Cash book', 'Ledger', 'Posting', 'Folio', 'Balance', 'Petty cash', 'Subsidiary books']
        },
        {
          id: 'c11ac5', title: 'Bank Reconciliation Statement',
          topics: ['Need for BRS', 'Causes of differences', 'Preparation of BRS', 'Adjusted cash book'],
          formulas: ['Balance as per cash book ± Adjustments = Balance as per passbook'],
          keyTerms: ['BRS', 'Passbook', 'Cash book', 'Outstanding cheque', 'Unpresented cheque', 'Direct credits']
        },
        {
          id: 'c11ac6', title: 'Trial Balance and Rectification of Errors',
          topics: ['Meaning of trial balance', 'Objectives', 'Preparation', 'Types of errors', 'Suspense account'],
          keyTerms: ['Trial balance', 'Suspense account', 'Errors of omission', 'Errors of commission', 'Compensating errors']
        },
        {
          id: 'c11ac7', title: 'Depreciation, Provisions and Reserves',
          topics: ['Depreciation: concept and causes', 'Methods of depreciation (SLM, WDV)', 'Provisions and reserves'],
          formulas: ['SLM = (Cost - Residual Value) / Useful life', 'WDV = Book value × Rate%'],
          keyTerms: ['Depreciation', 'Straight line method', 'Written down value', 'Provision', 'Reserve', 'Book value']
        },
        {
          id: 'c11ac8', title: 'Bill of Exchange',
          topics: ['Bill of exchange: definition', 'Types of bills', 'Accommodation bills', 'Retirement and renewal'],
          keyTerms: ['Bill of exchange', 'Drawer', 'Drawee', 'Payee', 'Endorsement', 'Dishonour', 'Noting']
        },
        {
          id: 'c11ac9', title: 'Financial Statements — I',
          topics: ['Meaning', 'Types', 'Trading and profit & loss account', 'Balance sheet', 'Adjustments'],
          formulas: ['Gross Profit = Net Sales - Cost of goods sold', 'Net Profit = Gross Profit - Indirect Expenses'],
          keyTerms: ['Trading account', 'P&L account', 'Balance sheet', 'Gross profit', 'Net profit', 'Adjustments']
        },
        {
          id: 'c11ac10', title: 'Financial Statements — II',
          topics: ['Adjustments', 'Outstanding expenses', 'Prepaid expenses', 'Accrued income', 'Income received in advance', 'Bad debts', 'Provision for doubtful debts'],
          keyTerms: ['Accruals', 'Prepayments', 'Bad debts', 'Provision', 'Depreciation in final accounts']
        },
        {
          id: 'c11ac11', title: 'Accounts from Incomplete Records',
          topics: ['Meaning and features', 'Preparation of accounts from incomplete records', 'Statement of affairs', 'Conversion method'],
          keyTerms: ['Single entry', 'Statement of affairs', 'Net worth', 'Opening capital', 'Closing capital']
        },
        {
          id: 'c11ac12', title: 'Applications of Computers in Accounting',
          topics: ['Introduction to computer system', 'Accounting software: Tally', 'Data entry in Tally', 'Reports generation'],
          keyTerms: ['Accounting software', 'Tally', 'Computerised accounting', 'Database', 'MIS', 'ERP']
        },
      ]
    },
    {
      name: 'Business Studies', slug: 'business-studies', icon: '💼', color: '#7c3400',
      chapters: [
        { id: 'c11bs1', title: 'Nature and Purpose of Business', topics: ['Concept of business', 'Business, profession and employment', 'Objectives of business', 'Classification of business activities', 'Characteristics of business'] },
        { id: 'c11bs2', title: 'Forms of Business Organisation', topics: ['Sole proprietorship', 'Partnership', 'Hindu Undivided Family', 'Cooperative societies', 'Joint stock company'] },
        { id: 'c11bs3', title: 'Private, Public and Global Enterprises', topics: ['Private sector enterprises', 'Public sector enterprises', 'MNCs', 'Changing role of public sector'] },
        { id: 'c11bs4', title: 'Business Services', topics: ['Banking', 'Insurance', 'Communication', 'Transportation', 'Warehousing'] },
        { id: 'c11bs5', title: 'Emerging Modes of Business', topics: ['e-Commerce', 'Outsourcing', 'Business Process Outsourcing (BPO)', 'e-Business'] },
        { id: 'c11bs6', title: 'Social Responsibilities of Business and Business Ethics', topics: ['Social responsibility', 'Arguments for and against', 'Environment protection', 'Business ethics'] },
        { id: 'c11bs7', title: 'Formation of a Company', topics: ['Stages in company formation', 'Promotion', 'Incorporation', 'Capital subscription', 'Commencement of business', 'Documents'] },
        { id: 'c11bs8', title: 'Sources of Business Finance', topics: ['Meaning and nature of business finance', 'Owner\'s funds', 'Borrowed funds', 'Different sources: shares, debentures, retained earnings, loans'] },
        { id: 'c11bs9', title: 'Small Business and Entrepreneurship', topics: ['Concept of small business', 'Role of small business in India', 'Problems of small business', 'Entrepreneurship', 'Qualities of entrepreneur'] },
        { id: 'c11bs10', title: 'Internal Trade', topics: ['Nature and types of internal trade', 'Services of a wholesaler', 'Services of a retailer', 'Large-scale retail trade'] },
        { id: 'c11bs11', title: 'International Business', topics: ['Nature and importance', 'Modes of entry into international business', 'Export procedure and documentation', 'WTO'] },
      ]
    },
    {
      name: 'Economics', slug: 'economics', icon: '💹', color: '#065f46',
      chapters: [
        { id: 'c11ec1', title: 'Indian Economy on the Eve of Independence', topics: ['Low level of economic development', 'Agricultural sector', 'Industrial sector', 'Foreign trade', 'Demographic condition'] },
        { id: 'c11ec2', title: 'Indian Economy 1950-1990', topics: ['Goals of Five Year Plans', 'Agriculture', 'Industry and trade', 'Trade policy: import substitution'] },
        { id: 'c11ec3', title: 'Liberalisation, Privatisation and Globalisation: An Appraisal', topics: ['Background', 'Liberalisation', 'Privatisation', 'Globalisation', 'India and the WTO'] },
        { id: 'c11ec4', title: 'Poverty', topics: ['Who are the poor?', 'How is poverty measured?', 'Poverty Estimates', 'Vulnerable groups', 'Interstate disparities', 'Global poverty scenario'] },
        { id: 'c11ec5', title: 'Human Capital Formation in India', topics: ['What is human capital?', 'Sources of human capital', 'Human capital and economic growth', 'State of human capital formation in India'] },
        { id: 'c11ec6', title: 'Rural Development', topics: ['What is rural development?', 'Credit and marketing in rural areas', 'Agricultural market reforms', 'Diversification into productive activities', 'Sustainable development'] },
        { id: 'c11ec7', title: 'Employment — Growth, Informalisation and Other Issues', topics: ['Workers and employment', 'Employment in firms', 'farms and homes', 'Challenges to employment', 'Government and employment generation'] },
        { id: 'c11ec8', title: 'Infrastructure', topics: ['What is infrastructure?', 'Relevance of infrastructure', 'State of infrastructure in India', 'Energy', 'Health'] },
        { id: 'c11ec9', title: 'Environment and Sustainable Development', topics: ['Environment: definition and functions', 'State of India\'s environment', 'Sustainable development', 'Strategies for sustainable development'] },
        { id: 'c11ec10', title: 'Comparative Development Experiences of India and its Neighbours', topics: ['Developmental path', 'Demographic indicators', 'GDP and sectors', 'Human development indicators', 'Development strategies'] },
        // Statistics for Economics
        { id: 'c11ec11', title: 'Introduction to Statistics', topics: ['What is statistics?', 'Scope and uses', 'Collection of data', 'Sources of data'] },
        { id: 'c11ec12', title: 'Collection of Data', topics: ['Primary data collection', 'Secondary data', 'Sampling methods', 'Census and sampling'] },
        { id: 'c11ec13', title: 'Organisation of Data', topics: ['Frequency distribution', 'Classification of data', 'Bivariate distribution'] },
        { id: 'c11ec14', title: 'Presentation of Data', topics: ['Textual presentation', 'Tabular presentation', 'Diagrammatic presentation', 'Graphs'] },
        { id: 'c11ec15', title: 'Measures of Central Tendency', topics: ['Arithmetic mean', 'Median', 'Mode', 'Weighted arithmetic mean'], formulas: ['Mean = ΣX/N', 'Median = L + (N/2 - CF)/f × h'] },
        { id: 'c11ec16', title: 'Measures of Dispersion', topics: ['Range', 'Quartile deviation', 'Mean deviation', 'Standard deviation', 'Coefficient of variation'], formulas: ['SD = √(Σfd²/N)', 'CV = (SD/Mean) × 100'] },
        { id: 'c11ec17', title: 'Correlation', topics: ['Meaning of correlation', 'Types', 'Karl Pearson\'s method', 'Spearman\'s rank correlation'], formulas: ['r = Σdx·dy / √(Σdx² × Σdy²)'] },
        { id: 'c11ec18', title: 'Introduction to Index Numbers', topics: ['Meaning', 'Uses', 'Laspeyres\' price index', 'Paasche\'s index', 'Wholesale Price Index', 'Consumer Price Index'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 12 COMMERCE
// ─────────────────────────────────────────────────────────
export const CLASS_12_COMMERCE: ClassSyllabus = {
  classLevel: '12',
  subjects: [
    {
      name: 'Accountancy', slug: 'accountancy', icon: '📒', color: '#7c3400',
      chapters: [
        {
          id: 'c12ac1', title: 'Accounting for Partnership',
          topics: ['Nature of partnership', 'Partnership deed', 'Fixed and fluctuating capital', 'Profit and loss appropriation account', 'Interest on capital', 'Partner\'s salary', 'Commission'],
          formulas: ['P&L Appropriation = Net Profit - Interest on Capital - Salary + Interest on Drawings'],
          keyTerms: ['Partnership deed', 'Capital account', 'Current account', 'Appropriation', 'Drawings']
        },
        {
          id: 'c12ac2', title: 'Reconstitution of Partnership',
          topics: ['Admission of a partner', 'New profit sharing ratio', 'Sacrificing ratio', 'Goodwill valuation', 'Revaluation of assets', 'Retirement of a partner', 'Death of a partner'],
          formulas: ['Goodwill = Super profit × Years of purchase', 'Gaining ratio = New ratio - Old ratio'],
          keyTerms: ['Goodwill', 'Super profit', 'Sacrificing ratio', 'Gaining ratio', 'Revaluation', 'Retirement']
        },
        {
          id: 'c12ac3', title: 'Dissolution of Partnership',
          topics: ['Dissolution of firm vs. dissolution of partnership', 'Settlement of accounts', 'Insolvency of partner', 'Insolvency of all partners', 'Piecemeal distribution'],
          formulas: ['Realisation account closes with profit/loss on realisation'],
          keyTerms: ['Dissolution', 'Realisation account', 'Deficiency', 'Piecemeal distribution']
        },
        {
          id: 'c12ac4', title: 'Accounting for Share Capital',
          topics: ['Types of shares', 'Issue of shares at par, premium, discount', 'Forfeiture of shares', 'Re-issue of forfeited shares', 'Pro-rata allotment'],
          formulas: ['Securities Premium = Issue price - Face value', 'Capital Reserve = Proceeds from re-issue of forfeited shares'],
          keyTerms: ['Share capital', 'Equity share', 'Preference share', 'Forfeiture', 'Securities premium', 'Calls in arrears']
        },
        {
          id: 'c12ac5', title: 'Issue and Redemption of Debentures',
          topics: ['Meaning of debentures', 'Issue of debentures', 'Debentures as collateral', 'Interest on debentures', 'Redemption methods'],
          keyTerms: ['Debenture', 'Coupon rate', 'Redemption', 'Sinking fund', 'Premium on redemption', 'Debenture trust deed']
        },
        {
          id: 'c12ac6', title: 'Financial Statements of a Company',
          topics: ['Meaning', 'Nature', 'Limitations', 'Balance sheet as per Companies Act', 'Statement of P&L'],
          keyTerms: ['Current assets', 'Non-current assets', 'Share capital', 'Reserves and surplus', 'Trade payables']
        },
        {
          id: 'c12ac7', title: 'Analysis of Financial Statements',
          topics: ['Objectives', 'Comparative financial statements', 'Common size statements', 'Trend analysis'],
          keyTerms: ['Comparative statement', 'Common size', 'Trend percentage', 'Horizontal analysis', 'Vertical analysis']
        },
        {
          id: 'c12ac8', title: 'Accounting Ratios',
          topics: ['Liquidity ratios', 'Solvency ratios', 'Activity ratios', 'Profitability ratios'],
          formulas: ['Current ratio = CA/CL', 'Quick ratio = (CA-Inventory)/CL', 'Gross profit ratio = GP/Net Sales × 100', 'Net profit ratio = NP/Net Sales × 100', 'Return on equity = NP/Shareholders\' equity × 100'],
          keyTerms: ['Liquidity', 'Solvency', 'Profitability', 'Activity', 'Current ratio', 'Debt-equity ratio']
        },
        {
          id: 'c12ac9', title: 'Cash Flow Statement',
          topics: ['Meaning and objectives', 'Classification of activities', 'Preparation of cash flow statement', 'Interpretation'],
          keyTerms: ['Operating activities', 'Investing activities', 'Financing activities', 'Cash equivalents', 'Cash flow']
        },
      ]
    },
    {
      name: 'Business Studies', slug: 'business-studies', icon: '💼', color: '#7c3400',
      chapters: [
        { id: 'c12bs1', title: 'Nature and Significance of Management', topics: ['Concept and nature of management', 'Characteristics', 'Objectives', 'Importance', 'Management as a science, art and profession', 'Management: levels and functions'] },
        { id: 'c12bs2', title: 'Principles of Management', topics: ['Nature of management principles', 'Fayol\'s principles', 'Taylor\'s scientific management'], keyTerms: ['Division of work', 'Authority', 'Discipline', 'Unity of command', 'Scalar chain', 'Scientific management'] },
        { id: 'c12bs3', title: 'Business Environment', topics: ['Concept and importance', 'Dimensions of business environment', 'Economic environment of business in India since 1991'] },
        { id: 'c12bs4', title: 'Planning', topics: ['Concept and importance', 'Limitations of planning', 'Planning process', 'Types of plans'] },
        { id: 'c12bs5', title: 'Organising', topics: ['Concept and importance', 'Organising process', 'Authority and responsibility', 'Delegation', 'Decentralisation', 'Formal and informal organisation'], keyTerms: ['Delegation', 'Decentralisation', 'Span of management', 'Accountability'] },
        { id: 'c12bs6', title: 'Staffing', topics: ['Concept and importance', 'Staffing as a part of HRM', 'Staffing process', 'Recruitment', 'Selection', 'Training and development'] },
        { id: 'c12bs7', title: 'Directing', topics: ['Concept and importance', 'Elements of directing', 'Motivation', 'Leadership', 'Communication'], formulas: ['Maslow\'s hierarchy of needs'] },
        { id: 'c12bs8', title: 'Controlling', topics: ['Concept and importance', 'Relationship between planning and controlling', 'Controlling process', 'Techniques of managerial control'] },
        { id: 'c12bs9', title: 'Financial Management', topics: ['Meaning and role of financial management', 'Financial decisions', 'Financial planning', 'Capital structure', 'Fixed capital', 'Working capital'], formulas: ['Trading on equity', 'EPS = PAT / Number of shares'] },
        { id: 'c12bs10', title: 'Financial Markets', topics: ['Concept of financial market', 'Money market', 'Capital market', 'Primary and secondary market', 'Stock exchange — BSE, NSE', 'SEBI'] },
        { id: 'c12bs11', title: 'Marketing Management', topics: ['Concept of marketing', 'Marketing mix (4Ps)', 'Product', 'Price', 'Place', 'Promotion', 'Consumer protection'], keyTerms: ['Marketing mix', '4Ps', 'Product life cycle', 'Branding', 'Packaging', 'Advertising'] },
        { id: 'c12bs12', title: 'Consumer Protection', topics: ['Importance of consumer protection', 'Consumer Protection Act 2019', 'Consumer rights', 'Consumer responsibilities', 'Consumer forums'] },
      ]
    },
    {
      name: 'Economics', slug: 'economics', icon: '💹', color: '#065f46',
      chapters: [
        { id: 'c12ec1', title: 'Introduction to Macroeconomics', topics: ['Emergence of macroeconomics', 'Context of Keynesian Theory', 'Circular flow of income'] },
        { id: 'c12ec2', title: 'National Income Accounting', topics: ['Some basic concepts', 'Circular flow of income', 'Methods of calculating national income', 'GDP and welfare'], formulas: ['GDP = C + I + G + (X-M)', 'NNP = GNP - Depreciation', 'National income = NNP - Indirect taxes + Subsidies'] },
        { id: 'c12ec3', title: 'Money and Banking', topics: ['Money: its meaning and functions', 'Supply of money: currency held by public', 'Money creation by banking system', 'Central bank', 'Instruments of monetary policy'] },
        { id: 'c12ec4', title: 'Determination of Income and Employment', topics: ['Aggregate demand and aggregate supply', 'Keynesian theory of income determination', 'Investment multiplier', 'Full employment and involuntary unemployment', 'Deflationary gap and inflationary gap'], formulas: ['Income = Consumption + Saving', 'MPC = ΔC/ΔY', 'MPS = ΔS/ΔY', 'MPC + MPS = 1', 'Multiplier = 1/(1-MPC)'] },
        { id: 'c12ec5', title: 'Government Budget and the Economy', topics: ['Government budget: meaning and objectives', 'Classification of receipts', 'Classification of expenditure', 'Balanced, surplus and deficit budgets', 'Revenue deficit', 'Fiscal deficit', 'Primary deficit'], formulas: ['Fiscal deficit = Total expenditure - Revenue receipts - Non-debt capital receipts', 'Primary deficit = Fiscal deficit - Interest payments'] },
        { id: 'c12ec6', title: 'Open Economy Macroeconomics', topics: ['The balance of payments', 'Foreign exchange market', 'Exchange rate determination', 'Fixed and flexible exchange rates'] },
        // Microeconomics
        { id: 'c12ec7', title: 'Introduction (Microeconomics)', topics: ['What is microeconomics?', 'Central problems of an economy', 'Production possibility frontier', 'Opportunity cost'] },
        { id: 'c12ec8', title: 'Theory of Consumer Behaviour', topics: ['Utility', 'Marginal utility', 'Law of diminishing marginal utility', 'Indifference curve', 'Budget line', 'Consumer equilibrium'], formulas: ['MUx/Px = MUy/Py (Cardinal)', 'MRSxy = Px/Py (Ordinal)'] },
        { id: 'c12ec9', title: 'Production and Costs', topics: ['Production function', 'Total product, average product, marginal product', 'Returns to a factor', 'Returns to scale', 'Costs: short run and long run'], formulas: ['TC = TFC + TVC', 'MC = ΔTC/ΔQ', 'ATC = TC/Q'] },
        { id: 'c12ec10', title: 'The Theory of the Firm Under Perfect Competition', topics: ['Price taking', 'Revenue', 'Profit maximisation', 'Supply curve', 'Shut down and break even point'], formulas: ['Profit = TR - TC', 'MR = MC (equilibrium)'] },
        { id: 'c12ec11', title: 'Market Equilibrium', topics: ['Equilibrium, excess demand and excess supply', 'Effects of shifts in demand and supply on equilibrium'] },
        { id: 'c12ec12', title: 'Non-Competitive Markets', topics: ['Simple monopoly', 'Monopolistic competition', 'Oligopoly'] },
      ]
    },
  ]
}

// Class 11 Humanities stream
export const CLASS_11_HUMANITIES: ClassSyllabus = {
  classLevel: '11',
  subjects: [
    {
      name: 'History', slug: 'history', icon: '📜', color: '#78350f',
      chapters: [
        { id: 'c11hi1', title: 'From the Beginning of Time', topics: ['Early humans', 'Human evolution', 'Time and geography', 'Hunters and gatherers', 'The first farmers'] },
        { id: 'c11hi2', title: 'Writing and City Life', topics: ['Mesopotamia', 'Uruk', 'Writing', 'Everyday life', 'Social groups'] },
        { id: 'c11hi3', title: 'An Empire Across Three Continents', topics: ['Roman Empire', 'Mediterranean world', 'Trade and economy', 'Roman slavery', 'Fall of Rome'] },
        { id: 'c11hi4', title: 'The Central Islamic Lands', topics: ['Arabia in 7th century', 'Islamic State', 'Economy', 'Society', 'Culture'] },
        { id: 'c11hi5', title: 'Nomadic Empires', topics: ['Mongols', 'Genghis Khan', 'Pax Mongolica', 'World history impact'] },
        { id: 'c11hi6', title: 'The Three Orders', topics: ['Medieval Europe', 'Feudalism', 'Church', 'Peasantry', 'Knights'] },
        { id: 'c11hi7', title: 'Changing Cultural Traditions', topics: ['Renaissance', 'Humanism', 'Art and architecture', 'Printing press', 'Reformation'] },
        { id: 'c11hi8', title: 'Confrontation of Cultures', topics: ['European exploration', 'Americas', 'Colonialism beginnings', 'Impact on indigenous peoples'] },
        { id: 'c11hi9', title: 'The Industrial Revolution', topics: ['Britain 1780-1850', 'New industrial society', 'Urbanisation', 'Workers\' movements', 'Global effects'] },
        { id: 'c11hi10', title: 'Displacing Indigenous Peoples', topics: ['North America', 'Australia', 'Colonialism and indigenous peoples', 'Loss of land', 'Cultural destruction'] },
        { id: 'c11hi11', title: 'Paths to Modernisation', topics: ['China', 'Japan', 'Meiji restoration', 'Modernisation vs westernisation'] },
      ]
    },
    {
      name: 'Political Science', slug: 'political-science', icon: '🏛️', color: '#1e3a5f',
      chapters: [
        { id: 'c11ps1', title: 'Political Theory: An Introduction', topics: ['What is politics?', 'Political theory', 'Why do we need political theory?', 'Political thought vs political theory'] },
        { id: 'c11ps2', title: 'Freedom', topics: ['Concept of freedom', 'Negative and positive freedom', 'Harm principle', 'Freedom of expression', 'Civil liberties'] },
        { id: 'c11ps3', title: 'Equality', topics: ['Forms of equality', 'Formal and real equality', 'Equal treatment vs equal opportunity', 'Policies to promote equality'] },
        { id: 'c11ps4', title: 'Social Justice', topics: ['Just distribution', 'John Rawls', 'Pursuits of social justice', 'Rights-based approach', 'Just institutions'] },
        { id: 'c11ps5', title: 'Rights', topics: ['Why do we need rights?', 'What are rights?', 'Where do rights come from?', 'Legal rights and the state'] },
        { id: 'c11ps6', title: 'Citizenship', topics: ['Citizenship as legal status', 'Citizenship as desirable activity', 'Challenges to citizenship', 'Global citizenship'] },
        { id: 'c11ps7', title: 'Nationalism', topics: ['Nation and state', 'National self-determination', 'National identity', 'Nationalism as a source of conflict'] },
        { id: 'c11ps8', title: 'Secularism', topics: ['What is secularism?', 'Types of secularism', 'Indian secularism', 'Problems with Indian secularism'] },
        { id: 'c11ps9', title: 'Peace', topics: ['Concept of peace', 'Sources of conflict', 'Violence and peace', 'Conflict resolution'] },
        { id: 'c11ps10', title: 'Development', topics: ['What is development?', 'Growth and development', 'Human development', 'Sustainable development', 'Alternatives'] },
      ]
    },
    {
      name: 'Geography', slug: 'geography', icon: '🌍', color: '#065f46',
      chapters: [
        { id: 'c11ge1', title: 'Geography as a Discipline', topics: ['Scope and nature of geography', 'Branches of geography', 'Geography and its relationship with other sciences'] },
        { id: 'c11ge2', title: 'The Origin and Evolution of the Earth', topics: ['Origin of the earth', 'Evolution of the earth', 'Interior of the earth', 'Composition of crust'] },
        { id: 'c11ge3', title: 'Interior of the Earth', topics: ['Sources of information', 'Earthquake waves', 'Structure of the earth', 'Rocks'] },
        { id: 'c11ge4', title: 'Distribution of Oceans and Continents', topics: ['Continental drift', 'Plate tectonics', 'Consequences of plate movement'] },
        { id: 'c11ge5', title: 'Minerals and Rocks', topics: ['Minerals', 'Types of rocks', 'Rock cycle', 'Importance of rocks'] },
        { id: 'c11ge6', title: 'Geomorphic Processes', topics: ['Endogenic and exogenic forces', 'Weathering', 'Erosion', 'Deposition', 'Landforms'] },
        { id: 'c11ge7', title: 'Landforms and their Evolution', topics: ['Work of running water', 'Work of wind', 'Work of glacier', 'Work of sea waves', 'Work of groundwater'] },
        { id: 'c11ge8', title: 'Composition and Structure of the Atmosphere', topics: ['Composition', 'Structure', 'Heating and cooling of atmosphere', 'Temperature distribution'] },
        { id: 'c11ge9', title: 'Solar Radiation, Heat Balance and Temperature', topics: ['Solar radiation', 'Heat budget', 'Temperature', 'Insolation'] },
        { id: 'c11ge10', title: 'Atmospheric Circulation and Weather Systems', topics: ['Pressure zones', 'Winds', 'Air masses', 'Fronts', 'Cyclones'] },
        { id: 'c11ge11', title: 'Water in the Atmosphere', topics: ['Evaporation and condensation', 'Humidity', 'Clouds', 'Precipitation', 'Types of rainfall'] },
        { id: 'c11ge12', title: 'World Climate and Climate Change', topics: ['Tropical climates', 'Sub-tropical climates', 'Temperate climates', 'Climate change', 'Global warming'] },
        { id: 'c11ge13', title: 'Water (Oceans)', topics: ['Oceans', 'Relief of ocean floor', 'Temperature and salinity', 'Ocean currents', 'Tides'] },
        { id: 'c11ge14', title: 'Movements of Ocean Water', topics: ['Waves', 'Tides', 'Ocean currents', 'Importance of ocean currents'] },
        { id: 'c11ge15', title: 'Life on the Earth', topics: ['Biosphere', 'Biodiversity', 'Importance of biodiversity', 'Threat to biodiversity'] },
        { id: 'c11ge16', title: 'Biodiversity and Conservation', topics: ['Biodiversity hotspots', 'Conservation strategies', 'Protected areas', 'Wildlife conservation'] },
      ]
    },
    {
      name: 'Sociology', slug: 'sociology', icon: '👥', color: '#4a1942',
      chapters: [
        { id: 'c11so1', title: 'Sociology and Society', topics: ['Sociology as a discipline', 'Relationship with other social sciences', 'Basic concepts: society, community, institution'] },
        { id: 'c11so2', title: 'Terms, Concepts and their Use in Sociology', topics: ['Social groups', 'Types of social groups', 'Social institutions', 'Social stratification'] },
        { id: 'c11so3', title: 'Understanding Social Institutions', topics: ['Family and kinship', 'The economy', 'Political institutions', 'Religion'] },
        { id: 'c11so4', title: 'Culture and Socialisation', topics: ['Culture', 'Socialisation', 'Agencies of socialisation', 'Cultural change'] },
        { id: 'c11so5', title: 'Doing Sociology: Research Methods', topics: ['Scientific method', 'Observation', 'Surveys', 'Interviews', 'Participant observation'] },
      ]
    },
  ]
}

export const CLASS_12_HUMANITIES: ClassSyllabus = {
  classLevel: '12',
  subjects: [
    {
      name: 'History', slug: 'history', icon: '📜', color: '#78350f',
      chapters: [
        { id: 'c12hi1', title: 'Bricks, Beads and Bones', topics: ['Harappan civilisation', 'Archaeological sources', 'Town planning', 'Crafts and trade', 'Burials'] },
        { id: 'c12hi2', title: 'Kings, Farmers and Towns', topics: ['Early states', 'Mahajanapadas', 'Taxation', 'Trade routes', 'Urban growth'] },
        { id: 'c12hi3', title: 'Kinship, Caste and Class', topics: ['Family and marriage', 'Social hierarchy', 'Mahabharata', 'Caste system', 'Gender roles'] },
        { id: 'c12hi4', title: 'Thinkers, Beliefs and Buildings', topics: ['Buddhism', 'Jainism', 'Upanishads', 'Temples and stupas', 'Bhakti ideas'] },
        { id: 'c12hi5', title: 'Through the Eyes of Travellers', topics: ['Al-Biruni', 'Ibn Battuta', 'Bernier', 'Travel writing', 'Social observations'] },
        { id: 'c12hi6', title: 'Bhakti-Sufi Traditions', topics: ['Devotional paths', 'Sufi silsilas', 'Saint poets', 'Social impact', 'Regional cultures'] },
        { id: 'c12hi7', title: 'An Imperial Capital: Vijayanagara', topics: ['City planning', 'Political power', 'Economy', 'Temples', 'Architecture'] },
        { id: 'c12hi8', title: 'Peasants, Zamindars and the State', topics: ['Mughal agrarian system', 'Revenue', 'Rural classes', 'Land rights', 'State control'] },
        { id: 'c12hi9', title: 'Colonialism and the Countryside', topics: ['Revenue settlements', 'Commercial crops', 'Peasant resistance', 'Indigo rebellion', 'Rural distress'] },
        { id: 'c12hi10', title: 'Rebels and the Raj', topics: ['1857 revolt', 'Causes and spread', 'Leaders', 'British response', 'Aftermath'] },
        { id: 'c12hi11', title: 'Mahatma Gandhi and the Nationalist Movement', topics: ['Mass mobilisation', 'Non-cooperation', 'Civil disobedience', 'Quit India', 'Local voices'] },
        { id: 'c12hi12', title: 'Framing the Constitution', topics: ['Constituent Assembly', 'Debates', 'Rights', 'Federalism', 'Nation building'] },
      ],
    },
    {
      name: 'Political Science', slug: 'political-science', icon: '🏛️', color: '#1e3a5f',
      chapters: [
        { id: 'c12ps1', title: 'The Cold War Era', topics: ['Bipolarity', 'US and USSR', 'Alliances', 'Crisis points', 'Non-alignment'] },
        { id: 'c12ps2', title: 'The End of Bipolarity', topics: ['Soviet disintegration', 'Post-Cold War changes', 'New world order', 'Russia', 'CIS'] },
        { id: 'c12ps3', title: 'US Hegemony in World Politics', topics: ['Meaning of hegemony', 'Military power', 'Economic power', 'Soft power', 'Challenges'] },
        { id: 'c12ps4', title: 'Alternative Centres of Power', topics: ['European Union', 'ASEAN', 'China', 'Regional blocs', 'Global influence'] },
        { id: 'c12ps5', title: 'Contemporary South Asia', topics: ['India and neighbours', 'Regional conflicts', 'Democracy in South Asia', 'Cooperation', 'Security'] },
        { id: 'c12ps6', title: 'International Organisations', topics: ['United Nations', 'Security Council', 'Peacekeeping', 'WTO', 'IMF and World Bank'] },
        { id: 'c12ps7', title: 'Security in the Contemporary World', topics: ['Traditional security', 'Non-traditional security', 'Human security', 'Terrorism', 'Global cooperation'] },
        { id: 'c12ps8', title: 'Environment and Natural Resources', topics: ['Global commons', 'Climate change', 'Resource politics', 'Sustainable development', 'International action'] },
        { id: 'c12ps9', title: 'Globalisation', topics: ['Meaning', 'Economic dimension', 'Political dimension', 'Cultural effects', 'Resistance to globalisation'] },
        { id: 'c12ps10', title: 'Challenges of Nation Building', topics: ['Partition', 'Integration of princely states', 'Linguistic issues', 'National identity', 'State formation'] },
        { id: 'c12ps11', title: 'Era of One-Party Dominance', topics: ['Congress system', 'Opposition politics', 'Elections', 'Policy direction', 'Political stability'] },
        { id: 'c12ps12', title: 'Politics of Planned Development', topics: ['Planning commission', 'Mixed economy', 'Land reforms', 'Industrial policy', 'State-led development'] },
        { id: 'c12ps13', title: 'India’s External Relations', topics: ['Neighbourhood policy', 'NAM', 'Wars and diplomacy', 'Foreign policy goals', 'Regional strategy'] },
        { id: 'c12ps14', title: 'Challenges to and Restoration of the Congress System', topics: ['Political contestation', 'Emergency background', 'Coalitions', 'Recovery of democracy', 'Opposition unity'] },
        { id: 'c12ps15', title: 'Recent Developments in Indian Politics', topics: ['Coalition era', 'Regional parties', 'Economic reforms', 'Social justice politics', 'Contemporary debates'] },
      ],
    },
    {
      name: 'Geography', slug: 'geography', icon: '🌍', color: '#065f46',
      chapters: [
        { id: 'c12geo1', title: 'Human Geography: Nature and Scope', topics: ['Meaning', 'Fields', 'Human-environment relationship', 'Branches', 'Current relevance'] },
        { id: 'c12geo2', title: 'The World Population', topics: ['Distribution', 'Density', 'Growth', 'Composition', 'Migration'] },
        { id: 'c12geo3', title: 'Human Development', topics: ['Indicators', 'Approaches', 'HDI', 'Regional disparities', 'Development goals'] },
        { id: 'c12geo4', title: 'Primary Activities', topics: ['Agriculture', 'Mining', 'Fishing', 'Gathering', 'Ranching'] },
        { id: 'c12geo5', title: 'Secondary Activities', topics: ['Manufacturing', 'Industry types', 'Industrial regions', 'Value addition', 'Technology'] },
        { id: 'c12geo6', title: 'Tertiary and Quaternary Activities', topics: ['Services', 'Transport', 'Trade', 'Knowledge economy', 'Digital services'] },
        { id: 'c12geo7', title: 'Transport and Communication', topics: ['Land transport', 'Water transport', 'Air transport', 'Communication systems', 'Global connectivity'] },
        { id: 'c12geo8', title: 'International Trade', topics: ['Basis of trade', 'Trade balance', 'Ports', 'Trade blocs', 'World patterns'] },
        { id: 'c12geo9', title: 'Human Settlements', topics: ['Rural settlements', 'Urban settlements', 'Settlement hierarchy', 'Planning', 'Problems of cities'] },
        { id: 'c12geo10', title: 'Population: Distribution, Density, Growth and Composition', topics: ['India population patterns', 'Density', 'Growth phases', 'Sex ratio', 'Literacy'] },
        { id: 'c12geo11', title: 'Migration: Types, Causes and Consequences', topics: ['Internal migration', 'International migration', 'Push-pull factors', 'Urbanisation', 'Regional effects'] },
        { id: 'c12geo12', title: 'Human Settlements in India', topics: ['Rural settlement pattern', 'Urban system', 'Metropolitan growth', 'Slums', 'Smart planning'] },
        { id: 'c12geo13', title: 'Land Resources and Agriculture', topics: ['Land use', 'Cropping patterns', 'Irrigation', 'Food security', 'Agricultural issues'] },
        { id: 'c12geo14', title: 'Water Resources', topics: ['Availability', 'Utilisation', 'Conservation', 'Inter-state issues', 'Water management'] },
        { id: 'c12geo15', title: 'Planning and Sustainable Development in India', topics: ['Case studies', 'Regional planning', 'Environmental concerns', 'Resource management', 'Sustainable models'] },
      ],
    },
    {
      name: 'Sociology', slug: 'sociology', icon: '👥', color: '#4a1942',
      chapters: [
        { id: 'c12soc1', title: 'Introducing Indian Society', topics: ['Plurality and diversity', 'Unity and difference', 'Identity', 'Social institutions', 'Changing society'] },
        { id: 'c12soc2', title: 'The Demographic Structure of the Indian Society', topics: ['Population changes', 'Age structure', 'Sex ratio', 'Dependency', 'Social implications'] },
        { id: 'c12soc3', title: 'Social Institutions: Continuity and Change', topics: ['Family', 'Marriage', 'Kinship', 'Caste', 'Community and transformation'] },
        { id: 'c12soc4', title: 'The Market as a Social Institution', topics: ['Markets and society', 'Weekly markets', 'Liberalisation', 'Consumption', 'Inequality'] },
        { id: 'c12soc5', title: 'Patterns of Social Inequality and Exclusion', topics: ['Caste inequality', 'Tribal issues', 'Gender exclusion', 'Poverty', 'Marginalisation'] },
        { id: 'c12soc6', title: 'Challenges of Cultural Diversity', topics: ['Regionalism', 'Communalism', 'Minority rights', 'Assimilation', 'Pluralism'] },
        { id: 'c12soc7', title: 'Suggestions for Project Work', topics: ['Fieldwork', 'Survey design', 'Interviews', 'Ethics', 'Report writing'] },
        { id: 'c12soc8', title: 'Structural Change', topics: ['Colonialism and social change', 'Industrialisation', 'Urbanisation', 'Globalisation', 'Labour shifts'] },
        { id: 'c12soc9', title: 'Cultural Change', topics: ['Sanskritisation', 'Westernisation', 'Secularisation', 'Modernisation', 'Media influence'] },
        { id: 'c12soc10', title: 'The Story of Indian Democracy', topics: ['Democratic rights', 'Citizenship', 'Participation', 'Institutions', 'Social justice'] },
        { id: 'c12soc11', title: 'Change and Development in Rural Society', topics: ['Land reforms', 'Rural class structure', 'Green revolution', 'Panchayati raj', 'Rural distress'] },
        { id: 'c12soc12', title: 'Change and Development in Industrial Society', topics: ['Workers', 'Informal sector', 'Labour laws', 'Migration', 'Industrial relations'] },
        { id: 'c12soc13', title: 'Globalisation and Social Change', topics: ['Communication', 'Identity', 'Consumer culture', 'Work patterns', 'Social impact'] },
        { id: 'c12soc14', title: 'Mass Media and Communications', topics: ['Media institutions', 'Public opinion', 'Advertising', 'Digital media', 'Representation'] },
        { id: 'c12soc15', title: 'Social Movements', topics: ['Environmental movements', 'Women’s movement', 'Dalit movement', 'Tribal movements', 'Civil society'] },
      ],
    },
  ],
}
