package nodomain.stswoon.springbootdemo.controller;

public class CityResource {
    private String name;

    public CityResource(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
