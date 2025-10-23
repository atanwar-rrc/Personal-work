import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CoursesGrid from "./components/CoursesGrid";
import ChatPage from "./pages/ChatPage";

/*
 * Application shell responsible for composing the two-panel layout and wiring page-level routes.
 * Integrations to note:
 *   - Global providers (auth, analytics, API clients) should be plugged in here so every route
 *     inherits them.
 *   - New pages get registered inside the <Routes> block; keep the wildcard redirect last so
 *     unknown URLs always fall back to the course dashboard.
 */
export default function App() {
    return (
        <div className="min-h-screen bg-[#fbfaf7] flex">
            <Sidebar />
            <main className="flex-1 p-12 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<CoursesGrid />} />
                    <Route path="/chat/:courseId" element={<ChatPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}