import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

public class TestDefaultCalculator {
    @Test
    public void testCallOperation() {
        Object input = Mockito.mock(Object.class);
        Object result = Mockito.mock(Object.class);
        Operation operation = Mockito.mock(Operation.class);
        when(operation.calc(input)).thenReturn(result);
        Map<String, Operation<?, ?>> operationMap = new HashMap<String, Operation<?, ?>>() {{
            put("custom", operation);
        }};
        DefaultCalculator calculator = new DefaultCalculator(operationMap);
        Object er = calculator.calc("custom", input);
        assertEquals(result, er);
    }

    @Test
    public void testCallOperationMutation() {
        Operation operation = Mockito.mock(Operation.class);
        Map<String, Operation<?, ?>> operationMap = new HashMap<String, Operation<?, ?>>() {{
            put("custom", operation);
        }};
        DefaultCalculator calculator = new DefaultCalculator(operationMap);
        Object input = Mockito.mock(Object.class);
        Object input2 = Mockito.mock(Object.class);
        calculator.calc("custom", input);
        Mockito.verify(operation, never()).calc(input2);
    }

    @Test(expected = ClassCastException.class)
    public void testCallDefaultOperation() {
        Map<String, Operation<?, ?>> operationMap = new HashMap<>();
        Operation operation = Mockito.spy(new PlusOperation());
        operationMap.put("plus", new PlusOperation());
        DefaultCalculator calculator = new DefaultCalculator(operationMap);
        Object input = Mockito.mock(Object.class);
        calculator.calc("plus", input);
        Mockito.verify(operation).calc(input);
    }

    @Test
    public void testCallDefaultOperation2() {
        Map<String, Operation<?, ?>> operationMap = new HashMap<>();
        Operation operation = Mockito.spy(new PlusOperation());
        operationMap.put("plus", operation);
        DefaultCalculator calculator = new DefaultCalculator(operationMap);
        calculator.calc("plus", Mockito.mock(BinaryInput.class));
        Mockito.verify(operation, times(1)).calc(Mockito.any());
    }
}
