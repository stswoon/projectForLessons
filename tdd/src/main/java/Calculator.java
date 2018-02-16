public interface Calculator {
    <Result, Input> Result calc(String type, Input input) throws OutOfNumberException;
}
