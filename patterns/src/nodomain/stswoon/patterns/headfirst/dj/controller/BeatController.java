package nodomain.stswoon.patterns.headfirst.dj.controller;

import nodomain.stswoon.patterns.headfirst.dj.model.BeatModel;
import nodomain.stswoon.patterns.headfirst.dj.view.DjView;

public class BeatController implements Controller {
    BeatModel model;
    DjView view;

    public BeatController(BeatModel model) {
        this.model = model;
        this.view = new DjView(this, model);
        view.createView();
        view.createControls();
        view.disableStopMenuItem();
        view.enableStartMenuItem();
        model.initialize();
    }

    @Override
    public void setBmp(int bmp) {
       model.setBpm(bmp);
    }

    @Override
    public void increaseBmp() {
        int bmp = model.getBmp();
        model.setBpm(bmp + 1);
    }

    @Override
    public void decreaseBmp() {
        int bmp = model.getBmp();
        model.setBpm(bmp - 1);
    }

    @Override
    public void start() {
        model.on();
        view.disableStartMenuItem();
        view.enableStopMenuItem();
    }

    @Override
    public void stop() {
        model.off();
        view.disableStopMenuItem();
        view.enableStartMenuItem();
    }
}
