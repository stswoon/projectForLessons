package nodomain.stswoon.effectivejava.refactoring;

class ExtractMethod {
    private void complexMethod(int y) {
        int x = 0;

        //select two next lines and press Ctrl+Alt+M
        int result = x + y;
        result *= 2;

        System.out.println(result);
    }

//    private void complexMethod() {
//        String text = "test";
//        User user = new User();
//
//        //select next lines and press Ctrl+Alt+M and check bold parameters
//        MessageFactory.send(
//                text,
//                user.getName()
//        );
//    }
//    private static class MessageFactory {
//        static void send(String text, String userName) {
//        }
//    }
//    private class User {
//        public String getName() {
//            return null;
//        }
//    }
}
