package javaprograptechnology.jms;

import javax.jms.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class Sender {
    private QueueConnection queueConnection;
    private QueueSession queueSession;
    private QueueSender queueSender;

    public void init() throws NamingException, JMSException {
        Context jndiContext = new InitialContext();
        QueueConnectionFactory queueConnectionFactory = (QueueConnectionFactory) jndiContext.lookup("MyJmsFactory");
        Queue queue = (Queue) jndiContext.lookup("MyJms");

        queueConnection = queueConnectionFactory.createQueueConnection();
        queueSession = queueConnection.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
        queueSender = queueSession.createSender(queue);
    }

    public void send() throws JMSException {
        TextMessage textMessage = queueSession.createTextMessage();
        textMessage.setText("try jms");
        queueSender.send(textMessage);
    }

    public void close() throws JMSException {
        queueConnection.close();
    }
}
