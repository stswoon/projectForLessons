package nodomain.stswoon.effectivejava.builder.test;

import nodomain.stswoon.effectivejava.builder.User;

class MainBuilder {
    public static void main(String[] args) {
        User user = (new User.Builder("test-user")).setSex(User.Sex.FEMALE).build();
        System.out.println(user.toString());
        User user2 = (new ExtendedUser.Builder("test-user")).setSex(User.Sex.FEMALE).build();
        System.out.println(user2.toString());
    }
}
