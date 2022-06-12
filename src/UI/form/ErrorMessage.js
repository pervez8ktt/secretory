const ErrorMessage = (props) => {
    return <>
        {!props.isValid?<p>{props.errorMessage}</p>:''}   
    </>
}

export default ErrorMessage;