public class StatisticOperation implements Operation<StatisticResult, StatisticInput> {
    public StatisticResult calc(StatisticInput input) {
        //todo check StatisticInput and throw error if p != 1 or pi < 0
        StatisticResult statisticResult = new StatisticResult();
        input.data.forEach((propableInt) -> statisticResult.M += propableInt.x * propableInt.p);
        input.data.forEach((propableInt) -> statisticResult.D += propableInt.p * Math.pow(propableInt.x - statisticResult.M, 2));
        return statisticResult;
    }
}