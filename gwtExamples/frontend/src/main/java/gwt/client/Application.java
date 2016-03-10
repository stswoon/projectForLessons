package gwt.client;

import com.google.gwt.cell.client.*;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.event.logical.shared.ValueChangeEvent;
import com.google.gwt.event.logical.shared.ValueChangeHandler;
import com.google.gwt.user.cellview.client.*;
import com.google.gwt.user.client.ui.RootPanel;
import gwt.client.cell.Person;
import gwt.client.cell.PersonHasCell;

import java.util.ArrayList;
import java.util.List;

public class Application implements EntryPoint {
    public void onModuleLoad() {
        RootPanel.get().add(new LoginDialogBox());

        Cell<String> cell = new TextCell();
        CellWidget<String> cellWidget = new CellWidget<>(cell);
        cellWidget.setValue("qqq");
        RootPanel.get().add(cellWidget);

        drawCompositeCell();
        drawTableCell();
    }

    private void drawCompositeCell() {
        ArrayList<HasCell<Person, ?>> cells = new ArrayList<>();
        //first PersonHasCell should for example get name, second - surname but now they both display name and surname
        cells.add(new PersonHasCell());
        cells.add(new PersonHasCell());
        CompositeCell<Person> compositeCell = new CompositeCell<>(cells);
        final CellWidget<Person> cellWidget = new CellWidget<>(compositeCell);

        cellWidget.setValue(new Person("name-1", "surname-A"));
        RootPanel.get().add(cellWidget);
    }

    private void drawTableCell() {
        CellTable<Person> cellTable = new CellTable<>();
        cellTable.addColumn(new TextColumn<Person>() {
            @Override
            public String getValue(Person object) {
                return object.getName();
            }
        }, new TextHeader("name"));
        cellTable.addColumn(new TextColumn<Person>() {
            @Override
            public String getValue(Person object) {
                return object.getSurname();
            }
        },new TextHeader("surname"));
        List<Person> list = new ArrayList<>();
        for (int i = 0; i < 30; ++i) {
            list.add(new Person(Integer.toString(i), Integer.toString(i*i)));
        }
        cellTable.setRowData(list);
        RootPanel.get().add(cellTable);
    }
}
