package nodomain.stswoon.patterns.headfirst.bublegum.machine;

public interface State {
    void insertQuarter();
    void ejectQuarter();
    void turnCrank();
    void dispense();
}
