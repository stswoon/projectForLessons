package gwt.client.jsni;

import com.google.gwt.core.client.JavaScriptObject;

public class AnimalImpl extends JavaScriptObject implements Animal {
    protected AnimalImpl() {
    }

    @Override
    public final native String getType() /*-{
        return this.type;
    }-*/;

    @Override
    public final native int getWeight() /*-{
        return this.weight;
    }-*/;
}
