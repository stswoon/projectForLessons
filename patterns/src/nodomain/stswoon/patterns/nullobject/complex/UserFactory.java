package nodomain.stswoon.patterns.nullobject.complex;

public class UserFactory {
    enum Type {NORMAL, ADMIN, FAKE}

    public static User getUser(Type type) {
        switch (type) {
            case NORMAL:
                return new NormalUser("Tom", false);
            case ADMIN:
                return new NormalUser("Jerry (admin)", true);
            case FAKE:
                return new NullUser();
        }
        return new NullUser();
    }
}
