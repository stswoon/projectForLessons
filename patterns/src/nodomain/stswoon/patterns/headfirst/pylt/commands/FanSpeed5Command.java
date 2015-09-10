package nodomain.stswoon.patterns.headfirst.pylt.commands;

import nodomain.stswoon.patterns.headfirst.pylt.objects.Fan;

public class FanSpeed5Command implements Command {
    final Fan fan;
    int previousSpeed;
    boolean previousWork;

    public FanSpeed5Command(Fan fan) {
        this.fan = fan;
    }

    @Override
    public void execute() {
        previousSpeed = fan.getSpeed();
        previousWork = fan.isWork();
        fan.on();
        fan.setSpeed(5);
    }

    @Override
    public void undo() {
        if (previousWork == false) {
            fan.off();
        } else {
            fan.on();
        }
        fan.setSpeed(previousSpeed);
    }
}
