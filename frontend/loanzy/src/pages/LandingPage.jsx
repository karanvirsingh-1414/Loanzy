import React from "react";
import { ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pt-16 font-sans">
      {}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              The Future of Lending is Here
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Smarter Loans for a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Better Tomorrow
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed">
              Experience lightning-fast approvals and secure financing tailored to your needs. Zero hidden fees, zero paperwork. Just instant financial freedom.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/apply")}
                className="bg-white text-black px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 group hover:bg-neutral-200 transition-all hover:scale-105"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-8 py-3.5 rounded-full font-semibold border border-white/20 hover:bg-white/10 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-end relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-3xl blur-[80px] z-0" />
            <img
              src="/personal.png"
              alt="Digital Loan App"
              className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {}
      <section className="px-6 py-24 bg-neutral-950 border-y border-white/5" id="solutions">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Financing Built For You</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Whether you are scaling a business or buying your dream home, we have a specialized product ready to deploy.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-black relative">
              <img src="/business.png" alt="Business Loans" className="w-full h-64 object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Business Loans</h3>
                <p className="text-neutral-300">Scale your operations instantly with limits up to ₹1 Crore. Disbursal in under 24 hours.</p>
              </div>
            </div>
            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-black relative">
              <img src="/home.png" alt="Home Loans" className="w-full h-64 object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Home Loans</h3>
                <p className="text-neutral-300">Secure the lowest interest rates in the market. Flexible EMIs and up to 30 years repayment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap size={24} className="text-blue-400" />}
              title="Instant Approval"
              description="Our proprietary AI-powered risk assessment engine gives you a definitive decision within minutes, not days."
            />
            <FeatureCard
              icon={<ShieldCheck size={24} className="text-emerald-400" />}
              title="Bank-Grade Security"
              description="Your financial data is protected by AES-256 enterprise-level encryption. Your privacy is our priority."
            />
            <FeatureCard
              icon={<Globe size={24} className="text-purple-400" />}
              title="Global Access"
              description="100% digital process. Manage your loans, check outstanding balances, and make payments from anywhere."
            />
          </div>
        </div>
      </section>

      {}
      <section className="px-6 py-12 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 md:p-14 flex flex-col md:flex-row justify-between items-center gap-12 bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

            <div className="text-center md:text-left relative z-10 w-full md:w-auto flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">₹5,000 Cr+</h2>
              <p className="text-neutral-400 font-medium">Loans Disbursed</p>
            </div>
            <div className="w-full md:w-px h-px md:h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <div className="text-center md:text-left relative z-10 w-full md:w-auto flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">500k+</h2>
              <p className="text-neutral-400 font-medium">Happy Customers</p>
            </div>
            <div className="w-full md:w-px h-px md:h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <div className="text-center md:text-left relative z-10 w-full md:w-auto flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">99.9%</h2>
              <p className="text-neutral-400 font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="py-8 border-t border-white/10 text-center text-sm text-neutral-500">
        <p>© 2026 Loanzy Financial Services. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group shadow-lg">
    <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white mb-6 group-hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-neutral-400 leading-relaxed text-sm">{description}</p>
  </div>
);

export default LandingPage;
