package nodomain.stswoon.patterns.headfirst.duckfrm2;

import nodomain.stswoon.patterns.headfirst.duckfrm.duck.Duck;
import nodomain.stswoon.patterns.headfirst.duckfrm.duck.MallardDuck;
import nodomain.stswoon.patterns.headfirst.duckfrm.fly.FlyRocketPowered;
import nodomain.stswoon.patterns.headfirst.duckfrm2.duck.Turkey;
import nodomain.stswoon.patterns.headfirst.duckfrm2.duck.TurkeyAdapter;
import nodomain.stswoon.patterns.headfirst.duckfrm2.duck.TurkeyDuckAdapter;
import nodomain.stswoon.patterns.headfirst.duckfrm2.duck.WildTurkey;

public class MainTurkeySimulator {
    public static void main(String[] args) {
        Duck mallard = new MallardDuck();
        mallard.setFlyBehaviour(new FlyRocketPowered());
        testDuck(mallard);

        Turkey turkey = new WildTurkey();
        Duck turkeyAdapter = new TurkeyAdapter(turkey);
        testDuck(turkeyAdapter);

        Turkey turkeyDuckAdapter = new TurkeyDuckAdapter( mallard);
        turkeyDuckAdapter.gobble();
        turkeyDuckAdapter.fly();
    }

    private static void testDuck(Duck duck) {
        duck.performFly();
        duck.performQuack();
        duck.display();
        duck.swim();
    }
}
