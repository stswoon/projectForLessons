package nodomain.stswoon.springbootdemo;

import nodomain.stswoon.springbootdemo.dbmodel.City;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CityRepo extends PagingAndSortingRepository<City, Long> {
}
