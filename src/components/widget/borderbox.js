import { Component } from "react";
class BorderBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        let wrapperClass = this.props.className ? "rs_border_box_wrapper " + this.props.className : "rs_border_box_wrapper";
        return ( 
            <div className={wrapperClass}>
                { this.props.title ? <h2 className="rbb_titile">{this.props.title}</h2> : ''}
                <div className="rs_bb_inner">
                    {this.props.children}
                </div>
            </div>
         );
    }
}
 
export default BorderBox;