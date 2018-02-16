public interface Operation<Result, Input> {
    Result calc(Input input) throws OutOfNumberException;
}
