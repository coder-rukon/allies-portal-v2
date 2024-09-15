const SmartBox  = (props) => {
    let color1 = props.color1 ? props.color1 : '#B679F2';
    let color2 = props.color2 ? props.color2 : '#DB3399';
    return(
        <div className={props.className ? ( 'rs_smart_box ' + props.className ) : 'rs_smart_box'} style={{backgroundImage:'linear-gradient(90deg,'+color1+','+color2+')'}}>
            <h2 className="title">{props.title}<span>{props.number}</span></h2>
            <div className="bx_contents">
                {props.children}
            </div>
            
        </div>
    )
}
export default SmartBox