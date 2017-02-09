var React = require("react");
var ReactDOM = require("react-dom");

var Main = React.createClass({
    render: function(){
        return (
            <div>
                Hello World from react! - new text to fail tests
            </div>
        );
    }
});

if (document.getElementById("app")) {
    ReactDOM.render(<Main />, document.getElementById("app"));
}

export default Main;

