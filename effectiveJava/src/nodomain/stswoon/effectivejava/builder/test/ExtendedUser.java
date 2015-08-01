package nodomain.stswoon.effectivejava.builder.test;


import nodomain.stswoon.effectivejava.builder.User;

public class ExtendedUser extends User {
    private String phone;

    public static class ExtendedBuilder extends Builder {
        private String phone;

        public ExtendedBuilder(String name) {
            super(name);
        }

        public ExtendedBuilder setPhone(String phone) {
            this.phone = phone;
            return this;
        }
    }

    private ExtendedUser(ExtendedBuilder builder) {
        super(builder);
        phone = builder.phone;
    }

    @Override
    public String toString() {
        return "ExtendedUser{" +
                "phone='" + phone + '\'' +
                super.toString() +
                '}';
    }
}
