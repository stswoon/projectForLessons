package nodomain.stswoon.springbootdemo.controller;

import nodomain.stswoon.springbootdemo.CityRepo;
import nodomain.stswoon.springbootdemo.dbmodel.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.POST;
import javax.ws.rs.core.Request;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/cities")
public class CityController {
    @Autowired
    private CityRepo repo;

    // read

//    @RequestMapping("/{isbn}")
//    public BookResource findByIsbn(@PathVariable final String isbn) {
//        final City City = Checks.checkEntityExists(repo.findByIsbn(isbn), "No City found for isbn = " + isbn);
//
//        final BookResource bookResource = new BookResource(City);
//        bookResource.add(linkTo(methodOn(CartController.class).addBookToCart(bookResource)).withRel("add-to-cart"));
//
//        return bookResource;
//    }

    @RequestMapping(method = RequestMethod.GET)
    //@POST
    public List<CityResource> findAll() {
        final List<City> cities = (List<City>) repo.findAll();
        final List<CityResource> cityResources = new ArrayList<>();
        for (City city : cities) {
            cityResources.add(new CityResource(city.getName()));
        }
        return cityResources;
    }
//
//    @JsonView(BookView.Summary.class)
//    @RequestMapping(method = RequestMethod.GET, params="summary")
//    public List<BookResource> findAllSummary() {
//        final List<City> books = (List<City>) repo.findAll();
//        final List<BookResource> bookResources = books.stream().map(BookResource::new).collect(Collectors.toList());
//        return bookResources;
//    }
//
//    // write
//
//    @RequestMapping(method = RequestMethod.POST)
//    public void create(@RequestBody BookResource newBook) {
//        repo.save(newBook.getCity());
//    }
//}

    @RequestMapping("/create")
    public void create() {
        City city = new City();
        city.setId(null);
        city.setName("new");
        repo.save(city);
    }

    @RequestMapping("/jsonTest")
    public String jsonTest(@ModelAttribute("user") User user) {
       return user.toString();
    }

    @RequestMapping("/jsonTest2")
    public String jsonTest2(User user) {
        return user.toString();
    }
}