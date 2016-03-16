package gwt.client.gin;

import com.google.gwt.event.shared.EventBus;
import com.google.gwt.event.shared.SimpleEventBus;
import com.google.gwt.inject.client.AbstractGinModule;
import com.google.inject.Provides;

import javax.inject.Singleton;

class MyGinModule extends AbstractGinModule {
    @Override
    protected void configure() {
        bind(EventBus.class).to(SimpleEventBus.class).in(Singleton.class);
        bind(Computer.class).to(ComputerImpl.class).in(Singleton.class);
    }

    @Provides
    HardDisk provideHardDisk() {
        return new HardDisk() {
            @Override
            public String getName() {
                return "D";
            }
        };
    }
}
