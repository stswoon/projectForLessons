package nodomain.stswoon.patterns.headfirst.pylt.objects;

public class Fan {
    private int speed = 0;
    private boolean work = false;

    public void on() {
        work = true;
        System.out.println("Fan on");
    }

    public void off() {
        work = false;
        System.out.println("Fan off");
    }

    public void setSpeed(int speed) {
        this.speed = speed;
        System.out.println("Fan set speed = " + speed);
    }

    public int getSpeed() {
        return speed;
    }

    public boolean isWork() {
        return work;
    }
}
