package nodomain;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        System.out.println("--- test-1");
        Future<String> future = CompletableFuture.completedFuture("test immediate");
        System.out.println(future.get());

        FakeAsyncCalls fakeAsyncCalls = new FakeAsyncCalls();
        System.out.println("--- test-2");
        future = CompletableFuture.supplyAsync(() -> fakeAsyncCalls.fastAsync());
        System.out.println(future.get());
        future = CompletableFuture.supplyAsync(new Supplier<String>() {
            @Override
            public String get() {
                return fakeAsyncCalls.fastAsync();
            }
        });
        System.out.println(future.get());

        System.out.println("--- test-3");
        future = CompletableFuture.supplyAsync(() -> fakeAsyncCalls.longAsync());
        System.out.println(future.get());
        System.out.println("end of test 3");

        System.out.println("--- test-4");
        future = CompletableFuture.supplyAsync(() -> fakeAsyncCalls.longAsync());
        System.out.println("main thread sep for 3 sec");
        for (int i = 3; i > 0; --i) {
            System.out.println("main thread wait " + i + " second");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ie) {
                ie.printStackTrace();
            }
        }
        System.out.println(future.get());
        System.out.println("end of main thread");
    }

    public static class FakeAsyncCalls {
        public String fastAsync() {
            return "fastAsync";
        }

        public String longAsync() {
            for (int i = 5; i > 0; --i) {
                System.out.println("wait " + i + " second");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ie) {
                    ie.printStackTrace();
                }
            }
            return "fastAsync";
        }
    }
}
