package nodomain.stswoon.springbootdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(new Class<?>[] {DemoApplication.class/*, JpaConfig.class*/}, args);
	}
}
