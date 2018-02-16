import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class TestPlusOperation {
    private PlusOperation operation;

    @Before
    public void setup() {
        operation = new PlusOperation();
    }

    @Test
    public void test1plus2shouldBe3() {
        assertEquals(((Integer)3), operation.calc(new BinaryInput(1, 2)));
    }

    @Test
    public void testMinus1plus1ShouldBe0() {
        assertEquals(((Integer)0), operation.calc(new BinaryInput(-1, 1)));
    }

    @Test(expected = OutOfNumberException.class)
    public void testMaxPlus1ShouldBeOutOfNumberException() {
        operation.calc(new BinaryInput(Integer.MAX_VALUE, 1));
    }

    @Test(expected = OutOfNumberException.class)
    public void testMaxPlus1ShouldBeOutOfNumberException2() {
        operation.calc(new BinaryInput(1, Integer.MAX_VALUE));
    }
}