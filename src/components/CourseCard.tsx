import React from "react";

type CourseCardProps = {
    id: string;
    title: string;
    code?: string;
    instructor?: string;
};

/**
 * Purpose: Render one course card for the grid.
 - Shows the course title, optional code, and instructor.
 - Uses semantic HTML and Tailwind for quick, consistent styling.
 - Small and reusable so it can be dropped into any course list.
 * CourseCard - visual course card used on the right side.
 * - id: stable key for lists
 * - title/code/instructor: shown on the card
 */
export default function CourseCard({ id, title, code, instructor }: CourseCardProps) {
    return (
        <article
            // card visual: white background, rounded corners, subtle border and shadow
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-44 flex flex-col"
            aria-labelledby={`course-${id}-title`}
        >
            <div>
                <h3 id={`course-${id}-title`} className="text-lg font-semibold text-gray-900">
                    {title}
                </h3>
                {code && <div className="text-xs text-gray-500 mt-1">{code}</div>}
            </div>

            {/* bottom area: instructor aligned to bottom */}
            <div className="mt-auto text-sm text-gray-700">
                {instructor}
            </div>
        </article>
    );
}