package nodomain.stswoon.patterns.headfirst.pylt.commands;

import nodomain.stswoon.patterns.headfirst.pylt.objects.Light;

public class LightOnCommand implements Command {
    final Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }

    @Override
    public void undo() {
        //check work status before like in fan command
        light.off();
    }
}
