package nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe.QuackObservable;

public interface Quackable extends QuackObservable {
    void quack();
}
