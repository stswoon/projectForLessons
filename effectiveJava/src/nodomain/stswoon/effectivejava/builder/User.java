package nodomain.stswoon.effectivejava.builder;

import java.util.Date;

public class User {
    public enum Sex {
        MALE, FEMALE
    }

    private final String name;
    private Date birthday;
    private Sex sex;
    private String nativeCity;

    public static class Builder<T extends User> {
        private final String name;
        private Date birthday;
        private Sex sex;
        private String nativeCity;

        public Builder(String name) {
            if (name == null) {
                throw new IllegalArgumentException("parameter should not be null");
            }
            this.name = name;
        }

        public Builder setBirthday(Date birthday) {
            if (birthday == null) {
                throw new IllegalArgumentException("parameter should not be null");
            }
            this.birthday = birthday;
            return this;
        }

        public Builder setSex(Sex sex) {
            if (sex == null) {
                throw new IllegalArgumentException("parameter should not be null");
            }
            this.sex = sex;
            return this;
        }

        public Builder setNativeCity(String nativeCity) {
            if (nativeCity == null) {
                throw new IllegalArgumentException("parameter should not be null");
            }
            this.nativeCity = nativeCity;
            return this;
        }
        public T build() {
            return (T) new User(this);
        }
    }

    protected User(Builder builder) {
        name = builder.name;
        birthday = builder.birthday;
        sex = builder.sex;
        nativeCity = builder.nativeCity;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", birthday=" + birthday +
                ", sex=" + sex +
                ", nativeCity='" + nativeCity + '\'' +
                '}';
    }
}
