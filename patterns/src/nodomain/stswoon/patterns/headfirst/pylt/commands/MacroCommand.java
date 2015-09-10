package nodomain.stswoon.patterns.headfirst.pylt.commands;

public class MacroCommand implements Command {
    Command[] commands;

    public MacroCommand(Command[] commands) {
        this.commands = commands;
    }

    @Override
    public void execute() {
        System.out.println("MacroCommand - start execute");
        for (Command command : commands) {
            command.execute();
        }
        System.out.println("MacroCommand - end execute");
    }

    @Override
    public void undo() {
        System.out.println("MacroCommand - start undo");
        for (Command command : commands) {
            command.undo();
        }
        System.out.println("MacroCommand - end undo");
    }
}
