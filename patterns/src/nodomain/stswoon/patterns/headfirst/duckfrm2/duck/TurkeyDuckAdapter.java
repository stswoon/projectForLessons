package nodomain.stswoon.patterns.headfirst.duckfrm2.duck;

import nodomain.stswoon.patterns.headfirst.duckfrm.duck.Duck;

public class TurkeyDuckAdapter extends Duck implements Turkey {
    private final Turkey turkey;
    private final Duck duck;

    public TurkeyDuckAdapter(Turkey turkey) {
        super();
        this.turkey = turkey;
        duck = null;
    }

    public TurkeyDuckAdapter(Duck duck) {
        super();
        this.duck = duck;
        turkey = null;
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

    @Override
    public void gobble() {
        duck.performQuack();
    }

    @Override
    public void fly() {
        duck.performFly();
    }
}
