import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Database, Server, Smartphone, LayoutDashboard } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-24 font-sans pb-20">
            {}
            <section className="px-6 py-12 md:py-20 max-w-7xl mx-auto text-center relative">
                <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -z-10" />

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 mt-10">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Loanzy</span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                    The next-generation fintech platform designed to make lending simple, fast, and transparent. We engineered a scalable microservices architecture to process loans securely and instantly.
                </p>
            </section>

            {}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Technology Architecture</h2>
                        <p className="text-neutral-400">Built on a robust, enterprise-grade cloud-native stack.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {}
                        <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 -translate-y-1/2 z-0" />

                        <TechCard
                            icon={<Smartphone className="text-pink-400" size={32} />}
                            title="Frontend Interface"
                            tech="React + Vite + Tailwind CSS"
                            delay="0"
                        />
                        <TechCard
                            icon={<LayoutDashboard className="text-blue-400" size={32} />}
                            title="API Gateway"
                            tech="Spring Cloud Gateway"
                            delay="100"
                        />
                        <TechCard
                            icon={<Server className="text-emerald-400" size={32} />}
                            title="Microservices"
                            tech="Spring Boot (Java 23)"
                            delay="200"
                        />
                        <TechCard
                            icon={<Database className="text-orange-400" size={32} />}
                            title="Data Storage"
                            tech="MySQL Relational DB"
                            delay="300"
                        />
                    </div>
                </div>
            </section>

            {}
            <section className="px-6 py-16 bg-neutral-950/30 border-y border-white/5 mt-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Service Breakdown</h2>
                            <div className="space-y-6">
                                <ServiceDetail
                                    name="Auth Service (Port 8081)"
                                    desc="Handles JWT generation and stateless user authentication. Automatically determines User/Admin roles based on credentials."
                                />
                                <ServiceDetail
                                    name="User Service (Port 8082)"
                                    desc="Manages user profiles, contact information, and employment details in isolation."
                                />
                                <ServiceDetail
                                    name="Loan Service (Port 8083)"
                                    desc="The core engine. Manages the lifecycle of a loan from Pending to Approved/Rejected by the admin."
                                />
                                <ServiceDetail
                                    name="Payment Service (Port 8084)"
                                    desc="Records tracking for loan EMI payments and generates unique transaction identifiers."
                                />
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 blur-[60px] rounded-full"></div>
                            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                                <Code className="text-emerald-400" />
                                Project Vision
                            </h3>
                            <p className="text-neutral-300 leading-relaxed mb-6">
                                This project was built to demonstrate proficiency in connecting modern frontend interfaces with complex backend distributed systems.
                                <br /><br />
                                By utilizing an API Gateway pattern, we ensure that the frontend only ever talks to a single endpoint (Port 8080), while background tasks are distributed efficiently across multiple independent Java applications.
                            </p>
                            <Link to="/apply" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors group">
                                Test the Application Flow <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const TechCard = ({ icon, title, tech, delay }) => (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center relative z-10 flex flex-col items-center bg-black/80 hover:bg-black transition-colors hover:scale-105 duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 shadow-inner">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-neutral-400">{tech}</p>
    </div>
);

const ServiceDetail = ({ name, desc }) => (
    <div className="border-l-2 border-white/10 pl-6 py-2 hover:border-blue-500 transition-colors group">
        <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{name}</h4>
        <p className="text-neutral-400 mt-1">{desc}</p>
    </div>
);

export default AboutPage;
