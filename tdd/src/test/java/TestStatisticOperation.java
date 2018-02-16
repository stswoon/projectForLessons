import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TestStatisticOperation {
    private StatisticOperation operation;

    @Before
    public void setup() {
        operation = new StatisticOperation();
    }

    @Test()
    public void test2minus1shouldBe1() {
        StatisticInput statisticInput = new StatisticInput();
        statisticInput.data.add(new ProbableInteger(1,1));
        StatisticResult statisticResult = operation.calc(statisticInput);
        assertEquals(1, statisticResult.M, 0.1);
        assertEquals(0, statisticResult.D, 0.1);
    }

    @Test()
    public void test2() {
        StatisticInput statisticInput = new StatisticInputBuilder().add(1,1).build();
        StatisticResult statisticResult = operation.calc(statisticInput);
        assertEquals(1, statisticResult.M, 0.1);
        assertEquals(0, statisticResult.D, 0.1);
    }
}