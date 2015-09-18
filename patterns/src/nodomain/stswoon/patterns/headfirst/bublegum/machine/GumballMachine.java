package nodomain.stswoon.patterns.headfirst.bublegum.machine;

public class GumballMachine {
    private State soldOutState;
    private State noQuarterState;
    private State hasQuarterState;
    private State soldState;

    private State state = soldOutState;
    private int gumBallCount = 0;

    public GumballMachine(int gumBallCount) {
        soldOutState = new SoldOutState(this);
        noQuarterState = new NoQuarterState(this);
        hasQuarterState = new HasQuarterState(this);
        soldState = new SoldState(this);

        this.gumBallCount = gumBallCount;
        if (gumBallCount > 0) {
            state = noQuarterState;
        }
    }

    public void insertQuarter() {
        state.insertQuarter();
    }

    public void ejectQuarter() {
        state.ejectQuarter();
    }

    public void turnCrank() {
        state.turnCrank();
        state.dispense();
    }

    void setState(State state) {
        this.state = state;
    }

    void releaseBall() {
        System.out.println("A gumball comes rolling out the slot");
        if (gumBallCount != 0) {
            --gumBallCount;
        }
    }

    State getSoldOutState() {
        return soldOutState;
    }

    State getNoQuarterState() {
        return noQuarterState;
    }

    State getHasQuarterState() {
        return hasQuarterState;
    }

    State getSoldState() {
        return soldState;
    }

    int getGumBallCount() {
        return gumBallCount;
    }

    @Override
    public String toString() {
        return "GumballMachine{" +
                "state=" + state +
                ", gumBallCount=" + gumBallCount +
                '}';
    }
}
