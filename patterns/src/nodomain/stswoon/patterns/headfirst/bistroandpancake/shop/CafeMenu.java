package nodomain.stswoon.patterns.headfirst.bistroandpancake.shop;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.menu.MenuItem;

import java.util.Hashtable;
import java.util.Iterator;

public class CafeMenu implements Menu {
    Hashtable menuItems = new Hashtable();

    public CafeMenu() {
        addItem("cafe1", 10.10, true);
        addItem("cafe2", 20.20, false);
        addItem("cafe3", 30.30, false);
    }

    public void addItem(String name, double price, boolean vegetarian) {
        MenuItem menuItem = new MenuItem(name, price, vegetarian);
        menuItems.put(menuItem.getName(), menuItem);
    }

    @Override
    public Iterator createIterator() {
        return menuItems.values().iterator();
    }
}
