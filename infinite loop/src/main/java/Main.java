public class Main {
    public static void main(String[] args) {
        EndlessLoop loop = new EndlessLoop();

        loop.runCycle();

        loop.register(createComputeTask("task1",5, 500));
        Utils.delay(1000);
        loop.register(createComputeTask("task2",7, 200));
        loop.register(createComputeTask("task3",8, 300));

        Utils.delay(7000);
        loop.register(createComputeTask("task4",3, 300));

        Utils.delay(5000);
        loop.stop();
    }

    private static ComputeTask createComputeTask(final String name, final int count, final int delay) {
        return new ComputeTask() {
            @Override
            public void compute() {
                for (int i = 0; i < count; ++i) {
                    System.out.println(name + ": count=" + i + "/" + count);
                    Utils.delay(delay);
                }
            }
        };
    }
}
