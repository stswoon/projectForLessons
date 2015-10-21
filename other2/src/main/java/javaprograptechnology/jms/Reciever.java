package javaprograptechnology.jms;

import javax.jms.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class Reciever {
    private QueueConnection queueConnection;
    private QueueSession queueSession;
    private QueueReceiver queueReceiver;

    public void init() throws NamingException, JMSException {
        Context jndiContext = new InitialContext();
        QueueConnectionFactory queueConnectionFactory = (QueueConnectionFactory) jndiContext.lookup("MyJmsFactory");
        Queue queue = (Queue) jndiContext.lookup("MyJms");

        queueConnection = queueConnectionFactory.createQueueConnection();
        queueSession = queueConnection.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
        queueReceiver = queueSession.createReceiver(queue);

        final Reciever reciever = this;
        queueReceiver.setMessageListener(new MessageListener() {
            public void onMessage(Message message) {
                try {
                    reciever.take(message);
                } catch (JMSException e) {
                    e.printStackTrace();
                }
            }
        });

        queueConnection.start();
    }

    protected void take(Message message) throws JMSException {
        if (message instanceof TextMessage) {
            System.out.println(((TextMessage) message).getText());
        }
    }

    public void close() throws JMSException {
        queueConnection.close();
    }
}
