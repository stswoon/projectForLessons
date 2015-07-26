package nodomain.stswoon.ideafeatures.text;

public class Editing {
    /**
     * Test square selection - press Alt+Shift+Insert and change 1 2 3 -> 2 3 4
     * text 1 2 3 zzz
     * text 1 2 3 www
     * text 1 2 3 qqq
     */
    private void multipleCursors() {
        int z = 0;
        //press Alt+Shift+mouse click and change z -> 2*z
        int x = z + 1;
        int y = x + z + 1;
    }
}
