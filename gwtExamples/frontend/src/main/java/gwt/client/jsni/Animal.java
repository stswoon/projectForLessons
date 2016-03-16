package gwt.client.jsni;

import com.google.gwt.core.client.SingleJsoImpl;

@SingleJsoImpl(value = AnimalImpl.class)
public interface Animal {
    String getType();
    int getWeight();
}
