package com.example.complex;

import org.springframework.stereotype.Component;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class ReportServiceWithLongExecution {
    private static final int TIME_TO_WAIT = 15;

    public void prepareReport(String id, Callback callback) {
        System.out.println("Waiting for 20sec");

        Timer remainingTimer = displayRemainingTime();
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                remainingTimer.cancel();
                callback.call("Report is ready, please see link yandex.ru");
            }
        }, TIME_TO_WAIT * 1000);
    }

    private Timer displayRemainingTime() {
        final AtomicInteger remainingTime = new AtomicInteger(TIME_TO_WAIT);
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                remainingTime.addAndGet(-3);
                if (remainingTime.get() < 0) remainingTime.set(0);
                System.out.println("remaining time=" + remainingTime.get());
            }
        }, 3 * 1000, 3 * 1000);
        return timer;
    }
}
