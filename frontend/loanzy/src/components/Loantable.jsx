import React from "react";
import { Eye, FileText, MoreHorizontal } from "lucide-react";

const LoanTable = ({ loans = [] }) => {
  if (!loans || loans.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-8 text-center text-neutral-500">
        No active loans found.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
        <h3 className="text-lg font-semibold text-white tracking-wide">
          Active Loans
        </h3>
        <button className="text-sm text-neutral-400 hover:text-white transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-900/50 text-neutral-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium border-b border-white/5">
                Loan ID
              </th>
              <th className="px-6 py-4 font-medium border-b border-white/5">
                Type
              </th>
              <th className="px-6 py-4 font-medium border-b border-white/5">
                Amount
              </th>
              <th className="px-6 py-4 font-medium border-b border-white/5">
                Status
              </th>
              <th className="px-6 py-4 font-medium border-b border-white/5">
                Next EMI
              </th>
              <th className="px-6 py-4 font-medium border-b border-white/5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loans.map((loan, index) => (
              <tr
                key={index}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  {loan.id}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-neutral-500" />
                    {loan.type}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-white tracking-wide">
                  {loan.amount}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={loan.status} />
                </td>
                <td className="px-6 py-4 text-sm text-neutral-400">
                  {loan.nextEmi}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-white/10 text-neutral-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-500/10 text-green-400 border-green-500/20",
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Closed: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    "Rejected by AI": "bg-red-500/20 text-red-500 border-red-500/30 animate-pulse font-bold",
  };

  const defaultStyle =
    "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}
    >
      {status}
    </span>
  );
};

export default LoanTable;
