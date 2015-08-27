package nodomain.stswoon.patterns.headfirst.duckfrm.duck;

import nodomain.stswoon.patterns.headfirst.duckfrm.fly.FlyWithWings;
import nodomain.stswoon.patterns.headfirst.duckfrm.quack.Quack;

public class MallardDuck extends Duck {
    public MallardDuck() {
        quackBehavior = new Quack();
        flyBehaviour = new FlyWithWings();
    }

    @Override
    public void display() {
        System.out.println("MallardDuck");
    }
}
