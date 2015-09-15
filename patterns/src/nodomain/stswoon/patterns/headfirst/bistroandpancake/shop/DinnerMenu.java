package nodomain.stswoon.patterns.headfirst.bistroandpancake.shop;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.menu.MenuItem;

import java.util.Iterator;

public class DinnerMenu implements Menu{
    MenuItem[] menuItems;
    static final int MAX_ITEMS = 6;
    int numberOfItems = 0;

    public DinnerMenu() {
        menuItems = new MenuItem[MAX_ITEMS];

        addItem("dinner1", 1.01, true);
        addItem("dinner2", 2.02, false);
        addItem("dinner3", 3.03, false);
    }

    public void addItem(String name, double price, boolean vegetarian) {
        MenuItem menuItem = new MenuItem(name, price, vegetarian);
        if (numberOfItems == MAX_ITEMS) {
            System.err.println("Menu is full");
        } else {
            menuItems[numberOfItems] = menuItem;
            ++numberOfItems;
        }
    }

    @Deprecated
    public MenuItem[] getMenuItems() {
        return menuItems;
    }

    @Override
    public Iterator createIterator() {
        return new DinnerMenuIterator(menuItems);
    }
}
