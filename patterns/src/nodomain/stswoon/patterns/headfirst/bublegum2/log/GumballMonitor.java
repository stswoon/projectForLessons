package nodomain.stswoon.patterns.headfirst.bublegum2.log;

import nodomain.stswoon.patterns.headfirst.bublegum2.machine.GumballMachineRemote;

import java.rmi.RemoteException;

public class GumballMonitor {
    GumballMachineRemote gumballMachineRemote;

    public GumballMonitor(GumballMachineRemote gumballMachineRemote) {
        this.gumballMachineRemote = gumballMachineRemote;
    }

    public void report() {
        try {
            System.out.println(gumballMachineRemote.getLocation() + " " + gumballMachineRemote.getGumballCount() + " " +
                    gumballMachineRemote.getState().toString());
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }
}
