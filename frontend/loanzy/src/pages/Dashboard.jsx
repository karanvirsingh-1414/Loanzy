import React from "react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  User,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import LoanCard from "../components/Loancard";
import LoanTable from "../components/Loantable";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [activeLoansData, setActiveLoansData] = React.useState([]);

  React.useEffect(() => {
    const fetchLoans = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:8080/loans/user/${userId}`);
        if (response.ok) {
          const data = await response.json();

          const formattedData = data.map(loan => ({
            id: `#LN-${loan.id}`,
            type: loan.type,
            amount: `₹${loan.amount.toLocaleString()}`,
            status: loan.status,
            nextEmi: loan.nextEmiDate || "-",
          }));
          setActiveLoansData(formattedData);
        }
      } catch (err) {
        console.error("Failed to fetch loans", err);
        toast.error("Failed to load your dashboard data");
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="bg-black min-h-screen pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {}
        <div className="lg:col-span-1 space-y-2">
          <div className="glass-panel p-4 rounded-xl sticky top-24">
            <h3 className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-4 px-3">
              Menu
            </h3>
            <nav className="space-y-1">
              <NavItem
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
                active
              />
              <NavItem
                icon={<FileText size={18} />}
                label="Apply Loan"
                to="/apply"
              />
              <NavItem icon={<Calendar size={18} />} label="EMI Schedule" />
              <NavItem icon={<User size={18} />} label="Profile" />
            </nav>
          </div>
        </div>

        {}
        <div className="lg:col-span-3 space-y-8">
          {}
          <div>
            <h2 className="text-2xl font-bold">Good Evening, Alex</h2>
            <p className="text-neutral-400">Here is your financial overview.</p>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <LoanCard
              label="Total Loans"
              value="₹85,00,000"
              icon={<DollarSign className="text-white" size={20} />}
              trend="+12%"
            />
            <LoanCard
              label="Active Loans"
              value="2"
              icon={<FileText className="text-white" size={20} />}
            />
            <LoanCard
              label="Upcoming EMI"
              value="₹35,000"
              subtext="Due in 5 days"
              icon={<Calendar className="text-white" size={20} />}
            />
            <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="text-neutral-400 text-sm font-medium tracking-wide">
                  Risk Score
                </div>
                <div className="p-2 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 text-green-400 tracking-tight">
                750
              </div>
              <div className="text-xs text-green-500/80 font-medium bg-green-500/10 inline-block px-2 py-0.5 rounded border border-green-500/10">
                Excellent
              </div>
              <div className="w-full bg-neutral-800 h-1.5 mt-3 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[85%]" />
              </div>
            </div>
          </div>

          {}
          <LoanTable loans={activeLoansData} />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, to }) => (
  <a
    href={to || "#"}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-white text-black" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
  >
    {icon}
    {label}
  </a>
);

export default Dashboard;
