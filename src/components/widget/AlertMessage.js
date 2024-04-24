const AlertMessage = ({message,type}) => {
    if(!message){
        return <></>
    }
    let className = 'text-success';
    if(type){
        className = type;
    }
    return <p className={className} dangerouslySetInnerHTML={{__html:message}}></p>
}
export default AlertMessage;