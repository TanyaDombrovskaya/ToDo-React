import { createContext } from "react"
import useTasks from "../hooks/useTasks"
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll"

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

    const {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toogleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
    } = useTasks()

    const {
        firstInCompleteTaskRef,
        firstInCompleteTaskId
    } = useIncompleteTaskScroll(tasks)

    return (
        <TasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstInCompleteTaskRef,
                firstInCompleteTaskId,
                deleteTask,
                deleteAllTasks,
                toogleTaskComplete,
                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask
            }}
        >
        {children}
        </TasksContext.Provider>
    )
}