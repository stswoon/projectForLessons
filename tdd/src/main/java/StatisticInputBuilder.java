public class StatisticInputBuilder {
    private StatisticInput input = new StatisticInput();

    public StatisticInputBuilder add(int x, double p) {
        input.data.add(new ProbableInteger(x, p)); //todo maybe ProbableInteger p should be > 0
        return this;
    }

    public StatisticInput build() {
        //todo also check p
        return input;
    }
}
