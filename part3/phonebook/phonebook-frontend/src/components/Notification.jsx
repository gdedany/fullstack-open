import '../index.css'
const Notification = (props) => {

    if (props.errorMessage !== null ) {
        console.log('error caught')
        return (<div className="error-message">
            {props.errorMessage}
        </div>)
    }
    else if (props.successMessage !== null ) {
        return <div className="success-message">
            {props.successMessage}
        </div>
    }
    else return null
}
export default Notification