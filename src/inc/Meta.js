import { connect } from 'react-redux';
import ActionsTypes from "@/inc/ActionTypes";
const Meta = (props) => {
    props.setOptions({
        ...props
    })
    return (
        <>
            
        </>
    );
}
const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    setOptions: (data) => dispatch({type:ActionsTypes.SET_OPTION,data:data}), // Map your state to props
});
export default connect(mapStateToProps,mapDispatchToProps) (Meta);