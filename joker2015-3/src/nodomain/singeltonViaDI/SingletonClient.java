package nodomain.singeltonViaDI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component(value = "singletonClient")
public class SingletonClient {
    @Autowired
    public Singleton singleton;
}
