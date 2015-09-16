package nodomain.stswoon.patterns.headfirst.bistroandpancake2.menu;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Menu extends MenuComponent {
    List<MenuComponent> menuComponents = new ArrayList();
    String name;

    public Menu(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void print() {
        System.out.println("-------");
        String s = getName();
        System.out.println(s);

        for (MenuComponent menuComponent : menuComponents) {
            menuComponent.print();
        }
    }

    @Override
    public MenuComponent getChild(int i) {
        return menuComponents.get(i);
    }

    @Override
    public void add(MenuComponent menuComponent) {
        menuComponents.add(menuComponent);
    }

    @Override
    public void remove(MenuComponent menuComponent) {
        menuComponents.remove(menuComponent);
    }


    @Override
    public Iterator createIterator() {
//        if (iterator == null) {
//            iterator = new CompositeIterator(menuComponents.iterator());
//        }
//        return iterator;
        return new CompositeIterator(menuComponents.iterator());
    }
}
