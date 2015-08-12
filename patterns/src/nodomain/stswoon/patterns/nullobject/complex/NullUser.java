package nodomain.stswoon.patterns.nullobject.complex;

public class NullUser implements User {

    private static final String NULL_USER = "NullUser";

    @Override
    public String getName() {
        return NULL_USER;
    }

    @Override
    public boolean isAdmin() {
        return false;
    }
}
