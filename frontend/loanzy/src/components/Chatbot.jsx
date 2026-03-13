import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! I am Loanzy AI Assistant. How can I help you with your loan journey today?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE";

    const genAI = new GoogleGenerativeAI(apiKey);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (apiKey === "YOUR_API_KEY_HERE") {
            setMessages(prev => [...prev, { text: input, isBot: false }]);
            setMessages(prev => [...prev, { text: "System Error: The API Key has not been configured properly yet. Please add it to your .env file or configuration to activate me!", isBot: true }]);
            setInput("");
            return;
        }

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setIsLoading(true);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const promptContext = `
        You are an expert AI Assistant working for a neo-banking application named 'Loanzy'. 
        You help users understand their loans (Business or Home loans), calculate EMIs, understand 
        interest rates, and guide them to use our platform. Keep your answers short, friendly, and 
        formatted as clean text. Do not use complex markdown that looks bad in a small chat window.
        
        User question: ${userMessage}
      `;

            const result = await model.generateContent(promptContext);
            const botResponse = await result.response.text();

            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages(prev => [...prev, { text: `Sorry, I am having trouble connecting to my brain right now. Error: ${error.message} Try again later!`, isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 bg-emerald-500 text-black rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 ${isOpen ? 'hidden' : 'block'}`}
            >
                <MessageSquare size={24} />
            </button>

            {}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden transform transition-all duration-300">

                    {}
                    <div className="bg-black border-b border-white/10 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-emerald-500 bg-emerald-500/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Loanzy AI Assistant</h3>
                                <p className="text-emerald-500 text-xs">Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950 custom-scrollbar">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex w-full ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.isBot
                                        ? 'bg-neutral-800 text-neutral-200 rounded-tl-none border border-white/5'
                                        : 'bg-emerald-600 text-white rounded-tr-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex w-full justify-start">
                                <div className="bg-neutral-800 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 flex gap-2 w-16">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {}
                    <form onSubmit={handleSend} className="p-3 bg-black border-t border-white/10 flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Loanzy AI..."
                            className="flex-1 bg-neutral-900 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-2 bg-emerald-500 text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </form>

                </div>
            )}
        </>
    );
};

export default Chatbot;
