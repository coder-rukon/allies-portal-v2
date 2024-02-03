let Button = (props) =>{
    let onClickHanlder = (event) => {
        if(props.onClick){
            props.onClick(event)
        }
    }
    return(
        <button onClick={ onClickHanlder } className="rs_btn " >
            {props.label}
        </button>
    )
}
export default Button