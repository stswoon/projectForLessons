package nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu;

import java.util.Iterator;

public class MenuItem extends MenuComponent {
    private String name;
    private double price;
    private boolean vegetarian;

    public MenuItem(String name, Double price, boolean vegetarian) {
        this.name = name;
        this.price = price;
        this.vegetarian = vegetarian;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public double getPrice() {
        return price;
    }

    @Override
    public boolean isVegetarian() {
        return vegetarian;
    }

    @Override
    public void print() {
        String s = getName();
        if (isVegetarian()) {
            s += " (v)";
        }
        s += " " + getPrice();
        System.out.println("-- " + s);
    }

    @Override
    public Iterator createIterator() {
        return new NullIterator();
    }

    private class NullIterator implements Iterator {
        @Override
        public boolean hasNext() {
            return false;
        }

        @Override
        public Object next() {
            return null;
        }

        @Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
    }
}
