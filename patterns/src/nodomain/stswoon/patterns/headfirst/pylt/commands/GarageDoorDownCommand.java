package nodomain.stswoon.patterns.headfirst.pylt.commands;

import nodomain.stswoon.patterns.headfirst.pylt.objects.GarageDoor;

public class GarageDoorDownCommand implements Command {
    final GarageDoor garageDoor;

    public GarageDoorDownCommand(GarageDoor garageDoor) {
        this.garageDoor = garageDoor;
    }

    @Override
    public void execute() {
        garageDoor.lightOff();
        garageDoor.down();
    }

    @Override
    public void undo() {
        //check work status before like in fan command
        garageDoor.up();
        garageDoor.lightOn();
    }
}
