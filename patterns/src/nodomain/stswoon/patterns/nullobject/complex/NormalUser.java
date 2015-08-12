package nodomain.stswoon.patterns.nullobject.complex;

public class NormalUser implements User {
    final String name;
    final boolean hasAdminRights;

    public NormalUser(String name, boolean hasAdminRights) {
        this.name = name;
        this.hasAdminRights = hasAdminRights;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public boolean isAdmin() {
        return hasAdminRights;
    }
}
