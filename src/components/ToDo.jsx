import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"
import Button from "./Button"

const ToDo = () => {    
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
    const firstInCompleteRef = useRef(null)
    const firstInCompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you shure to delete all?')

        if (isConfirmed) {
            setTasks([])
        }
    }

    const deleteTask = (taskId) => {
        const isConfirmedTask = confirm('Are you shure to delete task?')

        if (isConfirmedTask){
            setTasks (
                tasks.filter((task) => task.id !== taskId)
            )
        }
    }

    const toogleTaskComplete = (taskId, isDone) => {
        setTasks (
            tasks.map((task) => {
                if (task.id === taskId) {
                    return {...task, isDone}
                }

                return task
            })
        )
    }

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone:false
            }

            setTasks([...tasks, newTask])
            setSearchQuery('')
            setNewTaskTitle('')
            newTaskInputRef.current.focus() 
        }
    }

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

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter(( { title })  => title.toLowerCase().includes(clearSearchQuery))
        : null

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm 
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ToDoInfo 
                total={tasks.length}
                done={tasks.filter(({isDone}) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button 
                onClick={() => firstInCompleteRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
                Show first incomplete task
                </Button>
            <ToDoList 
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstInCompleteRef={firstInCompleteRef}
                firstInCompleteTaskId={firstInCompleteTaskId}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toogleTaskComplete}
            />
        </div>
    )
}

export default ToDo