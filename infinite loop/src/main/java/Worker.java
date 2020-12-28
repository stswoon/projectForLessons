public class Worker implements Runnable {
    static public enum WorkerStatus {
        NOT_STARTED, IN_PROGRESS, FINISHED
    }

    private ComputeTask computeTask;
    public WorkerStatus status = WorkerStatus.NOT_STARTED;

    public Worker(ComputeTask computeTask) {
        this.computeTask = computeTask;
    }

    @Override
    public void run() {
        status = WorkerStatus.IN_PROGRESS;
        computeTask.compute();
        status = WorkerStatus.FINISHED;
    }
}

