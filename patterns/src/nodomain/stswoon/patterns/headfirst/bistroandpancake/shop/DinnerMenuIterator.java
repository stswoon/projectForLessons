package nodomain.stswoon.patterns.headfirst.bistroandpancake.shop;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.menu.MenuItem;

import java.util.Iterator;

public class DinnerMenuIterator implements Iterator {
    MenuItem[] items;
    int position = 0;

    public DinnerMenuIterator(MenuItem[] items) {
        this.items = items;
    }

    @Override
    public boolean hasNext() {
        if (position >= items.length || items[position] == null) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public Object next() {
        MenuItem menuItem = items[position];
        ++position;
        return menuItem;
    }

    @Override
    public void remove() {
    }
}
