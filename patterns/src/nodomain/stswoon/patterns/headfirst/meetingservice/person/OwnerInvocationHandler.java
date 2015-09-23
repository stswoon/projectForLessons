package nodomain.stswoon.patterns.headfirst.meetingservice.person;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

class OwnerInvocationHandler implements InvocationHandler {
    private PersonBean personBean;

    public OwnerInvocationHandler(PersonBean personBean) {
        this.personBean = personBean;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (method.getName().startsWith("get")) {
            return method.invoke(personBean, args); //get methods available for all
        } else if (method.getName().equals("setRating")) {
            throw new IllegalAccessException("you can't set rating to yourself");
        } else if (method.getName().startsWith("set")) {
            return method.invoke(personBean, args); //other set methods available for myself
        } else {
            return null; //for other methods
        }
    }
}
