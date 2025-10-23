import CourseCard from "./CourseCard";

/*
 * Course catalog surface.
 * Backend handoff:
 *   - Replace `sampleCourses` with the API response once the courses endpoint is ready.
 *     Maintain the `readyForChat` flag so the UI can keep distinguishing chat-enabled cohorts.
 *   - If pagination or filtering is required later, this component is the entry point for that logic.
 */
const sampleCourses = [
    { id: "DSA-101", title: "Data Structures and Algorithms", code: "DSA-101", instructor: "Jane Smith", readyForChat: true },
    { id: "cs-3000", title: "Computer Science", code: "COMP-3000", instructor: "Michael Chen" },
    { id: "sf-1200", title: "Software Fundamentals", code: "COMP-1200", instructor: "Michael Chen" },
    { id: "pd-2000", title: "Professional Development", code: "PDEV-2000", instructor: "Michael Chen" },
    { id: "web-1000", title: "Web Development", code: "WEBD-1000", instructor: "Michael Chen" },
];

// Render a heading plus a responsive grid that delegates per-card rendering to CourseCard.
export default function CoursesGrid() {
    return (
        <section>
            {/* Section title matches design spec and anchors the page for screen readers. */}
            <h1 className="text-4xl font-serif text-gray-900 mb-8">Courses</h1>

            {/* Grid responsively shifts between one, two, or three columns depending on viewport width. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleCourses.map((c) => (
                    <CourseCard
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        code={c.code}
                        instructor={c.instructor}
                        readyForChat={c.readyForChat}
                    />
                ))}
            </div>
        </section>
    );
}