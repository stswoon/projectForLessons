package nodomain.stswoon.patterns.internet.abstractfactory;

public class Red implements Color {
    @Override
    public void fill() {
        System.out.println("red");
    }
}
