package nodomain.stswoon.patterns.headfirst.dj;

import nodomain.stswoon.patterns.headfirst.dj.controller.BeatController;
import nodomain.stswoon.patterns.headfirst.dj.controller.Controller;
import nodomain.stswoon.patterns.headfirst.dj.model.BeatModel;
import nodomain.stswoon.patterns.headfirst.dj.model.BeatModelImpl;

public class MainDJ {
    public static void main(String[] args) {
        BeatModel model = new BeatModelImpl();
        Controller controller = new BeatController(model);
    }
}
