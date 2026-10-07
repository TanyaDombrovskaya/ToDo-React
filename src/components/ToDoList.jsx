import ToDoItem from "./TodoItem"

const ToDoList = (props) => {
    const {
        tasks = [],
        filteredTasks,
        firstInCompleteRef,
        firstInCompleteTaskId,
        onDeleteTaskButtonClick,
        onTaskCompleteChange
    } = props

    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    if (!hasTasks) { 
        return <div className="todo__empty-message">There are now tasks yet</div> 
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks not found</div>
    }

    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) => (
                /*спред с ключом*/
                <ToDoItem
                    className="todo__item"
                    key={task.id}
                    ref={task.id === firstInCompleteTaskId ? firstInCompleteRef: null}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCompleteChange={onTaskCompleteChange}
                    {...task}
                />

                /* либо использовать прямое обращение к каждому элементу
                <ToDoItem 
                    classname="todo__item"
                    id={task.id}
                    title={task.title}
                    isDone={task.isDone}
                />
                */
            ))}
        </ul>
    )
}

export default ToDoList