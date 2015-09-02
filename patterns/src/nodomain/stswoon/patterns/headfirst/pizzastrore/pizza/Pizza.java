package nodomain.stswoon.patterns.headfirst.pizzastrore.pizza;

import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Cheeze;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Dough;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Sauce;

public abstract class Pizza {
    protected String name = this.getClass().getSimpleName();
    protected Dough dough;
    protected Sauce sauce;
    protected Cheeze cheeze;

    public void bake() {
        System.out.println("bake" + name);
    }

    public void cut() {
        System.out.println("cut" + name);
    }

    public abstract void prepare();

    public void box() {
        System.out.println("box" + name);
    }

    @Override
    public String toString() {
        String s = "Pizza{";
        s += "name=" + name;
        s += " dough=" + (dough==null?"null":dough.getClass().getSimpleName());
        s += " dough=" + (sauce==null?"null":sauce.getClass().getSimpleName());
        s += " dough=" + (cheeze==null?"null":cheeze.getClass().getSimpleName());
        s += "}";
        return s;
    }
}
