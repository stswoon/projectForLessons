package nodomain.stswoon.effectivejava.generics;

import java.util.HashSet;
import java.util.Set;

public class Example2 {
    Set<String> stringSet = new HashSet<String>() {{
        this.add("one");
        this.add("two");
    }};
    Set<Integer> integerSet = new HashSet<Integer>() {{
        this.add(1);
        this.add(2);
    }};

    public void add(Set<?> set1, Set<?> set2) {
        //generic forbid it
        //set1.addAll(set2);
    }

     public <E> void add2(Set<E> set1, Set<E> set2) {
        //generic forbid it
        set1.addAll(set2);
    }
}
