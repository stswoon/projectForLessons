package nodomain.stswoon.patterns.headfirst.bistroandpancake;

import nodomain.stswoon.patterns.headfirst.bistroandpancake.menu.Waitress;
import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.DinnerMenu;
import nodomain.stswoon.patterns.headfirst.bistroandpancake.shop.PancakeMenu;

public class MainBistro {
    public static void main(String[] args) {
        PancakeMenu pancakeMenu = new PancakeMenu();
        DinnerMenu dinnerMenu = new DinnerMenu();

        Waitress waitress = new Waitress(pancakeMenu, dinnerMenu);
        waitress.printMenu();
    }
}
