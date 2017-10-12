package com.example.polling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.IdGenerator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class ControllerWithLongServerAction {
    @Autowired
    private LongActionService longActionService;

    @RequestMapping("/startLongServerAction")
    @ResponseBody
    public String getReport(@RequestParam("data") String allData) {
        System.out.println("startLongServerAction: allData=" + allData);

        String actionId = longActionService.start(allData, new Callback() {
            @Override
            public void call(String data) {
                System.out.println("long action finished: data=" + data);
            }
        });

        return "{" +
                "\"polling\":\"/pollingLongServerAction?id=" + actionId + "\"," +
                "\"finish\":\"/getLongActionResult?id=" + actionId + "\"" +
                "}";
    }


    @RequestMapping("/pollingLongServerAction")
    @ResponseBody
    public String polling(@RequestParam("id") String actionId) {
        System.out.println("polling: actionId=" + actionId + " result=" + longActionService.isFinished(actionId));
        return Boolean.toString(longActionService.isFinished(actionId));
    }

    @RequestMapping("/getLongActionResult")
    @ResponseBody
    public String getLongActionResult(@RequestParam("id") String actionId) {
        if (longActionService.isFinished(actionId)) {
            return "FINISHED";
        } else {
            return "IT SHOULD NOT BE HAPPEN";
        }
    }
}
