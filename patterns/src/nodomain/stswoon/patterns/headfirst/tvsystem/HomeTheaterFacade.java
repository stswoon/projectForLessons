package nodomain.stswoon.patterns.headfirst.tvsystem;

import nodomain.stswoon.patterns.headfirst.tvsystem.subsystems.Dvd;
import nodomain.stswoon.patterns.headfirst.tvsystem.subsystems.Projector;

public class HomeTheaterFacade {
    Dvd dvd;
    Projector projector;
    //etc

    public HomeTheaterFacade(Dvd dvd, Projector projector) {
        this.dvd = dvd;
        this.projector = projector;
        //etc
    }

    public void watchMovie(String movie) {
        projector.on();
        projector.wideScreenMode();
        dvd.on();
        dvd.play(movie);
        //etc
    }

    public void endMovie() {
        projector.off();
        dvd.stop();
        dvd.eject();
        dvd.off();
        //etc
    }
}
