package nodomain.stswoon.effectivejava.generics;

import java.util.*;

public class ExamplePECS {
    class MyContainer<E> {
        List<E> container;

        public void put(E obj) {
            container.add(obj);
        }

        public E get(int i) {
            return container.get(i);
        }

        public void putAll(List<? extends E> list) {
            container.addAll(list);
        }

        public <T extends Comparable<? super E>, E> T max() {
            Iterator<E> it = (Iterator<E>) container.iterator();
            E max = it.next();
            for (;it.hasNext();) {
                E e = it.next();
                if (e instanceof Comparable) {
                    if (((Comparable)e).compareTo(max) > 0) {
                        max = e;
                    }

                }
            }
            return (T) max;
        }
    }

    public void doit() {
        //if List<? extends E> -> List<E> than compilation error
        MyContainer<Number> container = new MyContainer<>();
        List<Integer> intList = null;
        container.putAll(intList);

        //don't understand
        MyContainer<Integer> container2 = new MyContainer<>();
        container.max();

    }
}
