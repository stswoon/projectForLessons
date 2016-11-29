package nodomain.stswoon.springbootdemo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //https://github.com/spring-projects/spring-boot/issues/179
        //https://kielczewski.eu/2014/12/spring-boot-security-application/
        //https://spring.io/guides/gs/securing-web/
        //http://docs.spring.io/spring-security/site/docs/current/guides/html5/helloworld-boot.html
        http.csrf().disable();
        http
            .authorizeRequests()
            .antMatchers("/","/*.js").permitAll()
            .anyRequest().hasRole("USER")
            //.anyRequest().authenticated()
            .and()
            .formLogin().loginPage("/login.html").permitAll() //.loginPage("/login").failureUrl("/login-error");
            .and()
            .logout().permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
            .withUser("qqq").password("qqq").roles("USER");
    }
}
