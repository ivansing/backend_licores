export const Alert = ({message}) => {
    return <div className="alert alert-danger text-center" role={alert}>
        <span>{message}</span>
    </div>
}

export default Alert;