package nodomain.stswoon.patterns.headfirst.pylt;

import nodomain.stswoon.patterns.headfirst.pylt.commands.Command;

public class SimpleRemoteControl {
    private static final int N = 7;
    private Command[] onCommands;
    private Command[] offCommands;
    private Command undoCommand;

    public SimpleRemoteControl() {
        onCommands = new Command[N];
        offCommands = new Command[N];

        Command noCommand = new NoCommand();
        for (int i = 0; i < N; ++i) {
            onCommands[i] = noCommand;
            offCommands[i] = noCommand;
        }

        undoCommand = noCommand;
    }

    public void setCommand(int slot, Command onCommand, Command offCommand) {
        onCommands[slot] = onCommand;
        offCommands[slot] = offCommand;
    }

    public void onButtonWasPressed(int slot) {
        onCommands[slot].execute();
        undoCommand = onCommands[slot];
    }

    public void offButtonWasPressed(int slot) {
        offCommands[slot].execute();
        undoCommand = offCommands[slot];
    }

    public void undoButtonWasPressed() {
        undoCommand.undo();
    }

    private class NoCommand implements Command {
        @Override
        public void execute() {
            System.out.println("NoCommand - execute");
        }

        @Override
        public void undo() {
            System.out.println("NoCommand - undo");
        }
    }
}
