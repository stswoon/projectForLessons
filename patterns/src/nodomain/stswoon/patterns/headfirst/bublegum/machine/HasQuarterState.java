package nodomain.stswoon.patterns.headfirst.bublegum.machine;

import java.util.Random;

public class HasQuarterState implements State {
    transient private static final int POSSIBILITY = 3; //means 1/POSSIBILITY * 100%
    transient private Random randomWinner = new Random(System.currentTimeMillis());
    transient private final GumballMachine gumballMachine;

    public HasQuarterState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    @Override
    public void insertQuarter() {
        System.out.println("You can't insert another quarter");
    }

    @Override
    public void ejectQuarter() {
        System.out.println("Quarter returned");
        gumballMachine.setState(gumballMachine.getNoQuarterState());
    }

    @Override
    public void turnCrank() {
        System.out.println("You turned...");
        int winner = randomWinner.nextInt(POSSIBILITY);
        if (winner == 0 && gumballMachine.getGumballCount() > 1) {
            gumballMachine.setState(gumballMachine.getWinnerState());
        } else {
            gumballMachine.setState(gumballMachine.getSoldState());
        }
    }

    @Override
    public void dispense() {
        System.out.println("ERROR: No gumball dispensed");
    }
}
