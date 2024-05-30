const ErrorMessage = ({errors,field,error}) => {
    if(error){
        return <p className="text-danger" dangerouslySetInnerHTML={{__html:error}}></p>
    }
    if(errors && errors[field]){
        return <p className="text-danger">{errors[field]}</p>
    }
    return <></>
}
export default ErrorMessage;