package jdocs;

import java.io.Serializable;

/**
 * Class represents most common usage of jdocs
 * @author Nekhozhin
 * @author nekhozhin
 * @since 1.2 (version of program since this class is appears)
 * @param <T> some generics
 */
public class JDocsExample<T> implements SomeInterface {
    /**
     * some constant
     */
    private final static String CONSTANT = "some constant text";

    /**
     * {@inheritDoc}
     * <p>
     * See {@link ReturnObject} or {@link ReturnObject#method()} or {@link ReturnObject#ReturnObject()}
     * or {@link ReturnObject#x}
     * <p>
     * Value of {@link #CONSTANT} is "{@value #CONSTANT}"
     * <p>
     * Let's try some code
     * <pre><code>
     * public class JDocsExample {
     *      private final static String CONSTANT = "some constant text";
     *      ...
     * }
     * </code></pre>
     * <p>
     * And {@code one line code}
     * <p>
     * Let's <u>try</u> <b>some</b> <i>html</i>
     * <p>
     * <a href="{@docRoot}/../technotes/guides/collections/index.html">Java Collections Framework</a>
     * <table>
     *     <tr><td>1</td><td>a</td></tr>
     *     <tr><td>2</td><td>b</td></tr>
     * </table>
     * @param parameter some parameter
     * @return value
     * @throws RuntimeException
     * @see ReturnObject
     * @see SomeInterface#doSomethind(String)
     * @since 1.3 (version of program since this method is appears)
     * @deprecated since 1.5
     */
    @Deprecated
    @Override
    public ReturnObject doSomethind(String parameter) throws RuntimeException {
        return null;
    }

    /**
     * Some method
     * @param <E> some generic
     * @return null
     */
    private <E> E trygenerics() {
        return null;
    }

}
