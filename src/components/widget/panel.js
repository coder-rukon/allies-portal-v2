const Panel  = (props) => {
    return(
        <div className={props.className ? ( 'rs_panel ' + props.className ) : 'rs_panel'}>
            {props.children}
        </div>
    )
}
export default Panel