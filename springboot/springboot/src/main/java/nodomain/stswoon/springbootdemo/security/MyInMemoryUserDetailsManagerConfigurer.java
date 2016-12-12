package nodomain.stswoon.springbootdemo.security;

import org.springframework.context.annotation.Role;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.InMemoryUserDetailsManagerConfigurer;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.UserDetailsManagerConfigurer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class MyInMemoryUserDetailsManagerConfigurer extends UserDetailsManagerConfigurer {
    public static final Map<String, String> additionalUsers = new HashMap<>();

    public Map<String, String> getAdditionalUsers() {
        return additionalUsers;
    }

    public MyInMemoryUserDetailsManagerConfigurer() {
        super(new MyInMemoryUserDetailsManager(new ArrayList()));
    }

    private static class MyInMemoryUserDetailsManager extends InMemoryUserDetailsManager {
        public MyInMemoryUserDetailsManager(ArrayList arrayList) {
            super(arrayList);
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            if (additionalUsers.containsKey(username)) {
                return new User(username, additionalUsers.get(username), Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
            } else {
                return super.loadUserByUsername(username);
            }
        }
    }
}
