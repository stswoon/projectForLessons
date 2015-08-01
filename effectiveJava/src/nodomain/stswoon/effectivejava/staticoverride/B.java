package nodomain.stswoon.effectivejava.staticoverride;

public class B extends A {
    static public void print() {
        System.out.println("B");
    }

    public void print2() {
        System.out.println("B");
    }
}
