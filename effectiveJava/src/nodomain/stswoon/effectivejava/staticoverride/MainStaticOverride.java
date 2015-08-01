package nodomain.stswoon.effectivejava.staticoverride;

class MainStaticOverride {
    public static void main(String[] args) {
        A a = new B();
        a.print();
        a.print2();
    }
}
