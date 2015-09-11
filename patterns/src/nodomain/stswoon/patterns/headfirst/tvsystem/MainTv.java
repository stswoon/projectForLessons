package nodomain.stswoon.patterns.headfirst.tvsystem;

import nodomain.stswoon.patterns.headfirst.tvsystem.subsystems.Dvd;
import nodomain.stswoon.patterns.headfirst.tvsystem.subsystems.Projector;

public class MainTv {
    public static void main(String[] args) {
        HomeTheaterFacade facade = new HomeTheaterFacade(new Dvd(), new Projector());
        facade.watchMovie("movie");
        facade.endMovie();
    }
}
