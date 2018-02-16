import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TestMinusOperation {
    private Operation operation;

    @Before
    public void setup() {
        operation = new MinusOperation();
    }

    @Test()
    public void test2minus1shouldBe1() {
        assertEquals(((Integer)1), operation.calc(new BinaryInput(2, 1)));
    }

    @Test(expected = OutOfNumberException.class)
    public void testMinMinus1ShouldBeOutOfNumberException() {
        operation.calc(new BinaryInput(Integer.MIN_VALUE, 1));
    }

    @Test(expected = OutOfNumberException.class)
    public void testMinMinus1ShouldBeOutOfNumberException2() {
        operation.calc(new BinaryInput(0, Integer.MIN_VALUE));
    }
}