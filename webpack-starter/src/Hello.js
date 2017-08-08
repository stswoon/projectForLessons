import React from "react";

export default class Hello extends React.Component {
    render() {
        return <h1>Hello, world {this.props.staticContext}</h1> ;

        //todo https://github.com/cassiozen/ReactCasts/blob/master/episode13/episode-source-code/src/shared/news/News.js
    }
}
