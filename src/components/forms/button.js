import Link from "next/link"

let Button = (props) =>{
    let onClickHanlder = (event) => {
        if(props.onClick){
            props.onClick(event)
        }
    }
    if(props.href){
        return (
            <Link href={props.href} className="rs_btn " target={props.target ? props.target : '_self'}>
                {props.label}
            </Link>
        )
    }else{
        return(
            <button onClick={ onClickHanlder } className={props.className ? "rs_btn " + props.className : "rs_btn "} >
                {props.beforeIcon ? <span className="material-symbols-outlined btn_icon">{props.beforeIcon}</span> : ''}
                {props.label}
                {props.icon ? <span className="material-symbols-outlined btn_icon">{props.icon}</span> : ''}
                
            </button>
        )
    }
    
}
export default Button