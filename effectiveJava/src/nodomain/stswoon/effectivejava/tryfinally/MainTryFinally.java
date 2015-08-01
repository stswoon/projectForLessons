package nodomain.stswoon.effectivejava.tryfinally;

class MainTryFinally {
    public static void main(String[] args) {
        try {
            System.out.println("11");
            throw new RuntimeException();
        } catch (RuntimeException e) {
            System.out.println("12");
        } finally {
            System.out.println("13");
        }

        try {
            System.out.println("21");
            //throw new RuntimeException();
        } catch (RuntimeException e) {
            System.out.println("22");
        } finally {
            System.out.println("23");
        }

    }
}
