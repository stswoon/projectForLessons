package nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu;

import java.util.Iterator;

public class Waitress {
    MenuComponent allMenus;

    public Waitress(MenuComponent allMenus) {
        this.allMenus = allMenus;
    }

    public void printMenu() {
        allMenus.print();
    }

    public void printVegetarianMenu() {
        Iterator it = allMenus.createIterator();
        System.out.println("VEGETARIAN MENU");
        while (it.hasNext()) {
            MenuComponent menuComponent = (MenuComponent) it.next();
            try {
                if (menuComponent.isVegetarian()) { //it is better to bo Boolean. If null then unsupported
                    menuComponent.print();
                }
            } catch (UnsupportedOperationException e) {
                //not interested in such cases
            }
        }
    }
}
