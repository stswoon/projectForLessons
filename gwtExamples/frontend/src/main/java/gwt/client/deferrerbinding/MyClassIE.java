package gwt.client.deferrerbinding;

import com.google.gwt.user.client.Window;

public class MyClassIE extends MyClass{
    @Override
    public void show() {
        Window.alert("ie");
    }
}
