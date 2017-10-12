package com.example.complex;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

//socket by id
//timeout for case f5 on browser
//send before connection
//json data instead of text
//message about progress -> low
//security
//size

@Component
public class ReportWebSocketHandler extends TextWebSocketHandler {
    private WebSocketSession session;

    // This will send only to one client(most recently connected)
    public void sendFinishReport(String data) {
        if (session == null || !session.isOpen()) {
            throw new IllegalArgumentException("failed to get session");
        }

        try {
            System.out.println("Sending msg");
            session.sendMessage(new TextMessage(data));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Connection established");
        this.session = session;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        throw new Exception("Should not be called");
    }
}