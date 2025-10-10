import React, { useEffect, useState } from "react";

/* each category has an id (unique) and a label (shown to users) */
type Category = { id: string; label: string };

const categories: Category[] = [
    { id: "math", label: "Math" },
    { id: "cs", label: "Computer Science" },
    { id: "sf", label: "Software Fundamentals" },
    { id: "pd", label: "Professional Development" },
    { id: "web", label: "Web Development" },
    { id: "cx", label: "CX/UX" },
];

function FolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="flex-shrink-0 text-gray-700">
            <rect x="3" y="6" width="7" height="4" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="3" y="10" width="18" height="9" rx="1.2" ry="1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    );
}

function ChevronIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

export default function Sidebar() {
    // Read saved collapsed state from localStorage (lazy init). Default to false.
    const [collapsed, setCollapsed] = useState<boolean>(() => {
        try {
            return localStorage.getItem("sidebar-collapsed") === "true";
        } catch {
            return false;
        }
    });

    // Read saved courses dropdown state from localStorage (lazy init). Default to true (expanded).
    const [coursesOpen, setCoursesOpen] = useState<boolean>(() => {
        try {
            const val = localStorage.getItem("courses-open");
            return val == null ? true : val === "true";
        } catch {
            return true;
        }
    });

    // Persist collapsed state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem("sidebar-collapsed", collapsed ? "true" : "false");
        } catch {
            // ignore storage errors
        }
    }, [collapsed]);

    // Persist courses dropdown state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem("courses-open", coursesOpen ? "true" : "false");
        } catch {
            // ignore storage errors
        }
    }, [coursesOpen]);

    return (
        <aside
            className={
                "relative transition-all duration-200 ease-in-out bg-[#f7f4ed] border-r border-gray-200 h-screen p-5 flex-shrink-0 " +
                (collapsed ? "w-16" : "w-56")
            }
        >
            {/* top-left toggle: stays visible when sidebar is collapsed */}
            <div className="absolute left-4 top-3 z-40">
                <button
                    type="button"
                    aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
                    aria-expanded={!collapsed}
                    onClick={() => setCollapsed((s) => !s)}
                    className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 hover:bg-gray-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="28" height="28" className="block text-gray-900" aria-hidden="true" role="img">
                        <rect x="1" y="1" width="38" height="38" rx="10" fill="#F7F6F2" stroke="#2F3A45" strokeWidth="1.6" />
                        <rect x="8" y="6" width="6" height="28" rx="3" fill="#FFFFFF" stroke="#2F3A45" strokeWidth="1" />
                    </svg>
                </button>
            </div>

            {/* header: extra top margin and left padding so header clears the absolute icon */}
            <div className={"mt-6 mb-6 flex items-center " + (collapsed ? "justify-center" : "flex-col items-start pl-10")}>
                <div className={"flex items-center justify-between w-full " + (collapsed ? "hidden" : "")}>
                    <h2 className="text-2xl font-serif text-gray-900">Courses</h2>
                    <div className="text-gray-600">
                        <button
                            type="button"
                            aria-expanded={coursesOpen}
                            aria-controls="courses-list"
                            onClick={() => setCoursesOpen((s) => !s)}
                            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 hover:bg-gray-100"
                        >
                            <span className={"inline-block transform transition-transform " + (coursesOpen ? "rotate-0" : "-rotate-90")}>
                                <ChevronIcon />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Courses list: hide whole list when sidebar is collapsed so icons/labels don't appear */}
            <nav aria-label="Course categories" className={"mt-2 " + (collapsed ? "hidden" : "")}>
                <div
                    id="courses-list"
                    role="region"
                    aria-hidden={!coursesOpen}
                    className={
                        "overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out " +
                        (coursesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")
                    }
                >
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                className="w-full text-left flex items-center gap-3 text-sm text-gray-800 rounded-md px-1 py-2 hover:bg-gray-100 focus:outline-none"
                                aria-pressed="false"
                            >
                                <FolderIcon />
                                <span className="truncate">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </aside>
    );
}