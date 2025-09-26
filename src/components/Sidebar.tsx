// Sidebar navigation for the AI Tutor app (light theme, static categories)
import { useState } from "react"
import { NavLink } from "react-router-dom"

const courseCategoriesSeed = [
  "Mathematics",
  "Computer Science",
  "Software Fundamentals",
  "Professional Development",
  "Web Development",
  "CX / UX",
]

function Sidebar() {
  const [courseCategories] = useState(courseCategoriesSeed)

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-stone-300 bg-stone-100 text-stone-800">
      <div className="flex items-center gap-3 border-b border-stone-300 px-5 py-4">
        <button
          type="button"
          aria-label="Toggle sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-400 bg-white text-stone-600"
        >
          <span className="h-4 w-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
            </svg>
          </span>
        </button>
        <NavLink to="/home" className="text-lg font-semibold text-stone-800">
          AI Tutor
        </NavLink>
      </div>

      <div className="px-5 py-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Courses
        </h2>
        <ul className="mt-4 space-y-3">
          {courseCategories.map((category) => (
            <li key={category} className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-stone-700">
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-stone-500" aria-hidden="true">
                  <path
                    d="M4.5 6.75A1.75 1.75 0 016.25 5h5.19c.329 0 .646.112.903.317l.88.696h4.527A1.75 1.75 0 0119.5 7.75v9.5A1.75 1.75 0 0117.75 19H6.25A1.75 1.75 0 014.5 17.25v-10.5z"
                    fill="currentColor"
                  />
                </svg>
                <span>{category}</span>
              </span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-stone-400" aria-hidden="true">
                <path d="M7 9l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
