import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/1170/1170678.png", // Money
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Bank
  "https://cdn-icons-png.flaticon.com/512/3081/3081712.png", // Tax
  "https://cdn-icons-png.flaticon.com/512/3135/3135712.png", // Investment
];

const Finance = () => {
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hero image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // General comment submission (just logs for now)
  const handleGeneralComment = async (e) => {
    e.preventDefault();
    if (!generalComment.name || !generalComment.text) return;
    alert("✅ Comment submitted successfully!");
    setGeneralComment({ name: "", text: "" });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative grid md:grid-cols-2 gap-8 items-center py-20 px-6 bg-gradient-to-r from-cyan-600/40 to-fuchsia-700/40 backdrop-blur-sm"
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Finance & Taxation Made Easy
            </h1>
            <p className="mt-4 max-w-xl text-lg text-fuchsia-100">
              From tax planning to business loans, we guide your finances every step.
            </p>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <a
                href="#process"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold shadow hover:shadow-cyan-400/40 transition"
              >
                Learn Process
              </a>
              <a
                href="#about"
                className="px-6 py-3 rounded-xl border border-white/20 bg-black/30 text-white font-semibold hover:bg-white/10 transition"
              >
                About Finance
              </a>
            </div>
          </div>

          {/* Rotating Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={heroImages[currentIndex]}
              alt="Finance Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* Finance Process Section */}
        <motion.section
          id="process"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl p-8 mb-12 max-w-4xl mx-auto mt-20"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            Finance & Taxation Process
          </h1>
          <ol className="space-y-4 text-fuchsia-100">
            {[
              "Evaluate business structure for tax planning.",
              "Register for GST, TAN, and PAN as required.",
              "Set up proper accounting systems (bookkeeping, ERP).",
              "Ensure TDS and GST compliance with periodic filing.",
              "Prepare financial statements and reports.",
              "Audit compliance (Statutory, Internal, Tax audit).",
              "Apply for business loans or credit facilities.",
              "Plan investments and tax-saving strategies.",
            ].map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* About Finance Section (1000 words) */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-cyan-300">
            About Finance & Taxation
          </h2>
        <div className="prose prose-lg max-w-none text-fuchsia-100 leading-relaxed">
  <p>
    Finance and taxation are two of the most critical pillars of any successful business or personal financial journey. Proper financial management ensures that resources are allocated efficiently, risks are mitigated, and growth opportunities are maximized. At its core, finance involves planning, organizing, controlling, and monitoring monetary resources, while taxation ensures compliance with the legal framework imposed by the government. Together, they form the foundation for economic stability and prosperity.
  </p>
  <p>
    Effective financial planning starts with a deep understanding of cash flow—the inflow and outflow of money within an organization. Businesses must maintain a careful balance between income, expenditures, investments, and savings. Budgeting is the first essential step, providing a roadmap for all financial activities. Forecasting allows organizations to anticipate future needs and make informed decisions about resource allocation. Risk management is another crucial aspect, ensuring that unexpected financial shocks, such as economic downturns or market volatility, do not jeopardize stability.
  </p>
  <p>
    Taxation, on the other hand, is an unavoidable aspect of both personal and corporate finance. Governments levy various taxes, such as income tax, goods and services tax (GST), corporate tax, and others, to fund public services and infrastructure. Compliance with these regulations is not only a legal obligation but also critical for maintaining credibility and avoiding penalties. For businesses, accurate record-keeping, timely filing of returns, and understanding applicable exemptions and deductions can optimize tax liability and improve cash flow.
  </p>
  <p>
    One of the most significant aspects of modern finance is accounting. Proper bookkeeping ensures that every transaction is recorded accurately, providing transparency and insights into financial health. Whether it’s managing accounts payable, accounts receivable, payroll, or inventory, a well-maintained accounting system helps businesses track performance, identify inefficiencies, and make strategic decisions. Many organizations now rely on advanced software and ERP systems to automate these processes, reducing human error and saving valuable time.
  </p>
  <p>
    Investment planning is another critical component. Businesses and individuals must identify opportunities to grow wealth while managing risk. Diversification across assets such as stocks, bonds, mutual funds, real estate, and other instruments helps spread risk. Strategic investment decisions require careful analysis of market trends, economic indicators, and organizational goals. For small businesses, investments might also include upgrading technology, expanding operations, or hiring skilled personnel to drive long-term growth.
  </p>
  <p>
    Tax planning goes hand-in-hand with financial planning. By understanding tax regulations and available incentives, organizations can optimize their liabilities legally. For instance, certain business expenses are deductible, and investments in specific sectors may offer tax benefits. Planning ahead allows businesses to minimize unexpected tax burdens and maintain sufficient liquidity to fund operations and expansion.
  </p>
  <p>
    Another vital aspect of finance is compliance. Businesses are often subject to statutory audits, internal audits, and tax audits to ensure that accounting practices are accurate and legal requirements are met. Regular audits help identify discrepancies early, mitigate fraud, and reinforce stakeholder confidence. For companies operating internationally, understanding cross-border taxation, transfer pricing, and global financial regulations adds another layer of complexity but is crucial for sustainable growth.
  </p>
  <p>
    For individuals, personal finance involves budgeting, saving, investing, and tax planning to achieve financial goals. Managing debt, understanding credit scores, and planning for retirement are all essential elements. Personal taxation also requires compliance with income tax laws, timely filing of returns, and taking advantage of deductions and exemptions. Smart financial habits, combined with informed investment decisions, can lead to long-term wealth creation and financial security.
  </p>
  <p>
    Business loans and credit facilities are frequently used to support growth. Whether it’s securing working capital, financing expansion projects, or purchasing equipment, understanding the terms and costs associated with loans is critical. Financial literacy ensures that businesses do not over-leverage themselves and can manage repayment obligations without compromising operations.
  </p>
  <p>
    Technology has transformed the landscape of finance and taxation. Online banking, automated accounting software, digital wallets, and cloud-based financial systems have streamlined operations and increased efficiency. Businesses can now access real-time financial data, monitor cash flow, generate reports, and comply with tax regulations more effectively than ever before. This digital transformation also enables better decision-making through data analytics, predictive modeling, and scenario planning.
  </p>
  <p>
    Beyond compliance and growth, finance and taxation also play a strategic role in organizational decision-making. Whether planning for mergers, acquisitions, expansions, or investments, financial insights provide the foundation for informed decisions. Understanding taxation implications in every scenario ensures that decisions are optimized for profitability and sustainability. Similarly, proper financial planning ensures that businesses can withstand economic shocks and adapt to changing market conditions.
  </p>
  <p>
    In conclusion, finance and taxation are inseparable elements that determine the success of businesses and the financial well-being of individuals. A strong grasp of financial management principles, combined with thorough knowledge of taxation laws, enables strategic decision-making, risk mitigation, and growth optimization. Organizations that prioritize transparent accounting, rigorous compliance, and effective planning are better positioned to thrive in today’s dynamic economy. Whether you are a small business owner, an entrepreneur, or an individual planning personal finances, mastering these concepts ensures long-term stability and prosperity.
  </p>
</div>

        </motion.section>

        {/* General Comment Section */}
        <motion.section
          id="general-comments"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-emerald-400 shadow-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-emerald-300 mb-6">
            💬 Leave a General Comment
          </h2>
          <form onSubmit={handleGeneralComment} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={generalComment.name}
              onChange={(e) =>
                setGeneralComment({ ...generalComment, name: e.target.value })
              }
              className="border border-emerald-400 bg-black/30 p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={generalComment.text}
              onChange={(e) =>
                setGeneralComment({ ...generalComment, text: e.target.value })
              }
              className="border border-emerald-400 bg-black/30 p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-2 rounded-lg shadow hover:shadow-emerald-400/40 transition"
            >
              Submit Comment
            </button>
          </form>
        </motion.section>

        <Footer />
      </div>
    </>
  );
};

export default Finance;
