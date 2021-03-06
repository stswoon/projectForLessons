package nodomain.stswoon.patterns.internet.nullobject.complex;

class MainComplexNullObject {
    public static void main(String[] args) {
        for (UserFactory.Type type : UserFactory.Type.values()) {
            System.out.println(UserFactory.getUser(type).getName());
        }
    }
}
