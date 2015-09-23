package nodomain.stswoon.patterns.headfirst.diskicon;

public class IconProxy implements Icon {
    private RealIcon realIcon;
    boolean loading = false;

    @Override
    public int getW() {
        return (realIcon == null) ? 800 : realIcon.getW();
    }

    @Override
    public int getH() {
        return (realIcon == null) ? 600 : realIcon.getH();
    }

    @Override
    public void paint() {
        if (realIcon != null) {
            realIcon.paint();
        } else {
            System.out.println("IconProxy: loading...");
            System.out.println("Icon size = " + getW() + "x" + getH());
            if (!loading) {
                loading = true;
                Thread loadingThread = new Thread(new Runnable() {
                    @Override
                    public void run() {
                        realIcon = new RealIcon(400, 300, "My CD");
                        realIcon.paint();
                        System.out.println("Icon size = " + getW() + "x" + getH());
                    }
                });
                loadingThread.start();
            }

        }
    }
}
