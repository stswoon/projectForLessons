package nodomain.stswoon.springbootdemo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import java.util.Collections;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    MyInMemoryUserDetailsManagerConfigurer myInMemoryUserDetailsManagerConfigurer;

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
            .antMatchers("/registration.html","/autoregistration").permitAll()
            .anyRequest().hasRole("USER")
            //.anyRequest().authenticated()
            .and()
            .formLogin().loginPage("/login.html").permitAll() //.loginPage("/login").failureUrl("/login-error");
            .and()
            .logout().permitAll();
    }

//    @Override
//    protected UserDetailsService userDetailsService() {
//        InMemoryUserDetailsManager userDetailsService = (InMemoryUserDetailsManager) myInMemoryUserDetailsManagerConfigurer.getUserDetailsService();
//        userDetailsService.createUser(new User("qqq", "qqq", Collections.singleton(new SimpleGrantedAuthority("USER"))));
//        return userDetailsService;
//    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        InMemoryUserDetailsManager userDetailsService = (InMemoryUserDetailsManager) myInMemoryUserDetailsManagerConfigurer.getUserDetailsService();
        userDetailsService.createUser(new User("qqq", "qqq", Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))));
        auth.userDetailsService(userDetailsService);
//        auth
//            .inMemoryAuthentication()
//            .withUser("qqq").password("qqq").roles("USER");
    }
}
