package nodomain.stswoon.patterns.abstractfactory;

public class Red implements Color {
    @Override
    public void fill() {
        System.out.println("red");
    }
}
