import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config({ path: '.env.local' })
import { prisma } from '../lib/prisma.js'

const posts = [
  {
    slug: "bank-reconciliation-best-practices",
    title: "Bank Reconciliation Best Practices Every Business Should Follow",
    country: "General",
    category: "Reconciliation",
    publishedAt: new Date("2026-02-28"),
    excerpt: "A step-by-step guide to monthly bank reconciliation that reduces errors, catches fraud early, and keeps your books clean.",
    content: "<h2>Why Bank Reconciliation Matters</h2><p>Bank reconciliation is one of the most critical internal controls in any accounting workflow. Done correctly and consistently, it catches discrepancies before they become expensive problems and provides an early warning system for fraud.</p><h2>Step 1: Gather Your Documents</h2><p>Before starting, collect your bank statement for the period and your internal cash book or accounting software ledger. Both must cover the same date range without exception.</p><h2>Step 2: Match Transactions Line by Line</h2><p>Go through your bank statement and tick off each transaction that matches your ledger. Common items that will not match immediately include outstanding cheques not yet cleared, deposits in transit, and bank fees not yet recorded in your ledger.</p><h2>Step 3: Investigate Every Discrepancy</h2><p>Any unmatched item requires investigation and a documented explanation. Common causes include timing differences, data entry errors, duplicate entries, or unauthorized transactions. Never leave an unexplained variance — it should always have a documented reason before you sign off.</p><h2>Step 4: Adjust Your Records</h2><p>Record any bank charges, interest income, or corrections your ledger is missing. Update your cash book to match the reconciled balance.</p><h2>Step 5: Document and Get a Second Pair of Eyes</h2><p>Save the completed reconciliation. Have a second person review it. This segregation of duties is among the most effective fraud prevention controls available to small businesses.</p>"
  },
  {
    slug: "intercompany-reconciliation-guide",
    title: "Intercompany Reconciliation: Eliminating Mismatches Before Consolidation",
    country: "General",
    category: "Reconciliation",
    publishedAt: new Date("2026-02-10"),
    excerpt: "Intercompany mismatches are the most common cause of consolidation delays. Here is how to eliminate them systematically.",
    content: "<h2>What Is Intercompany Reconciliation?</h2><p>When entities within the same group trade with each other, the same transaction appears in two sets of books. One entity records a receivable while the other records a payable. These must match precisely before group accounts can be consolidated.</p><h2>Why Mismatches Happen</h2><p>Timing differences are the most common cause — one entity records the transaction in one month while the other records it in the next. Currency translation differences, disputed charges, and invoices received late all contribute.</p><h2>Building a Reconciliation Matrix</h2><p>Create a matrix mapping every intercompany relationship. For each pair of entities, track the outstanding receivable and payable balance monthly. Any difference beyond your materiality threshold must be investigated and resolved before month-end close.</p><h2>Establishing a Clear Resolution Protocol</h2><p>Define who resolves disputes — typically the entity that initiated the transaction. Set a firm resolution deadline early in the following month. Unresolved items should escalate to the Group Finance Director automatically with full documentation.</p>"
  },
  {
    slug: "accounts-payable-workflow-efficiency",
    title: "How to Build an Efficient Accounts Payable Workflow",
    country: "General",
    category: "AP & AR",
    publishedAt: new Date("2026-02-25"),
    excerpt: "Reduce invoice processing time and vendor payment errors with a structured AP workflow that scales with your business.",
    content: "<h2>The True Cost of a Broken AP Process</h2><p>Late payments damage vendor relationships and attract penalty charges. Duplicate payments cost businesses thousands every year. A structured workflow eliminates both risks at once.</p><h2>Centralised Invoice Receipt</h2><p>All invoices should arrive at one dedicated email address or system. Scattered inboxes create missed invoices and approval bottlenecks. Route all vendor correspondence to a single shared inbox.</p><h2>Three-Way Matching Before Every Payment</h2><p>Match every invoice against the corresponding purchase order and goods receipt note before approving payment. This single control prevents the majority of AP fraud and errors. No three-way match, no payment authorisation.</p><h2>Defined Approval Hierarchy</h2><p>Set clear spending thresholds. Low-value invoices may auto-approve. Above each threshold, require the appropriate level of management sign-off. Document this policy and review it annually.</p><h2>Scheduled Payment Runs</h2><p>Batch payments on fixed days rather than ad-hoc. This simplifies cash flow forecasting, reduces bank transaction fees, and makes it easier to spot anomalies in outgoing payments.</p>"
  },
  {
    slug: "ar-collections-reduce-debtor-days",
    title: "Accounts Receivable: How to Reduce Debtor Days Without Damaging Relationships",
    country: "General",
    category: "AP & AR",
    publishedAt: new Date("2026-02-08"),
    excerpt: "High debtor days destroy cash flow. These strategies help you get paid faster while keeping client relationships intact.",
    content: "<h2>Understanding Debtor Days</h2><p>Debtor days — also called Days Sales Outstanding — measures how long on average it takes to collect payment after raising an invoice. Under 30 days is the target for most service businesses. Every extra day beyond your stated terms is effectively an interest-free loan to that customer.</p><h2>Invoice at the Moment of Delivery</h2><p>Every day between delivering a service and raising the invoice unnecessarily inflates your debtor days. Automate invoicing at the point of delivery where possible. In service businesses, invoice on the final day of the billing period.</p><h2>Make Payment Instructions Frictionless</h2><p>State the exact due date on every invoice — not just payment terms. Include bank details, IBAN, sort code, and every accepted payment method. Every piece of friction in your payment instructions adds days to your collection cycle.</p><h2>Automated, Consistent Reminders</h2><p>Set reminders to fire automatically at 7 days before due date, on the due date, and at 7, 14, and 30 days overdue. Automation removes the emotional hesitation from chasing. Consistent, professional reminders do not damage relationships.</p>"
  },
  {
    slug: "payroll-compliance-global-teams",
    title: "Payroll Compliance Checklist for Businesses With Global Teams",
    country: "General",
    category: "Payroll",
    publishedAt: new Date("2026-02-22"),
    excerpt: "Operating across multiple countries means multiple payroll obligations. This checklist keeps you compliant in US, UK, AU, and CA.",
    content: "<h2>Why Global Payroll Is Complex</h2><p>Each jurisdiction has its own tax regime, filing deadlines, minimum wage laws, and classification rules. A mistake in one jurisdiction can cascade into penalties, back payments, and audits across the entire group.</p><h2>Employee vs Contractor Classification</h2><p>Misclassification is the most common and costly payroll error globally. The classification test differs materially by jurisdiction — a worker who qualifies as a contractor in the UK may legally be an employee in Australia under different statutory criteria. Review each jurisdiction independently.</p><h2>Tax Withholding Accuracy</h2><p>Income tax, social security equivalents, and local levies must be withheld at current rates. Rates change annually. Verify all rates before the first payroll run of each new tax year without exception.</p><h2>Year-End Filing Obligations</h2><p>W-2 (US by January 31), P60 (UK by May 31), Payment Summary (AU by July 14), and T4 (CA by end of February) must be issued on time. Missing these deadlines triggers immediate penalties in most jurisdictions.</p>"
  },
  {
    slug: "payroll-year-end-preparation",
    title: "Payroll Year-End Preparation: A Step-by-Step Guide",
    country: "General",
    category: "Payroll",
    publishedAt: new Date("2026-02-05"),
    excerpt: "Year-end payroll has the most penalty-heavy deadlines in the payroll calendar. This guide ensures you close the year cleanly.",
    content: "<h2>Start Eight Weeks Before Your Deadline</h2><p>The most common cause of payroll penalties is not complexity — it is leaving preparation too late. Start reconciling records, verifying employee data, and preparing filings eight weeks before your submission deadline.</p><h2>Reconcile Payroll to Accounting Records</h2><p>Your total payroll expense in the accounting system must reconcile exactly to your payroll reports. Gross pay, employer taxes, pension contributions, and all employee deductions must tie out precisely before submitting any year-end filing.</p><h2>Verify All Employee Data</h2><p>Confirm all employee addresses, tax reference numbers, and national insurance or social security numbers are current and accurate. Year-end forms returned as undeliverable or rejected by tax authorities create significant rework and potential penalties.</p><h2>Issue Year-End Documents on Time</h2><p>Build statutory deadlines into your team calendar now: W-2s (US, January 31), P60s (UK, May 31), Payment Summaries (AU, July 14), T4s (CA, end of February). Late issuance attracts penalties in every jurisdiction.</p>"
  },
  {
    slug: "outsourced-accounting-cost-comparison",
    title: "Outsourced Accounting vs In-House: An Honest Cost Comparison",
    country: "General",
    category: "Bookkeeping",
    publishedAt: new Date("2026-02-20"),
    excerpt: "Most owners calculate in-house bookkeeping cost as salary only. The real number is 30-40% higher. Here is the honest comparison.",
    content: "<h2>The Hidden Costs of In-House Bookkeeping</h2><p>Salary is just the starting point. Add employer taxes (12-15% of salary), pension contributions, paid leave cover, training costs, software licences, and management oversight time. A bookkeeper earning £32,000 typically costs £40,000-£44,000 all-in annually once every cost is accounted for honestly.</p><h2>What Outsourced Bookkeeping Costs at Your Volume</h2><p>For a small business with under 300 monthly transactions, outsourced bookkeeping typically ranges from £400-£900 per month. At £650 per month that is £7,800 annually — a substantial saving at equivalent or higher output quality.</p><h2>Risk, Coverage, and Quality Differences</h2><p>An outsourced provider brings a team rather than one person. No holiday cover needed. No knowledge loss when someone leaves. Multiple reviewers catch errors that a single bookkeeper checking their own work will consistently miss.</p><h2>When In-House Starts to Make Economic Sense</h2><p>Above approximately 600 transactions per month, or when constant real-time financial access throughout the working day is genuinely essential, the economics can shift toward in-house. Run the comparison honestly at your actual transaction volume before deciding.</p>"
  },
  {
    slug: "cloud-accounting-software-comparison-2026",
    title: "QuickBooks vs Xero vs Alternatives: Which Is Right in 2026?",
    country: "General",
    category: "Bookkeeping",
    publishedAt: new Date("2026-02-03"),
    excerpt: "QuickBooks, Xero, FreshBooks, and Sage compared objectively — the right choice depends on your country, size, and workflow.",
    content: "<h2>QuickBooks Online</h2><p>The dominant platform in the US market with the deepest integration into US tax workflows, payroll systems, and accountant networks. Best for US-based businesses needing strong payroll integration and highly customisable reporting. From $18/month for Simple Start. The US version is the strongest product — the international versions have gaps.</p><h2>Xero</h2><p>The preferred platform in Australia, New Zealand, and the UK. Widely regarded as having the cleanest bank reconciliation interface available. Over 800 third-party integrations. Multi-currency included in mid-tier plans. Best for businesses operating internationally or in AU, NZ, and UK markets. From $20/month.</p><h2>FreshBooks</h2><p>Best for service businesses and freelancers who invoice clients and need time tracking. Simpler than QuickBooks or Xero with a clear focus on project billing. Not suitable for product-based businesses or those needing detailed inventory or manufacturing accounting.</p><h2>Our Recommendation by Market</h2><p>US business: QuickBooks. AU, NZ, UK: Xero. Multi-country operations: Xero for its currency and integration strength. Canada: either works — choose based on your accountant's preference as both have strong Canadian versions.</p>"
  },
  {
    slug: "cash-flow-forecasting-small-business",
    title: "Cash Flow Forecasting: A Practical Guide for Small Business Owners",
    country: "General",
    category: "Advisory",
    publishedAt: new Date("2026-02-18"),
    excerpt: "Most small businesses fail not because they are unprofitable but because they run out of cash. Here is how to build a reliable forecast.",
    content: "<h2>Profit Is Not Cash — Understand This First</h2><p>You can be profitable on paper while simultaneously running out of money to pay next month's wages. This is the most important distinction in small business finance. Cash flow forecasting is how you bridge this gap before it becomes a crisis.</p><h2>The 13-Week Rolling Forecast</h2><p>A 13-week forecast is the most practical tool for operational cash management. It is short enough to be meaningfully accurate and long enough to give you actionable lead time to address gaps before they become emergencies.</p><h2>Map Inflows Based on Actual Collection History</h2><p>List expected customer payments — not invoices raised. If your terms are 30 days but customers typically pay at 45, use 45 days in your model. Optimism in cash flow forecasts is expensive. Build your model on what actually happens.</p><h2>Capture Every Outflow Category</h2><p>Cover all fixed payments and variable costs. Do not forget quarterly or annual payments — insurance, estimated tax instalments, licences, maintenance contracts. These irregular items are the ones that ambush unprepared businesses.</p><h2>Identify Gaps Early Enough to Act</h2><p>A negative closing balance in any future week is an early warning. Identifying the gap 6 weeks out gives you time to accelerate collections, defer discretionary spending, arrange a facility, or delay non-critical payables. Waiting until you are already in the gap eliminates most of your options.</p>"
  },
  {
    slug: "financial-kpis-monthly-review",
    title: "10 Financial KPIs Every Business Owner Should Review Monthly",
    country: "General",
    category: "Advisory",
    publishedAt: new Date("2026-01-31"),
    excerpt: "Knowing which numbers to watch each month is the difference between reactive and proactive financial management.",
    content: "<h2>1. Gross Profit Margin</h2><p>Revenue minus direct costs divided by revenue. Track monthly and investigate any movement greater than 2 percentage points — it signals a pricing or input cost issue that compounds rapidly if left unaddressed.</p><h2>2. Net Profit Margin</h2><p>After all overheads. A declining net margin with a stable gross margin points specifically to overhead growth — identify it early before it becomes structural.</p><h2>3. Current Ratio</h2><p>Current assets divided by current liabilities. Below 1.0 means short-term obligations cannot be covered by short-term assets. The warning zone for most service businesses starts below 1.2.</p><h2>4. Debtor Days</h2><p>Rising debtor days signal either a collections process problem or deteriorating customer payment behaviour. Both require immediate investigation and action.</p><h2>5. Burn Rate and Runway</h2><p>For funded businesses: monthly net cash consumption combined with current cash reserves tells you your precise runway. Know this number at all times.</p><h2>6. Budget vs Actual Variance</h2><p>Every major P&L line should be tracked against budget. A variance above 10% in either direction should have a documented explanation that informs the next period's forecast adjustments.</p>"
  },
  {
    slug: "tax-year-round-planning",
    title: "Year-Round Tax Planning Strategies That Actually Save Money",
    country: "General",
    category: "Tax & Compliance",
    publishedAt: new Date("2026-02-16"),
    excerpt: "Tax planning done only at year-end leaves legitimate money on the table. These strategies are embedded throughout the year.",
    content: "<h2>The Year-Round Mindset</h2><p>Strategic tax planning is not an end-of-year exercise. It is embedded into how you record transactions, time purchases, and structure decisions throughout the year. The accountants who add the most value review their clients' tax position quarterly, not in the week before a deadline.</p><h2>Completely Separate Business and Personal</h2><p>A dedicated business bank account and business credit card ensure every business expense is captured and defensible under audit. Mixed accounts create risk and almost always result in legitimate deductions being missed because the record-keeping is inadequate.</p><h2>Track Deductible Expenses at Point of Entry</h2><p>Categorise every expense in your accounting software as it occurs — not at year-end. The categories that generate the highest value deductions and the most audit risk are home office, vehicle use, professional subscriptions, equipment, and professional development.</p><h2>Retirement and Pension Contributions</h2><p>Additional superannuation contributions (AU), pension contributions (UK), SEP-IRA or Solo 401(k) contributions (US) are among the highest-value tax strategies available to business owners. Most are use-it-or-lose-it by tax year. Plan for these in Q3, not March.</p>"
  },
  {
    slug: "chart-of-accounts-setup",
    title: "How to Set Up a Chart of Accounts That Scales With Your Business",
    country: "General",
    category: "Tax & Compliance",
    publishedAt: new Date("2026-01-28"),
    excerpt: "A well-structured chart of accounts is the foundation of all useful financial reporting. Getting it right saves years of rework.",
    content: "<h2>What Is a Chart of Accounts?</h2><p>The chart of accounts is the complete list of categories used to record every financial transaction. Every line on your profit and loss statement and balance sheet traces back to COA categories. A poorly structured COA produces unreliable management reports regardless of how accurately individual transactions are recorded.</p><h2>Standard Numbering Convention</h2><p>Use this range: Assets 1000s, Liabilities 2000s, Equity 3000s, Revenue 4000s, Cost of Sales 5000s, Operating Expenses 6000-7000s, Other 8000-9000s. Numbering consistently in these ranges makes reports readable and comparable across financial periods.</p><h2>Keep It Deliberately Lean</h2><p>The most common mistake is creating too many categories. A COA with 200 accounts is harder to maintain and produces less useful reports than one with 50 well-chosen accounts. Apply this test: will I make a different business decision with this level of detail? If not, merge the categories.</p><h2>Review and Prune Annually</h2><p>Archive accounts with no activity for two years. Add new accounts only when an existing category genuinely cannot accommodate a new transaction type. A COA that grows without pruning becomes unusable within three years.</p>"
  },
  {
    slug: "accounting-data-security",
    title: "Protecting Financial Data: Security Controls Every Accounting Team Needs",
    country: "General",
    category: "Data Security",
    publishedAt: new Date("2026-02-14"),
    excerpt: "Financial data is among the most targeted in cyberattacks. These controls protect your systems and client data.",
    content: "<h2>Why Accounting Data Is a Priority Target</h2><p>Accounting systems hold bank details, payroll data, tax information, and client financials. A single breach results in regulatory penalties, potential financial fraud, and reputational damage that takes years to recover from. The threat is real and growing.</p><h2>Minimum Access Principle</h2><p>Every user should have the minimum access level needed to perform their role — nothing more. Review permissions quarterly without exception. Remove former employees from all systems on their last working day, not at a future convenient time.</p><h2>Multi-Factor Authentication Without Exceptions</h2><p>Enable MFA on every accounting system, email account, cloud storage platform, and banking portal. This single control prevents the large majority of credential-based attacks. Senior staff are the primary targets of social engineering — they need MFA most.</p><h2>Business Email Compromise Awareness</h2><p>Finance teams are specifically targeted with fraudulent emails impersonating executives requesting urgent wire transfers. Establish an unbreakable policy: any payment instruction received via email must be verbally confirmed before processing, regardless of who appears to be requesting it.</p>"
  },
  {
    slug: "gdpr-financial-data-uk",
    title: "GDPR and Financial Data: What UK Firms Must Have in Place",
    country: "UK",
    category: "Data Security",
    publishedAt: new Date("2026-02-11"),
    excerpt: "Handling client financial data under UK GDPR requires specific documented controls. This guide covers what your firm needs.",
    content: "<h2>Financial Data Under UK GDPR</h2><p>Client financial data processed by accounting firms falls squarely within UK GDPR scope. Firms must have a documented lawful basis for every category of processing, adequate security measures, and clear data retention policies aligned with HMRC and Companies Act requirements.</p><h2>Lawful Basis for Processing</h2><p>Accounting firms typically rely on Article 6(1)(b) contractual necessity for service delivery processing and Article 6(1)(c) legal obligation for regulatory compliance processing. Document your lawful basis for each category in your Record of Processing Activities before an ICO enquiry forces you to construct it retrospectively.</p><h2>Data Retention Must Align With Legal Requirements</h2><p>HMRC requires business records to be retained for at least 6 years from the end of the accounting period. Your data retention policy must meet this minimum and specify a documented, auditable deletion process for data that has passed its retention period.</p><h2>Data Processor Agreements Are Mandatory</h2><p>Every cloud platform processing client data on your behalf requires a Data Processing Agreement. This includes your accounting software provider, document management system, and any payroll platform. Verify these agreements exist before using any new technology platform with client data.</p>"
  },
  {
    slug: "ato-audit-risk-reduction-australia",
    title: "How to Reduce Your ATO Audit Risk: A Guide for Australian Businesses",
    country: "AU",
    category: "Tax & Compliance",
    publishedAt: new Date("2026-02-09"),
    excerpt: "The ATO uses sophisticated data matching. These practices keep your tax position defensible and reduce audit probability.",
    content: "<h2>How the ATO Selects Returns for Review</h2><p>The ATO uses data matching across bank accounts, third-party reports from employers and financial institutions, and published industry benchmarks to identify returns that appear inconsistent. Understanding what triggers ATO attention is the first step in managing your audit risk profile.</p><h2>Know Your Industry Benchmarks</h2><p>The ATO publishes small business benchmarks for gross profit ratios, turnover ranges, and cost percentages across hundreds of industries. If your figures fall outside the benchmark range, your return is automatically flagged for additional scrutiny. Review your position against the relevant benchmark before every lodgement.</p><h2>Work-Related Expenses Require Contemporaneous Records</h2><p>The ATO consistently identifies excessive work-related expense claims as a compliance focus. Maintain records at the time of the expense — receipts when purchased, a logbook for vehicle claims, and a diary for home office use. Reconstructed records are not accepted and their absence significantly increases penalty exposure.</p><h2>Respond Promptly and Completely to Any ATO Contact</h2><p>If you receive an ATO enquiry, respond within the timeframe given with complete documentation. Delayed or incomplete responses signal non-cooperation and typically escalate a routine data-matching review to a full examination.</p>"
  },
  {
    slug: "cra-my-business-account-guide-canada",
    title: "CRA My Business Account: Features Every Canadian Business Should Be Using",
    country: "CA",
    category: "Bookkeeping",
    publishedAt: new Date("2026-02-13"),
    excerpt: "CRA's My Business Account has expanded significantly. These features save time and reduce errors in your tax compliance.",
    content: "<h2>What Is My Business Account?</h2><p>My Business Account (MyBA) is the CRA's secure online portal for business tax management. It provides direct access to your GST/HST, payroll, and corporate tax accounts without waiting on hold or mailing paper correspondence.</p><h2>File Returns Directly and Get Instant Confirmation</h2><p>GST/HST returns, payroll remittance forms (PD7A), and T4 slips can all be filed directly through MyBA. Direct filing confirms receipt immediately and creates a permanent audit trail of your submission.</p><h2>Monitor Your Account Position in Real Time</h2><p>MyBA shows current account balances, outstanding returns, and payment history across all CRA program accounts. Discrepancies between your internal records and CRA's are visible immediately — catching these early prevents interest and penalties from accumulating.</p><h2>Manage Representative Access Properly</h2><p>Authorise your accountant or bookkeeper as a representative directly in MyBA with appropriate access levels — without sharing your own login credentials. Review and update authorized representatives annually and remove access immediately when professional relationships end.</p>"
  }
]

async function main() {
  try {
    await prisma.blog.deleteMany({})

    for (const post of posts) {
      await prisma.blog.upsert({
        where: { slug: post.slug },
        update: {},
        create: {
          slug: post.slug,
          title: post.title,
          country: post.country,
          category: post.category,
          publishedAt: post.publishedAt,
          excerpt: post.excerpt,
          content: post.content,
          status: 'published',
          coverImage: null
        }
      })

      console.log(`Upserted blog: ${post.slug}`)
    }
  } catch (error) {
    console.error('Error seeding blog posts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
