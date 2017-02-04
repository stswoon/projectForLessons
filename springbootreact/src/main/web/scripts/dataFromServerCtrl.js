var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");

$.ajax({
    url: "/data",
}).done(function (response) {
    var PersonList = React.createClass({
        render: function () {
            var dataViews = [];
            this.props.data.forEach(function (dataItem) {
                dataViews.push(<div key={dataItem.id}>{dataItem.name} (phone {dataItem.phone})</div>);
            });
            return <div><span>Data from server:</span><div>{dataViews}</div></div>
        }
    });
    ReactDOM.render(
        <PersonList data={response}/>,
        document.getElementById("app")
    );
}).fail(function () {
    alert("Failed to get data");
});





