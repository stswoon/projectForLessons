import java.util.ArrayDeque;
import java.util.Queue;

public class EndlessLoop {
    private Queue<ComputeTask> computeTasks = new ArrayDeque<ComputeTask>();

    private Worker worker1;
    private Worker worker2;
    private boolean flag = true;

    public void register(ComputeTask computeTask) {
        computeTasks.add(computeTask);
    }

    public void runCycle() {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                while (flag) {

                    //remove finished workers
                    if (worker1 != null) {
                        if (worker1.status == Worker.WorkerStatus.FINISHED) {
                            worker1 = null;
                        }
                    }
                    if (worker2 != null) {
                        if (worker2.status == Worker.WorkerStatus.FINISHED) {
                            worker2 = null;
                        }
                    }
                    //wait if workers are busy
                    if (worker1 != null && worker2 != null) {
                        System.out.println("Workers are busy, wait 1 sec");
                        Utils.delay(1000);
                        continue;
                    }

                    //try take new task and wait if there is no tasks
                    ComputeTask computeTask = computeTasks.poll();
                    if (computeTask == null) {
                        System.out.println("Loop is empty, wait 1 sec");
                        Utils.delay(1000);
                        continue;
                    }
                    //put task to free worker and run it
                    if (worker1 == null) {
                        worker1 = new Worker(computeTask);
                        System.out.println("Run worker1");
                        new Thread(worker1).start();
                    } else if (worker2 == null) {
                        worker2 = new Worker(computeTask);
                        System.out.println("Run worker2");
                        new Thread(worker2).start();
                    }
                }
            }
        };
        Thread thread = new Thread(runnable);
        thread.start();
    }

    public void stop() {
        flag = false;
    }
}
