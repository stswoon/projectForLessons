package nodomain.stswoon.patterns.headfirst.bublegum.machine;

public class GumballMachine {
    enum State {
        SOLD_OUT, NO_QUARTER, HAS_QUARTER, SOLD
    }

    State state = State.SOLD_OUT;
    int gumBallCount = 0;

    public GumballMachine(int gumBallCount) {
        this.gumBallCount = gumBallCount;
        if (gumBallCount > 0) {
            state = State.NO_QUARTER;
        }
    }

    public void insertQuarter() {
        switch (state) {
            case HAS_QUARTER:
                System.out.println("You can't insert another quarter");
                break;
            case NO_QUARTER:
                System.out.println("You inserted a quarter");
                state = State.HAS_QUARTER;
                break;
            case SOLD_OUT:
                System.out.println("You can't insert another quarter, the machine is sold out");
                break;
            case SOLD:
                System.out.println("Please wait, we're already giving you a gumball");
                break;
        }
    }

    public void ejectQuarter() {
        switch (state) {
            case HAS_QUARTER:
                System.out.println("Quarter returned");
                state = State.NO_QUARTER;
                break;
            case NO_QUARTER:
                System.out.println("You haven't inserted a quarter");
                break;
            case SOLD:
                System.out.println("Sorry you are already turned the crank");
                break;
            case SOLD_OUT:
                System.out.println("You can't eject, you haven't inserted a quarter yet");
                break;
        }
    }

    public void turnCrank() {
        switch (state) {
            case SOLD:
                System.out.println("Turning twice doesn't get another gumball");
                break;
            case NO_QUARTER:
                System.out.println("You turned but there's no quarter");
                break;
            case SOLD_OUT:
                System.out.println("You turned but there's no gumballs");
                break;
            case HAS_QUARTER:
                System.out.println("You turned...");
                state = State.SOLD;
                dispense();
                break;
        }
    }

    public void dispense() {
        switch (state) {
            case SOLD:
                System.out.println("A gumball comes rolling out the slot");
                --gumBallCount;
                if (gumBallCount == 0) {
                    System.out.println("Oops, out of gumballs");
                    state = State.SOLD_OUT;
                } else {
                    state = State.NO_QUARTER;
                }
                break;
            //next cases is unexpected behaviour tha never be done;
            case NO_QUARTER:
                System.out.println("ERROR: You need to pay first");
                break;
            case SOLD_OUT:
                System.out.println("ERROR: No gumball dispensed");
                break;
            case HAS_QUARTER:
                System.out.println("ERROR: No gumball dispensed");
                break;
        }
    }

    @Override
    public String toString() {
        return "GumballMachine{" +
                "state=" + state +
                ", gumBallCount=" + gumBallCount +
                '}';
    }
}
