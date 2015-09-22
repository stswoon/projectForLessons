package nodomain.stswoon.patterns.headfirst.bublegum2.machine;

import nodomain.stswoon.patterns.headfirst.bublegum.machine.State;

import java.rmi.RemoteException;

public interface GumballMachineRemote {
    int getGumballCount() throws RemoteException;
    String getLocation() throws RemoteException;
    State getState() throws RemoteException;
}
