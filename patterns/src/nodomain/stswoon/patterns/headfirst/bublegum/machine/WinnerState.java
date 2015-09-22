package nodomain.stswoon.patterns.headfirst.bublegum.machine;

public class WinnerState extends SoldState {
    public WinnerState(GumballMachine gumballMachine) {
        super(gumballMachine);
    }

    @Override
    public void dispense() {
        System.out.println("You're WINNER. You get two gumballs for your quarter");
        gumballMachine.releaseBall();
        if (gumballMachine.getGumBallCount() == 0) {
            //it has never happens because there is a check on 2-ball in HasQuarterState#turnCrank
            System.out.println("ERROR: Oops, out of gumballs");
            gumballMachine.setState(gumballMachine.getSoldOutState());
        } else {
            gumballMachine.releaseBall();
            if (gumballMachine.getGumBallCount() > 0) {
                gumballMachine.setState(gumballMachine.getNoQuarterState());
            } else {
                System.out.println("Oops, out of gumballs");
                gumballMachine.setState(gumballMachine.getSoldOutState());
            }
        }
    }
}
