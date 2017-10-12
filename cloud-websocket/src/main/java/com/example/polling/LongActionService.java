package com.example.polling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.IdGenerator;
import org.springframework.util.SimpleIdGenerator;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class LongActionService {
    private static final int TIME_TO_WAIT = 15;

    private Map<String, Boolean> actionMap = new HashMap<>();

    public boolean isFinished(String actionId) {
        return actionMap.get(actionId);
    }

    private IdGenerator idGenerator = new SimpleIdGenerator();

    public String start(String data, Callback callback) {
        String actionId = idGenerator.generateId().toString();
        actionMap.put(actionId, false);

        System.out.println("Waiting for 15sec");

        Timer remainingTimer = displayRemainingTime();
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                remainingTimer.cancel();
                callback.call(data);
                actionMap.put(actionId, true); //important to be after callback
            }
        }, TIME_TO_WAIT * 1000);

        return actionId;
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
