package gwt.client.gin;

import javax.inject.Inject;

public class ComputerImpl implements Computer {
    private final HardDisk hardDisk;

    @Inject
    ComputerImpl(HardDisk hardDisk) {
        this.hardDisk = hardDisk;
    }


    @Override
    public String getHardDiskName() {
        return hardDisk.getName();
    }
}
