import React, { useState } from "react";
import { ArrowLeft, Calculator, CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const ApplyLoan = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const [loanType, setLoanType] = useState("Personal");
  const interestRate = 12;

  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const emi =
      loanAmount *
      r *
      (Math.pow(1 + r, tenure) / (Math.pow(1 + r, tenure) - 1));
    return Math.round(emi);
    return Math.round(emi);
  };

  const handleApplyLoan = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/loans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          type: loanType + " Loan",
          amount: loanAmount,
          status: "Active",
          nextEmiDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          emiAmount: calculateEMI()
        })
      });

      if (response.ok) {
        toast.success("Loan Application Submitted!");
        navigate("/dashboard");
      } else {
        toast.error("Application failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting application");
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/dashboard"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Apply for a Loan</h1>
            <p className="text-neutral-400">
              Complete the form below to get instant approval.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 rounded-2xl">
              <form className="space-y-8">
                {}
                <div>
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    Loan Details
                  </h3>

                  <div className="space-y-6 pl-8">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Loan Amount: ₹{loanAmount.toLocaleString("en-IN")}
                      </label>
                      <input
                        type="range"
                        min="10000"
                        max="10000000"
                        step="10000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                      />
                      <div className="flex justify-between text-xs text-neutral-500 mt-2">
                        <span>₹10,000</span>
                        <span>₹1 Cr</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">
                          Tenure (Months)
                        </label>
                        <input
                          type="number"
                          value={tenure}
                          onChange={(e) => setTenure(Number(e.target.value))}
                          className="glass-input w-full px-4 py-3 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">
                          Purpose
                        </label>
                        <select
                          className="glass-input w-full px-4 py-3 rounded-xl appearance-none"
                          value={loanType}
                          onChange={(e) => setLoanType(e.target.value)}
                        >
                          <option className="bg-neutral-900" value="Personal">Personal</option>
                          <option className="bg-neutral-900" value="Home Renovation">
                            Home Renovation
                          </option>
                          <option className="bg-neutral-900" value="Education">Education</option>
                          <option className="bg-neutral-900" value="Business">Business</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {}
                <div>
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    Personal & Employment
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">
                        Annual Income
                      </label>
                      <input
                        type="text"
                        placeholder="₹0.00"
                        className="glass-input w-full px-4 py-3 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">
                        Employment Type
                      </label>
                      <select className="glass-input w-full px-4 py-3 rounded-xl">
                        <option className="bg-neutral-900">Salaried</option>
                        <option className="bg-neutral-900">
                          Self-Employed
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-neutral-300">
                        Employer Name
                      </label>
                      <input
                        type="text"
                        placeholder="Company Ltd"
                        className="glass-input w-full px-4 py-3 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="button" onClick={handleApplyLoan} className="btn-primary flex items-center gap-2">
                    Submit Application
                    <ChevronRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl text-white">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">EMI Preview</h3>
                  <p className="text-xs text-neutral-400">
                    Estimated Breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Loan Amount</span>
                  <span className="font-medium">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Interest Rate</span>
                  <span className="font-medium text-green-400">
                    {interestRate}% p.a.
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Tenure</span>
                  <span className="font-medium">{tenure} Months</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Monthly EMI</span>
                  <span className="text-xl font-bold">
                    ₹{calculateEMI().toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex gap-3">
                  <CheckCircle className="text-green-500 shrink-0" size={18} />
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    No hidden charges. Pre-payment allowed after 6 months with
                    0% penalty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;
