package nodomain.stswoon.patterns.headfirst.tvsystem.subsystems;

public class Dvd {
    public void on() {
        System.out.println("dvd#on");
    }

    public void play(String movie) {
        System.out.println("dvd#play " + movie);
    }

    public void stop() {
        System.out.println("dvd#stop");
    }

    public void eject() {
        System.out.println("dvd#eject");
    }

    public void off() {
        System.out.println("dvd#of");
    }
}
