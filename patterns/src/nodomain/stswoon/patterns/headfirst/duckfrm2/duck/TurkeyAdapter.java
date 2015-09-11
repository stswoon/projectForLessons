package nodomain.stswoon.patterns.headfirst.duckfrm2.duck;

import nodomain.stswoon.patterns.headfirst.duckfrm.duck.Duck;

public class TurkeyAdapter extends Duck {

    private final Turkey turkey;

    public TurkeyAdapter(Turkey turkey) {
        super();
        this.turkey = turkey;
    }

    @Override
    public void performFly() {
        for (int i = 0; i < 5; ++i) {
            turkey.fly();
        }
        //super.performFly();
    }

    @Override
    public void performQuack() {
        turkey.gobble();
        //super.performQuack();
    }

    @Override
    public void display() {
        System.out.println("TurkeyAdapter with " + turkey.getClass().getSimpleName());
    }
}
