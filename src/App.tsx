import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import QuizzesPage from "./pages/QuizzesPage"

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#f7f3eb] text-stone-900">
        <Sidebar />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-5xl px-12 py-12">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
