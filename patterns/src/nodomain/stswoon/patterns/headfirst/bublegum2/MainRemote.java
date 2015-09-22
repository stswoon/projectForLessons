package nodomain.stswoon.patterns.headfirst.bublegum2;

import nodomain.stswoon.patterns.headfirst.bublegum2.machine.GumballMachine2;
import nodomain.stswoon.patterns.headfirst.bublegum2.machine.GumballMachineRemote;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.Remote;
import java.rmi.RemoteException;

public class MainRemote {
    public static void main(String[] args) {
        try {
            GumballMachineRemote gumballMachineRemote = new GumballMachine2("samara", 5);
            Naming.rebind("//127.0.0.1/gumballmachine", (Remote) gumballMachineRemote);
        } catch (RemoteException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }
}
