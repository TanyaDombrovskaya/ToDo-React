const Field = (props) => {
    const {
        className = '',
        id,
        label,
        type = 'text'
    } = props

    return (
        <div className={`field ${className}`}>
          <label
            className="field__label"
            htmlFor="new-task"
          >
            {label}
          </label>
          <input
            className="field__input"
            id={id}
            placeholder=" "
            autoComplete="off"
            type={type}
          />
        </div>
    )
}

export default Field