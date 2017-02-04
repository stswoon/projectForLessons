package nodomain.stswoon.reactexample;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.ArrayList;

@org.springframework.web.bind.annotation.RestController
final class RestController {
    private final List<PersonDTO> PERSONS = new ArrayList<>();

    private RestController() {
        PERSONS.add(new PersonDTO("0", "Brown", "111-222-333"));
        PERSONS.add(new PersonDTO("1", "Smith", "555-555-555"));
        PERSONS.add(new PersonDTO("2", "Ivanov", "911"));
    }

    @RequestMapping(value = "/data")
    private List<PersonDTO> getData() {
        return PERSONS;
    }
}
