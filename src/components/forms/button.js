import Link from "next/link"

let Button = (props) =>{
    let onClickHanlder = (event) => {
        if(props.disable === true){
            return;
        }
        if(props.onClick){
            props.onClick(event)
        }
    }
    let className = props.className ? "rs_btn " + props.className : "rs_btn ";
    if(props.disable === true){
        className += ' btn_disable';
    }
    if(props.href){
        return (
            <Link href={props.href} className="rs_btn " target={props.target ? props.target : '_self'}>
                {props.label}
            </Link>
        )
    }else{
        return(
            <button onClick={ onClickHanlder } className={className} >
                {props.beforeIcon ? <span className="material-symbols-outlined btn_icon">{props.beforeIcon}</span> : ''}
                {props.label}
                {props.icon ? <span className="material-symbols-outlined btn_icon">{props.icon}</span> : ''}
                
            </button>
        )
    }
    
}
export default Button