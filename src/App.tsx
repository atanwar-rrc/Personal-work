import React from "react";
import Sidebar from "./components/Sidebar";
import CoursesGrid from "./components/CoursesGrid";

/**
Purpose: App shell that composes the page layout.
 - Places the Sidebar on the left and the main content on the right.
 - Sets the overall background and flexible layout for the site.
 - Central place to wire routing or global providers later.
 */
export default function App() {
    return (
        <div className="min-h-screen bg-[#fbfaf7] flex">
            {/* Left column (fixed width) */}
            <Sidebar />

            {/* Main content area */}
            <main className="flex-1 p-12">
                <CoursesGrid />
            </main>
        </div>
    );
}