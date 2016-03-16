package gwt.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.resources.client.CssResource;
import com.google.gwt.uibinder.client.*;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.*;
import shared.FeedData;
import shared.MyService;
import shared.MyServiceAsync;

import java.util.ArrayList;

public class LoginDialogBox extends PopupPanel {
    @UiTemplate("UIBinder.ui.xml")
    interface MyBinder extends UiBinder<Widget, LoginDialogBox> {
    }

    private static MyBinder uiBinder = GWT.create(MyBinder.class);

    interface MyStyle extends CssResource {
        String redBox();

        String bolder();
    }

    @UiField
    MyStyle style;

    @UiField
    Button btnLogin;

    @UiField
    TextBox txtEmail;

    @UiField(provided = true)
    TextBox txtPassword;

    @UiField(provided = true)
    public MyMessages myMessages;

    public LoginDialogBox() {
        setStyleName("");
        txtPassword = new PasswordTextBox();
        myMessages = new MyMessages();
        add(uiBinder.createAndBindUi(this));
    }

    @UiHandler("btnLogin") //can contains list of values
    void submitLoginForm(ClickEvent event) {
        final AsyncCallback<ArrayList<FeedData>> updateTweetPanelCallback = new AsyncCallback<ArrayList<FeedData>>() {
            @Override
            public void onFailure(Throwable throwable) {
                Window.alert("error: " + throwable.getMessage());
            }

            @Override
            public void onSuccess(ArrayList<FeedData> feedDatas) {
                Window.alert(feedDatas.get(0).getData());
            }
        };

        MyServiceAsync service = GWT.create(MyService.class);
        service.getUserTimeline(txtEmail.getText(), updateTweetPanelCallback);
    }
}
