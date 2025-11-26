import { useState } from "react"
import Statistics from "./Statistics"
import Button from "./Button"

function App() {
  const [stats, setStats] = useState({good: 0, neutral: 0, bad: 0})

  const goodStat = () => {
    setStats({...stats, good: stats.good + 1})
  }
  const neutralStat = () => {
    setStats({...stats, neutral: stats.neutral + 1})
  }
  const badStat = () => {
    setStats({...stats, bad: stats.bad + 1})
  }
  const all = (stats.good + stats.neutral + stats.bad) || 0;
  const average = ((stats.good - stats.bad) / all) || 0;
  const positive = ((stats.good / (stats.good + stats.bad + stats.neutral)) * 100) || 0;

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={goodStat} text={"good"} />      
      <Button onClick={neutralStat} text={"neutral"} />      
      <Button onClick={badStat} text={"bad"} />      
      <h1>statistics</h1>
      <Statistics good={stats.good} neutral={stats.neutral} bad={stats.bad} all={all} average={average} positive={positive + "%"} />
    </>
  )
}

export default App
