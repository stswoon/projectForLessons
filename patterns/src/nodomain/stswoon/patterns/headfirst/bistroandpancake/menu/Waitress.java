package nodomain.stswoon.patterns.headfirst.bistroandpancake.menu;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.Menu;

import java.util.Iterator;
import java.util.Map;

public class Waitress {
    Map<String, Menu> menus;

    public Waitress(Map<String, Menu> menus) {
        this.menus = menus;
    }

    public void printMenu() {
        for (Map.Entry<String, Menu> entry : menus.entrySet()) {
            System.out.println("---" + entry.getKey());
            printMenu(entry.getValue().createIterator());
        }
    }

    private void printMenu(Iterator it) {
        while (it.hasNext()) {
            MenuItem menuItem = (MenuItem) it.next();
            System.out.println(menuItem.getName() + " " + menuItem.getPrice());
        }
    }
}
