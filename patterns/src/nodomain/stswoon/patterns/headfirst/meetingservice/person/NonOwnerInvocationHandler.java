package nodomain.stswoon.patterns.headfirst.meetingservice.person;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

class NonOwnerInvocationHandler implements InvocationHandler {
    private PersonBean personBean;

    public NonOwnerInvocationHandler(PersonBean personBean) {
        this.personBean = personBean;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (method.getName().startsWith("get")) {
            return method.invoke(personBean, args); //get methods available for all
        } else if (method.getName().equals("setRating")) {
            return method.invoke(personBean, args); //others can set to you a rating
        } else if (method.getName().startsWith("set")) {
            throw new IllegalAccessException("you can't set data because you are not an owner");
        } else {
            return null; //for other methods
        }
    }
}
