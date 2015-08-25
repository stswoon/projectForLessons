package nodomain.stswoon.patterns.internet.abstractfactory;

public class Green implements Color {
    @Override
    public void fill() {
        System.out.println("green");
    }
}
