package nodomain.singeltonViaDI;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestSpringContext {
    public static void main(String[] args) throws Exception
    {
        ApplicationContext context = new ClassPathXmlApplicationContext("nodomain\\singeltonViaDI\\applicationContext.xml");
        SingletonClient singletonClient = (SingletonClient) context.getBean("singletonClient");
        singletonClient.singleton.print();
    }
}
