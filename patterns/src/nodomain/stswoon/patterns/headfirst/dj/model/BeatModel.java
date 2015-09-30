package nodomain.stswoon.patterns.headfirst.dj.model;

import nodomain.stswoon.patterns.headfirst.dj.view.BeatObserver;
import nodomain.stswoon.patterns.headfirst.dj.view.BmpObserver;

public interface BeatModel {
    void initialize();
    void on();
    void off();
    void setBpm(int bpm);
    int getBmp();

    void registerObserver(BeatObserver beatObserver);
    void removeObserver(BeatObserver beatObserver);
    void registerObserver(BmpObserver bmpObserver);
    void removeObserver(BmpObserver bmpObserver);
}
