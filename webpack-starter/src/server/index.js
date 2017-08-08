import express from "express"
import React from "react";
import {renderToString} from "react-dom/server";
import App from "../App"
const path = require("path");

console.log("starting express");
const app = express();


app.get("/server", (req, res) => {
    //var f = require("../index.html");
    //res.send(f); //todo file from dist
    res.send(`
        ${renderToString(<App/>)}
    `);
});


//https://www.npmjs.com/package/express-interceptor //todo cherio
var interceptor = require('express-interceptor');
var finalParagraphInterceptor = interceptor(function(req, res){
    return {
        isInterceptable: function(){
            let b = /text\/html/.test(res.get('Content-Type'));
            console.log(b);
            return b;
        },
        intercept: function(body, send) {
            console.log("server listen");
            body = body.replace('<div id="root"></div>', '<div test="test" id="root">'+renderToString(<App/>)+'</div>')
            send(body);
        }
    };
});
app.use(finalParagraphInterceptor);
app.use(express.static("dist"));


app.listen(process.env.PORT || 9000, () => {
    console.log("server listen");
});