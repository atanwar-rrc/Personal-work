import React from "react";
import CourseCard from "./CourseCard";

/**
 * Purpose: Render the main "Courses" area and lay out cards.
 - Displays a large heading and a responsive grid of CourseCard components.
 - Uses a local sample list for now; easy to swap for an API later.
 - Keeps layout responsive so cards reflow across screen sizes.
 * Sample data for the course cards.
 * Replace with real data when available.
 */
const sampleCourses = [
    { id: "math-101", title: "Mathematics Fundamentals", code: "MATH-1098", instructor: "Michael Chen" },
    { id: "cs-3000", title: "Computer Science", code: "COMP-3000", instructor: "Michael Chen" },
    { id: "sf-1200", title: "Software Fundamentals", code: "COMP-1200", instructor: "Michael Chen" },
    { id: "pd-2000", title: "Professional Development", code: "PDEV-2000", instructor: "Michael Chen" },
    { id: "web-1000", title: "Web Development", code: "WEBD-1000", instructor: "Michael Chen" },
];

/**
 * CoursesGrid - page content area that shows a big heading and a grid of CourseCard components.
 * Uses Tailwind grid utilities to match the three up layout.
 */
export default function CoursesGrid() {
    return (
        <section>
            {/* Big page heading similar */}
            <h1 className="text-4xl font-serif text-gray-900 mb-8">Courses</h1>

            {/* grid: 3 columns on desktop, responsive shrink on smaller screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleCourses.map((c) => (
                    <CourseCard
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        code={c.code}
                        instructor={c.instructor}
                    />
                ))}
            </div>
        </section>
    );
}