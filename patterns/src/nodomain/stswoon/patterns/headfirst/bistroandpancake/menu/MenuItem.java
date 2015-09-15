package nodomain.stswoon.patterns.headfirst.bistroandpancake.menu;

public class MenuItem {
    private String name;
    private Double price;
    private boolean vegetarian;

    public MenuItem(String name, Double price, boolean vegetarian) {
        this.name = name;
        this.price = price;
        this.vegetarian = vegetarian;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }
}
