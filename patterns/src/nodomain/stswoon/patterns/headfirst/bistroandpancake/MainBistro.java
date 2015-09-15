package nodomain.stswoon.patterns.headfirst.bistroandpancake;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.menu.Waitress;
import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.CafeMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.DinnerMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.Menu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.PancakeMenu;

import java.util.LinkedHashMap;
import java.util.Map;

public class MainBistro {
    public static void main(String[] args) {
        PancakeMenu pancakeMenu = new PancakeMenu();
        DinnerMenu dinnerMenu = new DinnerMenu();
        CafeMenu cafeMenu = new CafeMenu();

        Map<String, Menu> menus = new LinkedHashMap<>();
        menus.put("Breakfast", pancakeMenu);
        menus.put("Lunch", cafeMenu);
        menus.put("Dinner", dinnerMenu);

        Waitress waitress = new Waitress(menus);
        waitress.printMenu();
    }
}
