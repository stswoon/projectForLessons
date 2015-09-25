package nodomain.stswoon.patterns.headfirst.ducksuperfrm;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.*;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.factory.AbstractDuckFactory;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.factory.CountingDuckFactory;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.flock.Flock;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.goose.Goose;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.goose.GooseAdapter;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe.Quacklogist;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.statistics.QuackCounter;

public class MainSuperDuckSimulator {
    public static void main(String[] args) {
        MainSuperDuckSimulator duckSimulator = new MainSuperDuckSimulator();
        AbstractDuckFactory duckFactory = new CountingDuckFactory();
        duckSimulator.simulate(duckFactory);
    }

    private void simulate(AbstractDuckFactory duckFactory) {
        //Quackable mallardDuck = duckFactory.createMallardDuck();
        Quackable redheadDuck = duckFactory.createReadheadDuck();
        Quackable duckCall = duckFactory.createDuckCall();
        Quackable rubberDuck = duckFactory.createRubberDuck();
        Quackable gooseDuck = new GooseAdapter(new Goose()); //should not be counted so we not use QuackCounter

        Flock flockOfDucks = new Flock();
        flockOfDucks.add(redheadDuck);
        flockOfDucks.add(duckCall);
        flockOfDucks.add(rubberDuck);
        flockOfDucks.add(gooseDuck);

        Flock flockOfMallard = new Flock();
        for (int i = 0; i < 4; ++i) {
            flockOfMallard.add(duckFactory.createMallardDuck());
        }
        flockOfDucks.add(flockOfMallard);

        Quacklogist quacklogist = new Quacklogist();
        flockOfDucks.registerObserver(quacklogist);

        simulate(flockOfDucks);

        System.out.println("The ducks quacked count = " + QuackCounter.getNumberOfQuacks());
    }

    private void simulate(Quackable quackable) {
        quackable.quack();
    }
}
