package nodomain.stswoon.patterns.headfirst.bublegum2.machine;

import nodomain.stswoon.patterns.headfirst.bublegum.machine.GumballMachine;
import nodomain.stswoon.patterns.headfirst.bublegum.machine.State;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class GumballMachine2 extends UnicastRemoteObject implements GumballMachineRemote {
    transient private GumballMachine gumballMachine;
    private final String location;

    public GumballMachine2(String location, int gumBallCount) throws RemoteException{
        super();
        gumballMachine = new GumballMachine(gumBallCount);
        this.location = location;
    }

    @Override
    public String toString() {
        return "GumballMachine{" +
                "state=" + gumballMachine.getState() +
                ", gumBallCount=" + gumballMachine.getGumballCount() +
                ", location=" + location +
                '}';
    }

    @Override
    public int getGumballCount() {
        return gumballMachine.getGumballCount();
    }

    @Override
    public String getLocation() {
        return location;
    }

    @Override
    public State getState() {
        return gumballMachine.getState();
    }
}
