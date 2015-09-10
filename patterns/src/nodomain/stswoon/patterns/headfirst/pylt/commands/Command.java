package nodomain.stswoon.patterns.headfirst.pylt.commands;

public interface Command {
    void execute();
    void undo();
}
