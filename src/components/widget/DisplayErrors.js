const DisplayErrors = ({errors}) => {
    let message = []
    for (let field in errors) {
        if (errors.hasOwnProperty(field)) {
            if(errors[field]){
                errors[field].forEach(errorMessage => {
                    message.push(errorMessage);
                });
            }
            
        }
    }
    return message.map( (mes, key) => {
        return <p className="text-danger" key={key}>{mes}</p>
    })
}
export default DisplayErrors;