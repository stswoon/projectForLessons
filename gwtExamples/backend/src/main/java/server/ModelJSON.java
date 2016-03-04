package server;

import javax.servlet.ServletOutputStream;
import java.io.IOException;

/**
 * Created by nekhozhin on 02.03.2016.
 */
public class ModelJSON {
    public void writeTo(ServletOutputStream outputStream, Greet greet) throws IOException {
        outputStream.print(greet.toString());
    }
}
