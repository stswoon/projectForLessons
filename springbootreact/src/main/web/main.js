ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById("example-helloworld")
);

//-----

var HelloMessage = React.createClass({
	render: function() {
		return <div>Hello {this.props.name}</div>;
	}
});

ReactDOM.render(
	<HelloMessage name="John"/>,
	document.getElementById("example-hellomessage")
);

//-----

var Message = React.createClass({
	render: function() {
		return <span ref="self">{this.props.message}</span>;
	},

	componentDidMount: function() {
		//this.refs.self.getDOMNode().setAttribute('debugId', this.props.debugId)
		var node = ReactDOM.findDOMNode(this);
		node.setAttribute('debugId', this.props.debugId);
	}
});

var TextList = React.createClass({
	getInitialState: function() {
		return {
			messages: [],
			staticNumber: 0
		};
	},

	componentWillMount: function() {
		this.pubsub_token = PubSub.subscribe('message-topic', function(topic, msg) {
			//this.setState({ selection: product });
			this.state.messages.push(msg);
			this.forceUpdate();
		}.bind(this));
	},

	componentWillUnmount: function() {
		PubSub.unsubscribe(this.pubsub_token);
	},

	render: function() {
		var view = [];
		var number = 0;
		var _this = this;
		this.state.messages.forEach(function(msg) {
			var key = _this.props.mykey + "_" + number;
			view.push(<Message message={msg} key={key} debugId={_this.state.staticNumber}/>); //todo key should not be changed for old <Messages>
			number++;
			_this.state.staticNumber++;
		});
		return <div>{view}</div>;
	}
});

var AddTextButton = React.createClass({
	getInitialState: function() {
		return {
			staticNumber: 0
		};
	},

	myclick: function() {
		//this.refs.forEach(function(textList) {
		//	textList.addMessage("text #" + this.state.staticNumber);
		//});
		PubSub.publish('message-topic', "text #" + this.state.staticNumber);
		this.state.staticNumber++;
	},

	render: function() {
		return <input type="button" onClick={this.myclick} value="Add Text"></input>
	}
});

var MyControll = React.createClass({
	render: function() {
		var textLists = [<TextList key="text-list-1" mykey="text-list-1"/>, <TextList key="text-list-2" mykey="text-list-2"/>];
		return (
			<div>
				<AddTextButton/>
				{textLists}
			</div>
		);
	}
});

ReactDOM.render(
	<MyControll/>,
	document.getElementById("example-hellocomplexcontrol")
);