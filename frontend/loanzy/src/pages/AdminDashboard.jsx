import React, { useState, useEffect } from "react";
import { Users, FileText, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/loans`);
      if (resp.ok) {
        const data = await resp.json();
        setLoans(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/loans/${id}/approve`, { method: "PUT" });
      if (resp.ok) {
        toast.success("Loan Approved Successfully!");
        fetchLoans();
      }
    } catch (err) {
      console.error("Error approving", err);
      toast.error("Failed to approve loan.");
    }
  };

  const handleReject = async (id) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/loans/${id}/reject`, { method: "PUT" });
      if (resp.ok) {
        toast.success("Loan Rejected.");
        fetchLoans();
      }
    } catch (err) {
      console.error("Error rejecting", err);
      toast.error("Failed to reject loan.");
    }
  };

  const pendingLoans = loans.filter((l) => l.status === "Pending").length;
  const approvedLoans = loans.filter((l) => l.status === "Approved").length;

  return (
    <div className="bg-black min-h-screen pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-neutral-400">Overview of loan applications and user stats.</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary text-sm">Download Report</button>
            <button className="btn-primary text-sm flex items-center gap-2">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsCard label="Total Loans" value={loans.length} icon={<Users size={20} className="text-blue-400" />} />
          <AnalyticsCard label="Pending Loans" value={pendingLoans} icon={<FileText size={20} className="text-yellow-400" />} />
          <AnalyticsCard label="Approved Loans" value={approvedLoans} icon={<CheckCircle size={20} className="text-green-400" />} />
        </div>

        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between gap-4">
            <h3 className="text-lg font-semibold">Recent Loan Requests</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              <input type="text" placeholder="Search..." className="glass-input pl-10 pr-4 py-2 text-sm rounded-lg w-full md:w-64" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-neutral-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Loan ID</th>
                  <th className="px-6 py-4 font-medium">User ID</th>
                  <th className="px-6 py-4 font-medium">Loan Type</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loans.map(loan => (
                  <tr key={loan.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-white">#LN-{loan.id}</td>
                    <td className="px-6 py-4 text-sm text-neutral-400">User {loan.userId}</td>
                    <td className="px-6 py-4 text-sm text-neutral-400">{loan.type}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">₹{loan.amount.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                        ${loan.status === 'Approved' ? 'bg-green-400/10 text-green-400' :
                          loan.status === 'Rejected' ? 'bg-red-400/10 text-red-400' :
                            loan.status === 'Rejected by AI' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                              'bg-yellow-400/10 text-yellow-400'}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {loan.status === "Pending" && (
                          <>
                            <button onClick={() => handleApprove(loan.id)} className="p-2 rounded-lg hover:bg-green-500/20 text-neutral-400 hover:text-green-400 transition-colors" title="Approve">
                              <CheckCircle size={18} />
                            </button>
                            <button onClick={() => handleReject(loan.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors" title="Reject">
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ label, value, trend, icon }) => (
  <div className="glass-panel p-6 rounded-xl">
    <div className="flex justify-between items-start mb-2">
      <span className="text-neutral-400 text-sm font-medium">{label}</span>
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-xs text-neutral-500">{trend}</div>
  </div>
);

export default AdminDashboard;
