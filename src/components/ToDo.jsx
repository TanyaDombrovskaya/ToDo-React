import { useContext } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"
import Button from "./Button"
import { TasksContext } from "../context/TasksContext"

const ToDo = () => {    
    const { firstInCompleteTaskRef } = useContext(TasksContext)

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm/>
            <SearchTaskForm/>
            <ToDoInfo/>
            <Button 
                onClick={() => firstInCompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
                Show first incomplete task
                </Button>
            <ToDoList/>
        </div>
    )
}

export default ToDo