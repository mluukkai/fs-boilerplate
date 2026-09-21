import { useEffect, useState } from "react"

const App = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats)
  }, [])

  const handlePress = () => {
    fetch("/api/press", { method: "POST" })
      .then((res) => res.json())
      .then(setStats)
  }

  if (!stats) return <div>Loading...</div>

  return (
    <div>
      <h1>Button presses</h1>
      <button onClick={handlePress}>Press me</button>
      <p>
        Today ({stats.today.date}): {stats.today.count} presses
      </p>
      {stats.max && (
        <p>
          Most presses on {stats.max.date}: {stats.max.count}
        </p>
      )}
    </div>
  )
}

export default App
