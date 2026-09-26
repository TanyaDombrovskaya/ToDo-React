import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"

const ToDo = () => {
    const tasks = [
        {id: 'task-1', title: 'Купить молоко', isDone: false},  
        {id: 'task-2', title: 'Погладить кота', isDone: true},      
    ]

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm />
            <SearchTaskForm />
            <ToDoInfo 
                total={tasks.length}
                done={tasks.filter(({isDone}) => isDone).length}
            />
            <ToDoList tasks={tasks}/>
        </div>
    )
}

export default ToDo