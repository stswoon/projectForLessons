package gwt.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.http.client.*;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.*;

/**
 * Application entry point
 * 
 */

public class Application implements EntryPoint
{

    static final String JSON_URL = "/hello/";
    
    private VerticalPanel vp = new VerticalPanel();

    public void onModuleLoad()
    {
        RootPanel.get().add(new Label("Hello"));
        final TextBox tb = new TextBox();
        tb.setTitle("Enter your username");
        tb.addKeyPressHandler(new KeyPressHandler() {
            public void onKeyPress(KeyPressEvent event)
            {
                if(event.getCharCode()==13)
                {
                    sendRequest(tb.getText());
                }
            }
        });
        Button button = new Button("Send", new ClickHandler() {
            public void onClick(ClickEvent event)
            {
                sendRequest(tb.getText());
            }
        });
        FlowPanel fp = new FlowPanel();
        fp.add(tb);
        fp.add(button);

        vp.setSpacing(5);
        vp.add(fp);
        RootPanel.get().add(vp);
    }
    
    void sendRequest(String name)
    {
        Greet greet = new Greet();
        greet.setName(name);
        greet.setStatus(Greet.Status.NEW);
        RequestBuilder builder = new RequestBuilder(RequestBuilder.POST, JSON_URL);
        try
        {
            builder.setHeader("Content-Type", "application/json");
            //builder.sendRequest(new JSONObject(greet).toString(), new RequestCallback() {
            builder.sendRequest(greet.toString(), new RequestCallback() {
                public void onError(Request request, Throwable exception)
                {
                    displayError("Couldn't retrieve JSON");
                }
                public void onResponseReceived(Request request, Response response)
                {
                    if (response.getStatusCode() == 200)
                        showGreet(Greet.parse(response.getText()));
                    else
                        displayError("Couldn't retrieve JSON");
                }
            });
        } catch (RequestException e) {
            displayError("Couldn't retrieve JSON");
        }
    }
    
    void showGreet(Greet greet)
    {
        vp.add(new Label("Greet #" + greet.getId() + ": " + greet.getMessage() + " | " /*+ greet.getStatus().getNumber()*/));
    }
    
    static void displayError(String error)
    {
        Window.alert(error);
    }

}
