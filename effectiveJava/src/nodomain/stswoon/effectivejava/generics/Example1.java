package nodomain.stswoon.effectivejava.generics;

import java.util.HashSet;
import java.util.Set;

public class Example1 {
    Set<String> stringSet = new HashSet<String>() {{
        this.add("one");
        this.add("two");
    }};
    Set<Integer> integerSet = new HashSet<Integer>() {{
        this.add(1);
        this.add(2);
    }};

    public int getCount(Set<?> set1, Set<?> set2) {
        int count = 0;
        count += set1.size();
        count += set2.size();
        return count;
    }

    public void doit() {
        //generic forbid it
        //stringSet.add(1);
    }
}
