function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      <div className="text-center custom-card p-12 hover-lift max-w-4xl pulse-glow">
        <h1 className="text-5xl font-bold text-gradient mb-6">
          Welcome to Vite React TypeScript Tailwind Template
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Start building your next amazing project!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="custom-badge bg-blue-100 text-blue-700 border border-blue-200">
            🎨 Tailwind @apply: .text-gradient, .custom-badge
          </div>
          <div className="custom-badge bg-green-100 text-green-700 border border-green-200">
            ✨ Regular CSS: .custom-card, .hover-lift, .pulse-glow
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Hover over this card to see the custom hover effect!
        </p>
      </div>
    </div>
  )
}

export default App
