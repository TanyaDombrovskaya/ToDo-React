import { useRef } from "react"

const useIncompleteTaskScroll = (tasks) => {
    const firstInCompleteTaskRef = useRef(null)
    const firstInCompleteTaskId = tasks.find(({isDone}) => !isDone)?.id
    
    return {
        firstInCompleteTaskRef,
        firstInCompleteTaskId
    }
}

export default useIncompleteTaskScroll