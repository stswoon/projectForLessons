package gwt.client.cell;

import com.google.gwt.cell.client.TextCell;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.*;

public class PersonEditWidget extends PopupPanel {
    private final CloseHandler closeHandler;

    private TextBox name = new TextBox();
    private TextBox surname = new TextBox();

    public interface CloseHandler {
        void onClose(Person newValue);
    }

    public PersonEditWidget(Person currentValue, CloseHandler closeHandler) {
        this.closeHandler = closeHandler;
        name.setValue(currentValue.getName());
        surname.setValue(currentValue.getSurname());
    }

    @Override
    public void show() {
        this.setModal(true);

        VerticalPanel verticalPanel = new VerticalPanel();
        verticalPanel.add(new Label("name:"));
        verticalPanel.add(name);
        verticalPanel.add(new Label("surname:"));
        verticalPanel.add(surname);

        final PersonEditWidget _this = this;
        verticalPanel.add(new Button("Save", new ClickHandler() {
            @Override
            public void onClick(ClickEvent event) {
                _this.hide();
                _this.closeHandler.onClose(new Person(name.getText(), surname.getText()));
            }
        }));
        verticalPanel.add(new Button("Cancel", new ClickHandler() {
            @Override
            public void onClick(ClickEvent event) {
                _this.hide();
            }
        }));

        this.add(verticalPanel);

        super.show();
    }
}
