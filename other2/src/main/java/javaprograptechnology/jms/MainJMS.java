package javaprograptechnology.jms;

public class MainJMS {

    public static void main(String[] args) {

        try {
            Sender sender = new Sender();
            sender.init();
            Reciever reciever = new Reciever();
            reciever.init();

            sender.send();

            sender.close();
            reciever.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
