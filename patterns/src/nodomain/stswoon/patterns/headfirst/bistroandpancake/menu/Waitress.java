package nodomain.stswoon.patterns.headfirst.bistroandpancake.menu;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.DinnerMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.PancakeMenu;

import java.util.Iterator;

public class Waitress {
    PancakeMenu pancakeMenu;
    DinnerMenu dinnerMenu;

    public Waitress(PancakeMenu pancakeMenu, DinnerMenu dinnerMenu) {
        this.pancakeMenu = pancakeMenu;
        this.dinnerMenu = dinnerMenu;
    }

    public void printMenu() {
        System.out.println("---Breakfast");
        Iterator pancakeIterator = pancakeMenu.createIterator();
        printMenu(pancakeIterator);
        System.out.println("---Dinner");
        Iterator dinnerIterator = dinnerMenu.createIterator();
        printMenu(dinnerIterator);
    }

    private void printMenu(Iterator it) {
        while (it.hasNext()) {
            MenuItem menuItem = (MenuItem) it.next();
            System.out.println(menuItem.getName() + " " + menuItem.getPrice());
        }
    }
}
