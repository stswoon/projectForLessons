package com.example.simple;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Timer;
import java.util.TimerTask;

//http://mmrath.com/post/websockets-with-angular2-and-spring-boot/
@Component
public class MyWebSocketHandler extends TextWebSocketHandler {
    private WebSocketSession session;

    // This will send only to one client(most recently connected)
    private void sendOneMessage() {
        System.out.println("Trying to send.");
        if (session != null && session.isOpen()) {
            try {
                System.out.println("Now sending");
                session.sendMessage(new TextMessage("hello from WebSocket"));
                System.out.println("Sending done");
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Don't have open session to send");
        }
    }

    public void startSending() {
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                sendOneMessage();
            }
        }, 0, 1000);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Connection established");
        this.session = session;
        startSending();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Received:" + message.getPayload());
//        if ("CLOSE".equalsIgnoreCase(message.getPayload())) {
//            session.close();
//        } else {
//            System.out.println("Received:" + message.getPayload());
//        }
    }
}