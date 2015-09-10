package nodomain.stswoon.patterns.headfirst.pylt.commands;

import nodomain.stswoon.patterns.headfirst.pylt.objects.Fan;

public class FanOffCommand implements Command {
    final Fan fan;
    int previousSpeed;
    boolean previousWork;

    public FanOffCommand(Fan fan) {
        this.fan = fan;
    }

    @Override
    public void execute() {
        previousSpeed = fan.getSpeed();
        previousWork = fan.isWork();
        fan.setSpeed(0);
        fan.off();
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
