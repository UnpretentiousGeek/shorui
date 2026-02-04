export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-mono">
          Shorui
        </h1>
        <p className="text-xl text-muted-foreground">
          Resume Version Control System
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          書類 - Git-like version control for your resumes
        </p>
      </div>
    </main>
  )
}
