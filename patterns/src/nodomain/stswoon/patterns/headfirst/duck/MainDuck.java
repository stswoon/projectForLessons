package nodomain.stswoon.patterns.headfirst.duck;

public class MainDuck {
    public static void main(String[] args) {
        Duck mallard = new MallardDuck();
        mallard.performFly();
        mallard.performQuack();
        mallard.display();
        mallard.swim();
    }
}
