const course = {
  id: "math-1010",
  title: "Mathematics Fundamentals",
  code: "MATH-1008",
  instructor: "Michael Chen",
}

function HomePage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-serif text-stone-900">Courses</h1>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="rounded-xl border border-stone-300 bg-white px-6 py-8 shadow-md shadow-stone-400/20">
          <h2 className="text-lg font-semibold text-stone-900">{course.title}</h2>
          <p className="mt-1 text-sm uppercase tracking-wide text-stone-500">{course.code}</p>

          <div className="mt-12 text-sm font-medium text-stone-700">
            {course.instructor}
          </div>
        </article>
      </section>
    </div>
  )
}

export default HomePage
