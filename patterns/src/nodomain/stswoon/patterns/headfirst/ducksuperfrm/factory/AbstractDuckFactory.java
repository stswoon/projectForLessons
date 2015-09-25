package nodomain.stswoon.patterns.headfirst.ducksuperfrm.factory;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.Quackable;

public abstract class AbstractDuckFactory {
    public abstract Quackable createMallardDuck();
    public abstract Quackable createReadheadDuck();
    public abstract Quackable createDuckCall();
    public abstract Quackable createRubberDuck();
}
