import { createContext } from "react"
import { 
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo
} from 'react'

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')

        if (savedTasks) {
            return JSON.parse(savedTasks)
        }

        return [
            {id: 'task-1', title: 'Купить молоко', isDone: false},  
            {id: 'task-2', title: 'Погладить кота', isDone: true}, 
        ]
    })

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const newTaskInputRef = useRef(null)
    const firstInCompleteTaskRef = useRef(null)
    const firstInCompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you shure to delete all?')

        if (isConfirmed) {
            setTasks([])
        }
    }, [])

    const deleteTask = useCallback((taskId) => {
        const isConfirmedTask = confirm('Are you shure to delete task?')

        if (isConfirmedTask){
            setTasks (
                tasks.filter((task) => task.id !== taskId)
            )
        }
    }, [tasks])

    const toogleTaskComplete = useCallback((taskId, isDone) => {
        setTasks (
            tasks.map((task) => {
                if (task.id === taskId) {
                    return {...task, isDone}
                }

                return task
            })
        )
    }, [tasks])

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone:false
            }

            setTasks((prevTasks) => [...prevTasks, newTask])
            setSearchQuery('')
            setNewTaskTitle('')
            newTaskInputRef.current.focus() 
        }
    }, [newTaskTitle])

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
      newTaskInputRef.current.focus()  
    }, [])

    const renderCount = useRef(0)

    useEffect(() => {
        renderCount.current++
    })

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()

        return clearSearchQuery.length > 0
        ? tasks.filter(( { title })  => title.toLowerCase().includes(clearSearchQuery))
        : null
    }, [searchQuery, tasks])

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