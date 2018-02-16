import java.util.HashMap;
import java.util.Map;

public class DefaultCalculator implements Calculator {
    private Map<String, Operation<?, ?>> operationMap = new HashMap<>();

    /**
     * Types Description or create enum
     */
    public DefaultCalculator(Map<String, Operation<?, ?>> operationMap) {
        this.operationMap = operationMap;
        //addOperation("plus", new PlusOperation());
        //addOperation("minus", new MinusOperation());
        //todo show DI
        //todo -1, module, mul, div, pow, abs, signal func
    }

    @Override
    public <Result, Input> Result calc(String type, Input input) throws OutOfNumberException {
        Operation<Result, Input> operation = (Operation<Result, Input>) operationMap.get(type);
        return operation.calc(input);
    }

//    protected void addOperation(String type, Operation<?, ?> operation) {
//        operationMap.put(type, operation);
//    }
}
