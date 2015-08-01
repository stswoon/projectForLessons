package nodomain.stswoon.effectivejava.asserts;

class MainAsserts {
    public static void main(String[] args) {
        int x = 100;
        //add -ea flag to Run -> Edit Configurations... -> Configuration -> VM Options
        //assert x == 99;
        System.out.println("failed");
    }
}
