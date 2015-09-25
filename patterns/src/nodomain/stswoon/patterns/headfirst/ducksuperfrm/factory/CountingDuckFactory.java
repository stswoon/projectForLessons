package nodomain.stswoon.patterns.headfirst.ducksuperfrm.factory;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.*;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.statistics.QuackCounter;

public class CountingDuckFactory extends AbstractDuckFactory {
    @Override
    public Quackable createMallardDuck() {
        return new QuackCounter(new MallardDuck());
    }

    @Override
    public Quackable createReadheadDuck() {
        return new QuackCounter(new RedheadDuck());
    }

    @Override
    public Quackable createDuckCall() {
        return new QuackCounter(new DuckCall());
    }

    @Override
    public Quackable createRubberDuck() {
        return new QuackCounter(new RubberDuck());
    }
}
