package gwt.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.resources.client.CssResource;
import com.google.gwt.uibinder.client.*;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.*;

public class LoginDialogBox extends PopupPanel {
    @UiTemplate("UIBinder.ui.xml")
    interface MyBinder extends UiBinder<Widget, LoginDialogBox> {
    }

    private static MyBinder uiBinder = GWT.create(MyBinder.class);

    interface MyStyle extends CssResource {
        String redBox();
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

    @UiHandler("btnLogin")
    void submitLoginForm(ClickEvent event) {
        //if (validateEmail() && validatePassword()) {
        Window.alert("Logging in...");
        //}
    }
}
