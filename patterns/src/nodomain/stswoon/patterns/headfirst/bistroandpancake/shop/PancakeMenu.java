package nodomain.stswoon.patterns.headfirst.bistroandpancake.shop;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.menu.MenuItem;

import java.util.ArrayList;
import java.util.Iterator;

public class PancakeMenu {
    ArrayList menuItems;

    public PancakeMenu() {
        menuItems = new ArrayList();

        addItem("pancake1", 1.10, true);
        addItem("pancake2", 2.20, false);
        addItem("pancake3", 3.30, false);
    }

    public void addItem(String name, double price, boolean vegetarian) {
        MenuItem menuItem = new MenuItem(name, price, vegetarian);
        menuItems.add(menuItem);
    }

    @Deprecated
    public ArrayList getMenuItems() {
        return menuItems;
    }

    public Iterator createIterator() {
        return menuItems.iterator();
    }
}
