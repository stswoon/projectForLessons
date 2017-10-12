package com.example.complex;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class ReportWebSocketControllerRegistrator implements WebSocketConfigurer {
    public static final String REPORT_SOCKET = "/reportSocket";

    @Autowired
    private ReportWebSocketHandler reportWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(reportWebSocketHandler, REPORT_SOCKET);
    }
}
