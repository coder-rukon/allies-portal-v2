import Link from "next/link"

let Button = (props) =>{
    let onClickHanlder = (event) => {
        if(props.onClick){
            props.onClick(event)
        }
    }
    if(props.href){
        return (
            <Link href={props.href} className="rs_btn ">
                {props.label} ddd
            </Link>
        )
    }else{
        return(
            <button onClick={ onClickHanlder } className="rs_btn " >
                {props.label}
            </button>
        )
    }
    
}
export default Button