package nodomain.stswoon.patterns.headfirst.meetingservice.db;

import nodomain.stswoon.patterns.headfirst.meetingservice.person.PersonBean;
import nodomain.stswoon.patterns.headfirst.meetingservice.person.PersonBeanImpl;

public class MeetingServiceDB {
    public void initDB() {
    }

    public PersonBean getPersonFromDB(String name) {
        PersonBean joe = new PersonBeanImpl();
        joe.setName("Joe Javabean");
        return joe;
    }
}
