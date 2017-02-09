var React = require("react");
var ReactDOM = require("react-dom");

var Main = React.createClass({
    render: function(){
        return (
            <div>
                Hello World from react!
            </div>
        );
    }
});

export default Main;

//commented for test ReactDOM.render(<Main />, document.getElementById('app'));