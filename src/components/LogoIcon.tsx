/**
 * LogoIcon
 * Purpose: Small sidebar icon button.
 - Renders an inline SVG wrapped in a keyboard-accessible <button>.
 - Currently a visual control only; behavior (toggling the sidebar) will be added later.
 - className prop allows size and color to be adjusted with Tailwind utilities.
 * - Small interactive home button containing a simple book-like SVG.
 * - Designed to be reused wherever the app needs the primary logo/home control.
 *
 * Props:
 * - className: Tailwind size/color utilities (default "w-7 h-10").
 */
export default function LogoIcon({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <button
            aria-label="Home"
            type="button"
            // Button provides hover/focus affordances for keyboard and mouse users.
            className="inline-flex items-center justify-center rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 transition-shadow shadow-sm hover:shadow-md"
        >
            {/* Inline SVG: fixed viewBox so sizing is consistent with the className prop */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                className={className + " block"}
                aria-hidden="true"
                role="img"
            >
                {/* Outer rounded rectangle: background and stroked border */}
                <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="12"
                    fill="#F7F6F2"
                    stroke="#2F3A45"
                    strokeWidth="2"
                />
                {/* Inner vertical spine: white fill with stroke to suggest a book spine */}
                <rect
                    x="8"
                    y="6"
                    width="6"
                    height="28"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#2F3A45"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </button>
    );
}