package nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.goose;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.Quackable;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.AbstractQuackObserver;

public class GooseAdapter extends AbstractQuackObserver implements Quackable {
    private Goose goose;

    public GooseAdapter(Goose goose) {
        this.goose = goose;
    }

    @Override
    public void quack() {
        goose.honk();
        notifyObservers();
    }
}
