const Loading = (props) => {
    let style = {};
    if(props.color){
        style.color = props.color;
    }
    return(
        <div className="spinner-border text-primary" role="status" style={style}>
            <span className="visually-hidden">Loading...</span>
        </div>

    )
}
export default Loading;