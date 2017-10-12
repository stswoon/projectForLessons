package com.example.complex;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReportController {
    @Autowired
    private ReportServiceWithLongExecution reportServiceWithLongExecution;

    @Autowired
    private ReportWebSocketHandler reportWebSocketHandler;

    @RequestMapping("/getReport")
    @ResponseBody
    public String getReport(@RequestParam("id") String id) {
        System.out.println("ReportController#getReport: id=" + id);
        reportServiceWithLongExecution.prepareReport(id, new Callback() {
            @Override
            public void call(String data) {
                reportWebSocketHandler.sendFinishReport(data);
            }
        });

        return ReportWebSocketControllerRegistrator.REPORT_SOCKET;
    }
}
