package nodomain.stswoon.springbootdemo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class RegistrationAndAutoLogin {
//    /**
//     * Automatic login after successful registration.
//     * @param username
//     */
//    public boolean autoLogin(String username) {
//        try {
//            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//            Authentication authentication = new PrincipalSpringSecurityUserToken(username,
//                    username, userDetails.getPassword(), userDetails.getAuthorities(), userDetails);
//
//            // Place the new Authentication object in the security context.
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//        catch (Exception e) {
//            SecurityContextHolder.getContext().setAuthentication(null);
//            logger.error("Exception", e);
//            return false;
//        }
//        return true;
//    }
    @Resource
    private ProviderManager authenticationManager;

    @Autowired
    MyInMemoryUserDetailsManagerConfigurer myInMemoryUserDetailsManagerConfigurer;

    @RequestMapping(value = "/autoregistration")
    public ModelAndView autoLogin(HttpServletRequest request, HttpServletResponse response, String username, String password) {
        try {
            myInMemoryUserDetailsManagerConfigurer.getAdditionalUsers().put(username, password);

            
            // Must be called from request filtered by Spring Security, otherwise SecurityContextHolder is not updated
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
            token.setDetails(new WebAuthenticationDetails(request));
            Authentication authentication = authenticationManager.authenticate(token);
            //logger.debug("Logging in with {}", authentication.getPrincipal());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            SecurityContextHolder.getContext().setAuthentication(null);
            //logger.error("Failure in autoLogin", e);
        }
        //this step is important, otherwise the new login is not in session which is required by Spring Security
        request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
        //response.g.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());


        ModelMap model = new ModelMap();
        //model.add("message", "next page");
        return new ModelAndView(
                new RedirectView("/cities", true),
                model
        );
        //return "redirect:index.html";
    }
}
