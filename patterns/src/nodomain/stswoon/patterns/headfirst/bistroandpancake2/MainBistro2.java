package nodomain.stswoon.patterns.headfirst.bistroandpancake2;

import nodomain.stswoon.patterns.headfirst.bistroandpancake2.shop.CafeMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake2.shop.DinnerMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu.IterableMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake2.shop.PancakeMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu.Menu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu.MenuComponent;
import nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu.MenuItem;
import nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu.Waitress;

import java.util.Iterator;

public class MainBistro2 {
    public static void main(String[] args) {
        MenuComponent pancakeMenu = new Menu("pancakeMenu");
        MenuComponent dinnerMenu = new Menu("dinnerMenu");
        MenuComponent cafeMenu = new Menu("cafeMenu");

        MenuComponent allMenus = new Menu("ALL");
        allMenus.add(pancakeMenu);
        allMenus.add(dinnerMenu);
        allMenus.add(cafeMenu);

        fill(pancakeMenu, new PancakeMenu());
        fill(dinnerMenu, new DinnerMenu());
        fill(cafeMenu, new CafeMenu());

        MenuComponent desertMenu = new Menu("desertMenu");
        desertMenu.add(new MenuItem("desert1", 100.0, false));
        pancakeMenu.add(desertMenu);

        Waitress waitress = new Waitress(allMenus);
        waitress.printMenu()
        ;
        System.out.println();
        System.out.println();
        System.out.println();
        waitress.printVegetarianMenu();
    }

    private static void fill(MenuComponent menuComponent, IterableMenu iterableMenu) {
        for (Iterator it = iterableMenu.createIterator(); it.hasNext();) {
            MenuItem menuItem = (MenuItem) it.next();
            menuComponent.add(menuItem);
        }
    }
}
