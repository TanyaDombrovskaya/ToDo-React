import ToDo from "./components/ToDo"
import { TasksProvider } from "./context/TasksContext"

const App = () => {
  return (
    <TasksProvider>
      <ToDo />
    </TasksProvider>
  )
}

export default App
