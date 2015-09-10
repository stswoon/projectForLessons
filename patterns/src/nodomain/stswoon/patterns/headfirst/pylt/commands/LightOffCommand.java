package nodomain.stswoon.patterns.headfirst.pylt.commands;

import nodomain.stswoon.patterns.headfirst.pylt.objects.Light;

public class LightOffCommand implements Command {
    final Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }

    @Override
    public void undo() {
        //check work status before like in fan command
        light.on();
    }
}
