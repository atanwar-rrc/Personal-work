import { type FormEvent, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

type ChatLocationState = {
    courseTitle?: string;
};

/*
 * Format helper so routes like `dsa-101` show up as “DSA 101”. Once the backend returns display
 * names directly this function can be dropped.
 */
function formatCourseTitle(rawId?: string, fallback?: string) {
    if (fallback) {
        return fallback;
    }
    if (!rawId) {
        return "Course Chat";
    }
    return rawId
        .split("-")
        .map((part) => (part.length ? part[0].toUpperCase() + part.slice(1) : part))
        .join(" ");
}

export default function ChatPage() {
    const { courseId } = useParams();
    const location = useLocation();
    const state = location.state as ChatLocationState | null;

    const courseHeading = useMemo(
        () => formatCourseTitle(courseId, state?.courseTitle),
        [courseId, state?.courseTitle]
    );

    const [message, setMessage] = useState("");

    /*
     * Submit handler placeholder. Replace the console.info block with a call to the chat service
     * once the API contract is in place. The handler already prevents empty messages and clears the
     * input after a successful send, so wiring in the async request should be straightforward.
     */
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = message.trim();
        if (!trimmed) {
            return;
        }

        // For now we just echo the message to the console so engineers can see the handoff point.
        console.info("Chat message submitted:", {
            courseId,
            message: trimmed,
        });

        setMessage("");
    }

    return (
        <div className="flex min-h-full flex-col text-gray-900">
            <header className="space-y-2">
                <p className="text-sm text-gray-500">{courseId ? courseId.toUpperCase() : "Course"} / AI Tutor</p>
                <h1 className="text-3xl font-serif">{courseHeading}</h1>
            </header>

            <section className="mt-8 flex flex-1 flex-col">
                <div className="flex-1">{/* Conversation history will live here once the chat API streams responses. */}</div>

                <form className="mt-8" aria-label="Chat input" onSubmit={handleSubmit}>
                    <label htmlFor="chat-message" className="sr-only">
                        Message the tutor
                    </label>
                    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm focus-within:ring-2 focus-within:ring-gray-400">
                        <input
                            id="chat-message"
                            name="chat-message"
                            type="text"
                            placeholder="Can you quiz me on derivatives?"
                            className="flex-1 bg-transparent outline-none text-sm"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-full bg-gray-800 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50"
                            aria-label="Send message"
                            disabled={!message.trim()}
                        >
                            Send
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

