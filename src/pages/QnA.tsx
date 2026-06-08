import Header from "@/components/portal/Header";
import Footer from "@/components/portal/Footer";
import { MessageCircle, ThumbsUp, Eye, User, CheckCircle2 } from "lucide-react";

const questions = [
    {
        id: 1,
        title: "What is the best way to learn React in 2026?",
        author: "DevStarter",
        views: 1250,
        votes: 45,
        answers: 12,
        tags: ["programming", "react", "javascript"],
        solved: true
    },
    {
        id: 2,
        title: "How to fix 'npm run dev' error in Vite project?",
        author: "BugHunter",
        views: 340,
        votes: 12,
        answers: 3,
        tags: ["vite", "npm", "troubleshooting"],
        solved: false
    },
    {
        id: 3,
        title: "Is it worth buying an electric car in Bangladesh now?",
        author: "EcoDriver",
        views: 890,
        votes: 28,
        answers: 15,
        tags: ["automotive", "ev", "bangladesh"],
        solved: true
    },
    {
        id: 4,
        title: "Best budget gaming laptop under 80k BDT?",
        author: "GamerBoy",
        views: 2100,
        votes: 156,
        answers: 42,
        tags: ["gaming", "laptop", "hardware"],
        solved: true
    }
];

const QnA = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Community Q&A</h1>
                        <p className="text-muted-foreground">Ask questions, get answers, and help others.</p>
                    </div>
                    <button className="px-6 py-2 bg-portal-green text-white font-semibold rounded-lg hover:bg-portal-green/90 transition-colors shadow-sm">
                        Ask a Question
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-3 space-y-4">
                        {questions.map((q) => (
                            <div key={q.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center gap-2 text-center min-w-[60px]">
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-foreground">{q.votes}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase">Votes</span>
                                        </div>
                                        <div className={`flex flex-col items-center p-1 rounded ${q.solved ? "bg-green-100 text-green-700" : "text-muted-foreground"}`}>
                                            <span className="text-lg font-bold">{q.answers}</span>
                                            <span className="text-[10px] uppercase">Ans</span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-portal-blue hover:underline mb-2">{q.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {q.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center gap-4">
                                                {q.solved && <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 className="w-3 h-3" /> Solved</span>}
                                                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {q.views} views</span>
                                            </div>
                                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {q.author}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-xl p-4">
                            <h3 className="font-bold mb-3">Top Contributors</h3>
                            <ul className="space-y-3">
                                {["CodeMaster", "TechGuru", "HelpfulUser", "ReactDev"].map((user, i) => (
                                    <li key={i} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                                                {user[0]}
                                            </div>
                                            <span className="text-foreground">{user}</span>
                                        </div>
                                        <span className="font-bold text-primary">{2000 - i * 300}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default QnA;
