const useTaskLocalStorage = () => {
    const savedTask = localStorage.getItem('tasks')

    const saveTask = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    return {
        savedTask: savedTask ? JSON.parse(savedTask) : null,
        saveTask
    }
}

export default useTaskLocalStorage