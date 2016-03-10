package gwt.client.cell;

import com.google.gwt.cell.client.Cell;
import com.google.gwt.cell.client.FieldUpdater;
import com.google.gwt.cell.client.HasCell;

public class PersonHasCell implements HasCell<Person, Person> {
    @Override
    public Cell<Person> getCell() {
        return new PersonCell();
    }

    @Override
    public FieldUpdater<Person, Person> getFieldUpdater() {
        return new FieldUpdater<Person, Person>() { //can be instantiated only once
            @Override
            public void update(int index, Person object, Person value) {
               object.setName(value.getName());
               object.setSurname(value.getSurname());
            }
        };
    }

    @Override
    public Person getValue(Person object) {
        return (object == null) ? Person.NULL_PERSON : object;
    }
}
