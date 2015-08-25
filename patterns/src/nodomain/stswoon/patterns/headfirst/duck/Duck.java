package nodomain.stswoon.patterns.headfirst.duck;

public abstract class Duck {
    FlyBehaviour flyBehaviour;
    QuackBehavior quackBehavior;

    Duck() {}

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
}
