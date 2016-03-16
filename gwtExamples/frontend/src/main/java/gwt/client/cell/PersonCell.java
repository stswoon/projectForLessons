package gwt.client.cell;

import com.google.gwt.cell.client.AbstractCell;
import com.google.gwt.cell.client.ValueUpdater;
import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.BrowserEvents;
import com.google.gwt.dom.client.Element;
import com.google.gwt.dom.client.NativeEvent;
import com.google.gwt.safehtml.client.SafeHtmlTemplates;
import com.google.gwt.safehtml.shared.SafeHtml;
import com.google.gwt.safehtml.shared.SafeHtmlBuilder;

public class PersonCell extends AbstractCell<Person> /*implements Redrawable*/ {

    public PersonCell() {
        super(BrowserEvents.CLICK);
    }

    interface ViewTemplate extends SafeHtmlTemplates {
        //@Template("<input type=\"text\" value=\"{0}\" tabindex=\"-1\"></input>")
        @Template("<table>" +
                "<tr><td>name:</td><td><span class='name'>{0}</span></td></tr>" +
                "<tr><td>surname:</td><td><span class='surname'>{1}</span></td></tr>" +
                "</table>")
        SafeHtml render(String name, String surname);
    }

    @Override
    public boolean isEditing(Context context, Element parent, Person value) {
        return false;
    }

    private ViewTemplate viewTemplate = GWT.create(ViewTemplate.class);

    @Override
    public void render(Context context, Person value, SafeHtmlBuilder sb) {
        sb.append(viewTemplate.render(value.getName(), value.getSurname()));
    }

    @Override
    public void onBrowserEvent(final Context context, final Element parent, final Person value, NativeEvent event, final ValueUpdater<Person> valueUpdater) {
        super.onBrowserEvent(context, parent, value, event, valueUpdater);

        if (BrowserEvents.CLICK.equals(event.getType())) {
            final PersonCell _this = this;
            new PersonEditWidget(value, new PersonEditWidget.CloseHandler() {
                @Override
                public void onClose(Person newValue) {
                    valueUpdater.update(newValue);
                    _this.setValue(context, parent, value);
                }
            }).show();
        }
    }
}
