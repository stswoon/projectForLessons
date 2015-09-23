package nodomain.stswoon.patterns.headfirst.diskicon;

public class RealIcon implements Icon {
    private final int w;
    private final int h;
    private final String text;

    public RealIcon(int w, int h, String text) {
        this.w = w;
        this.h = h;
        this.text = text;

        //for dev purpose;
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public int getW() {
        return w;
    }

    @Override
    public int getH() {
        return h;
    }

    @Override
    public void paint() {
        System.out.println("RealIcon: " + text);
    }
}
