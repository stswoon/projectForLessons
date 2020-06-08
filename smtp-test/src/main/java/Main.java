//https://www.tutorialspoint.com/javamail_api/javamail_api_smtp_servers.htm
//http://toolkas.blogspot.com/2019/02/java.html
//https://ru.wikipedia.org/wiki/JavaMail
//http://java-online.ru/javax-mail.xhtml
//https://www.journaldev.com/2532/javamail-example-send-mail-in-java-smtp

import com.sun.mail.smtp.SMTPMessage;

import java.util.Properties;
import java.util.UUID;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Main {
    public static void main(String[] args) {
        try {
            send();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void send() throws MessagingException {
        final String user = "stswoon.test@yandex.ru";
//        final String user = "stswoon.test";
//        final String password = "Qwerty!2";
        final String password = "pvgzeiefzougvhtq"; //https://yandex.ru/support/passport/authorization/app-passwords.html

        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.yandex.ru");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class", "javax.net.SocketFactory");
        properties.put("mail.debug", "true");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.ssl.trust", "smtp.yandex.ru");
        properties.put("mail.smtp.timeout", 1000);

        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(user));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(user));
        message.setSubject("Test E-Mail through Java");
        message.setText(UUID.randomUUID().toString());

        //message.addHeader("Disposition-Notification-To", user); //delivery
        //message.addHeader("Return-Receipt-To", user); //delivery
        //https://stackoverflow.com/questions/3676919/how-can-i-recieive-confirmation-for-delivered-email-with-javamail-api
        //https://www.rgagnon.com/javadetails/java-request-delivery-read-receipt-in-javamail.html
        //hidden image
        //https://stackoverflow.com/questions/3676919/how-can-i-recieive-confirmation-for-delivered-email-with-javamail-api

        //Transport.send(message);

        //https://stackoverflow.com/questions/1502941/javamail-delivery-status-problem
        SMTPMessage smtpMsg = new SMTPMessage((MimeMessage) message);
        smtpMsg.setReturnOption(SMTPMessage.RETURN_HDRS);
        smtpMsg.setNotifyOptions(
                SMTPMessage.NOTIFY_DELAY|SMTPMessage.NOTIFY_FAILURE|SMTPMessage.NOTIFY_SUCCESS);

        Transport.send(smtpMsg);


        //https://www.tutorialspoint.com/javamail_api/javamail_api_smtp_servers.htm
    }
}
