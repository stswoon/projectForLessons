public class PlusOperation implements Operation<Integer, BinaryInput> {
    public Integer calc(BinaryInput input) {
        long result = (long) input.first + (long) input.second;
        if (Integer.MIN_VALUE > result || result > Integer.MAX_VALUE) {
            throw new OutOfNumberException();
        }
        return (int) result;
    }
}
