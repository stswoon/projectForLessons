package nodomain.stswoon.effectivejava.generics;

import java.util.HashSet;

class MainGenerics {
    public static void main(String[] args) {
        Example2 example2 = new Example2();
        example2.add2(new HashSet<>(), new HashSet<>());

    }
}
