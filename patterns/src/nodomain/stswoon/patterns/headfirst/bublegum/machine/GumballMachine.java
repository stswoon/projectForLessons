package nodomain.stswoon.patterns.headfirst.bublegum.machine;

public class GumballMachine {
    private State soldOutState;
    private State noQuarterState;
    private State hasQuarterState;
    private State soldState;
    private State winnerState;

    private State state = soldOutState;
    private int gumBallCount = 0;

    public GumballMachine(int gumBallCount) {
        soldOutState = new SoldOutState(this);
        noQuarterState = new NoQuarterState(this);
        hasQuarterState = new HasQuarterState(this);
        soldState = new SoldState(this);
        winnerState = new WinnerState(this);

        this.gumBallCount = gumBallCount;
        if (gumBallCount > 0) {
            state = noQuarterState;
        }
    }

    public State getState() {
        return state;
    }

    public void refill(int gumBallCount) {
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

    public State getWinnerState() {
        return winnerState;
    }

    @Override
    public String toString() {
        return "GumballMachine{" +
                "state=" + state +
                ", gumBallCount=" + gumBallCount +
                '}';
    }

    public int getGumballCount() {
        return gumBallCount;
    }
}
