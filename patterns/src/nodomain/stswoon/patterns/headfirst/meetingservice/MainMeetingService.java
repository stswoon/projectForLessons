package nodomain.stswoon.patterns.headfirst.meetingservice;

import nodomain.stswoon.patterns.headfirst.meetingservice.db.MeetingServiceDB;
import nodomain.stswoon.patterns.headfirst.meetingservice.person.PersonBean;
import nodomain.stswoon.patterns.headfirst.meetingservice.person.PersonProxyFactory;

import java.lang.reflect.UndeclaredThrowableException;

public class MainMeetingService {
    private static MeetingServiceDB meetingServiceDB;

    public static void main(String[] args) {
        meetingServiceDB = new MeetingServiceDB();
        meetingServiceDB.initDB();
        test();
    }

    private static void test() {
        PersonBean joe = meetingServiceDB.getPersonFromDB("Joe Javabean");

        PersonBean ownerProxy = PersonProxyFactory.getOwnerProxy(joe);
        System.out.println("Name: " + ownerProxy.getName());
        ownerProxy.setInterests("bowling, Go");
        System.out.println("Interests set successfully");
        try {
            ownerProxy.setRating(10);
        } catch (Exception e) {
            if (e instanceof UndeclaredThrowableException) {
                e = (Exception) ((UndeclaredThrowableException) e).getUndeclaredThrowable();
            }
            System.out.println(e.getLocalizedMessage());
        }
        System.out.println("Rating: " + ownerProxy.getRating());

        PersonBean nonOwnerProxy = PersonProxyFactory.getNonOwnerProxy(joe);
        System.out.println("Name: " + nonOwnerProxy.getName());
        try {
            nonOwnerProxy.setInterests("bowling, Go");
        } catch (Exception e) {
            if (e instanceof UndeclaredThrowableException) {
                e = (Exception) ((UndeclaredThrowableException) e).getUndeclaredThrowable();
            }
            System.out.println(e.getLocalizedMessage());
        }
        nonOwnerProxy.setRating(3);
        System.out.println("Rating set successfully");
        System.out.println("Rating: " + nonOwnerProxy.getRating());
    }
}
