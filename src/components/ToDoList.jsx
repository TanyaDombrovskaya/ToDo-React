import ToDoItem from "./TodoItem"

const ToDoList = (props) => {
    const {
        tasks = []
    } = props

    const hasTasks = true

    if (!hasTasks) { <div className="todo__empty-message"></div> }

    return (
        <ul className="todo__list">
            {tasks.map((task) => (
                /*спред с ключом*/
                <ToDoItem
                    className="todo__item"
                    key={task.id}
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