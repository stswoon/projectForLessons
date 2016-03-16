package gwt.client.gin;

import com.google.gwt.event.shared.EventBus;
import com.google.gwt.inject.client.GinModules;
import com.google.gwt.inject.client.Ginjector;

@GinModules(MyGinModule.class)
public interface MyGInjector extends Ginjector {
    EventBus getEventBus();
    Computer getComputer();
}
