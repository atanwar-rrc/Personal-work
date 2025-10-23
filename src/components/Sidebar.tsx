import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/*
 * Sidebar navigation for the learning catalog.
 * Backend handoff:
 *   - Replace the static Category list with data from the course catalog service. Preserve the
 *     `courseId` + `readyForChat` values so chat-enabled courses continue to deep-link correctly.
 *   - Persisted UI state (collapsed rail and accordion toggle) intentionally lives in
 *     localStorage; adjust the keys below if the product spec changes.
 */
type Category = {
    id: string;
    label: string;
    courseId?: string;
    readyForChat?: boolean;
};

// Temporary data until the course catalog API lands. Ready-for-chat courses must include the
// canonical courseId so the router can navigate to `/chat/:courseId` with the correct context.
const categories: Category[] = [
    { id: "dsa", label: "Data Structures and Algorithms", courseId: "DSA-101", readyForChat: true },
    { id: "cs", label: "Computer Science", courseId: "COMP-3000" },
    { id: "sf", label: "Software Fundamentals", courseId: "COMP-1200" },
    { id: "pd", label: "Professional Development", courseId: "PDEV-2000" },
    { id: "web", label: "Web Development", courseId: "WEBD-1000" },
    { id: "cx", label: "CX/UX" },
];

// SVG for the little folder glyph that appears to the left of each course name in the sidebar list.
function FolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="flex-shrink-0 text-gray-700">
            <rect x="3" y="6" width="7" height="4" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="3" y="10" width="18" height="9" rx="1.2" ry="1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    );
}

// Chevron icon for the accordion toggle.
function ChevronIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

// Home glyph used for the quick “back to dashboard” shortcut.
function HomeIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
        >
            <path d="M3 11.5 12 4l9 7.5" strokeLinejoin="round" />
            <path d="M5.5 10v9.5H18.5V10" strokeLinejoin="round" />
        </svg>
    );
}

export default function Sidebar() {
    // Track the current route so we can hide the “home” shortcut while the learner is already there.
    const location = useLocation();
    const onHomepage = location.pathname === "/";

    // Remember whether the sidebar was collapsed so refreshing the page doesn’t reset the learner’s choice.
    const [collapsed, setCollapsed] = useState<boolean>(() => {
        try {
            return localStorage.getItem("sidebar-collapsed") === "true";
        } catch {
            return false;
        }
    });

    // Mirror that persistence for the course list accordion—leave it open or closed the way the learner left it.
    const [coursesOpen, setCoursesOpen] = useState<boolean>(() => {
        try {
            const stored = localStorage.getItem("courses-open");
            return stored == null ? true : stored === "true";
        } catch {
            return true;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("sidebar-collapsed", collapsed ? "true" : "false");
        } catch {
            /* storage can fail in private mode; nothing to do */
        }
    }, [collapsed]);

    useEffect(() => {
        try {
            localStorage.setItem("courses-open", coursesOpen ? "true" : "false");
        } catch {
            /* same story as above */
        }
    }, [coursesOpen]);

    return (
        <aside
            className={
                "relative transition-all duration-200 ease-in-out bg-[#f7f4ed] border-r border-gray-200 h-screen p-5 flex-shrink-0 " +
                (collapsed ? "w-16" : "w-56")
            }
        >
            {/* Top corners hold quick navigation while the sidebar is expanded: home shortcut left, collapse toggle right. */}
            {!onHomepage && !collapsed && (
                <div className="absolute left-4 top-3 z-40">
                    <Link
                        to="/"
                        aria-label="Go to homepage"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span className="sr-only">Home</span>
                    </Link>
                </div>
            )}

            {/* The collapse toggle lives in the top-right corner so it stays reachable even while scrolling. */}
            <div className="absolute right-4 top-3 z-40">
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

            {/* Stack everything vertically so content scrolls while the header controls stay pinned. */}
            <div className="flex h-full flex-col pt-8">
                {/* Header row keeps the Courses title up front with the accordion toggle tucked on the right. */}
                <div className={(collapsed ? "hidden" : "block") + " mb-6"}>
                    <div className="flex items-center justify-between gap-3 pl-2 pr-4">
                        <h2 className="text-2xl font-serif text-gray-900">Courses</h2>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-expanded={coursesOpen}
                                aria-controls="courses-list"
                                onClick={() => setCoursesOpen((s) => !s)}
                                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 hover:bg-gray-100 text-gray-600"
                            >
                                <span className={"inline-block transform transition-transform " + (coursesOpen ? "rotate-0" : "rotate-180")}>
                                    <ChevronIcon />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course list disappears entirely when collapsed so the sidebar chrome stays minimal. */}
                <nav aria-label="Course categories" className={"mt-2 " + (collapsed ? "hidden" : "pr-10")}>
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
                            {categories.map((cat) => {
                                const content = (
                                    <>
                                        <FolderIcon />
                                        <span className="truncate">{cat.label}</span>
                                    </>
                                );

                                if (cat.readyForChat && cat.courseId) {
                                    return (
                                        <Link
                                            key={cat.id}
                                            to={`/chat/${cat.courseId}`}
                                            state={{ courseTitle: cat.label }}
                                            aria-label={`Open chat for ${cat.label}`}
                                            className="w-full text-left flex items-center gap-3 text-sm text-gray-800 rounded-md px-1 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                                        >
                                            {content}
                                        </Link>
                                    );
                                }

                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        // Future: we can wire this up to a category filter or details drawer.
                                        className="w-full text-left flex items-center gap-3 text-sm text-gray-800 rounded-md px-1 py-2 hover:bg-gray-100 focus:outline-none"
                                        aria-pressed="false"
                                    >
                                        {content}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </nav>

            </div>
        </aside>
    );
}