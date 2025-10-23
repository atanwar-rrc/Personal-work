import { Link } from "react-router-dom";

type CourseCardProps = {
    id: string;
    title: string;
    code?: string;
    instructor?: string;
    readyForChat?: boolean;
};

/*
 * Single course tile.
 * Notes for integration:
 *   - `readyForChat` should come directly from the course API; when true we expose a deep link to
 *     `/chat/:courseId` and pass the course title along in router state for nicer headers.
 *   - Add secondary metadata (progress, due dates, etc.) here if the product spec evolves—this is
 *     the canonical place to extend the card UI.
 */
export default function CourseCard({ id, title, code, instructor, readyForChat }: CourseCardProps) {
    const card = (
        <article
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-44 flex flex-col transition-transform group-hover:-translate-y-0.5"
            aria-labelledby={`course-${id}-title`}
        >
            <div>
                <h3 id={`course-${id}-title`} className="text-lg font-semibold text-gray-900">
                    {title}
                </h3>
                {code && <div className="text-xs text-gray-500 mt-1">{code}</div>}
            </div>

            <div className="mt-auto text-sm text-gray-700">{instructor}</div>
        </article>
    );

    if (readyForChat) {
        return (
            <Link
                to={`/chat/${id}`}
                state={{ courseTitle: title }}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf7]"
                aria-labelledby={`course-${id}-title`}
            >
                {card}
            </Link>
        );
    }

    return card;
}