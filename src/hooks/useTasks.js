import { 
    useState,
    useRef,
    useCallback,
    useEffect,
    useMemo
 } from "react"
import useTaskLocalStorage from "./useTaskLocalStorage"

const useTasks = () => {
    const {
        saveTask,
        savedTask
    } = useTaskLocalStorage()

    const [tasks, setTasks] = useState(savedTask ?? [
            {id: 'task-1', title: 'Купить молоко', isDone: false},  
            {id: 'task-2', title: 'Погладить кота', isDone: true}, 
    ])

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const newTaskInputRef = useRef(null)

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

    const addTask = useCallback((title) => {
        const newTask = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            title,
            isDone:false
        }

        setTasks((prevTasks) => [...prevTasks, newTask])
        setSearchQuery('')
        setNewTaskTitle('')
        newTaskInputRef.current.focus() 
    }, [])

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        
        saveTask(tasks)
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

    return {
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
    }
}

export default useTasks