//https://habrahabr.ru/post/213805/
//http://winterbe.com/posts/2014/03/16/java-8-tutorial/

package lambda;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

public class MainLambda {
    static int outerNum;

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

        System.out.println("---list");
        for (int number : numbers) {
            System.out.println(number);
        }
        numbers.forEach((Integer value) -> System.out.print(value + " "));
        numbers.forEach(value -> System.out.println(value + " "));
        numbers.forEach(System.out::println);

        System.out.println("---sum");
        System.out.println(sumAll(numbers, n -> true));
        System.out.println(sumAll(numbers, n -> n % 2 == 0));
        System.out.println(sumAll(numbers, n -> n > 3));

        System.out.println("---functional interface");
        Converter<String, Integer> converter = (from) -> Integer.valueOf(from);
        Integer converted = converter.convert("123");
        System.out.println(converted);    // 123

        converter = Integer::valueOf;
        converted = converter.convert("123");
        System.out.println(converted);   // 123

        Something something = new Something();
        Converter<String, String> converter2 = something::startsWith;
        String converted2 = converter2.convert("Java");
        System.out.println(converted2);    // "J"

        PersonFactory<Person> personFactory = Person::new;
        Person person = personFactory.create("Peter", "Parker");
        System.out.println(person);

        System.out.println("---local vars");
        Converter<Integer, String> stringConverter1 = (from) -> {
            outerNum = 23;
            return String.valueOf(outerNum + from);
        };
        System.out.println(stringConverter1.convert(1));

        //Default lambda: Predicate, Function, Supplier, Consumer, Comparator
        //see more http://winterbe.com/posts/2014/03/16/java-8-tutorial/

        System.out.println("---only one example of Optional");
        Optional<String> optional = Optional.ofNullable("bam");
        System.out.println(optional.orElse("fallback"));
        Optional<String> optional2 = Optional.ofNullable(null);
        System.out.println(optional2.orElse("fallback"));
    }

    static public int sumAll(List<Integer> numbers, Predicate<Integer> p) {
        int total = 0;
        for (int number : numbers) {
            if (p.test(number)) {
                total += number;
            }
        }
        return total;
    }

    @FunctionalInterface
    interface Converter<F, T> {
        T convert(F from);
    }

    static class Something {
        String startsWith(String s) {
            return String.valueOf(s.charAt(0));
        }
    }

    static class Person {
        String firstName;
        String lastName;

        Person() {}

        Person(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        @Override
        public String toString() {
            return "Person{" +
                    "firstName='" + firstName + '\'' +
                    ", lastName='" + lastName + '\'' +
                    '}';
        }
    }

    interface PersonFactory<P extends Person> {
        P create(String firstName, String lastName);
    }
}
