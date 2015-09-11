package nodomain.stswoon.patterns.headfirst.duckfrm.duck;

import nodomain.stswoon.patterns.headfirst.duckfrm.fly.FlyBehaviour;
import nodomain.stswoon.patterns.headfirst.duckfrm.quack.QuackBehavior;

public abstract class Duck {
    FlyBehaviour flyBehaviour;
    QuackBehavior quackBehavior;

    protected Duck() {}

    public abstract void display();

    public void performFly() {
        flyBehaviour.fly();
    }

    public void performQuack() {
        quackBehavior.quack();
    }

    public void swim() {
        System.out.println("swim");
    }

    public void setFlyBehaviour(FlyBehaviour flyBehaviour) {
        this.flyBehaviour = flyBehaviour;
    }

    public void setQuackBehavior(QuackBehavior quackBehavior) {
        this.quackBehavior = quackBehavior;
    }
}
