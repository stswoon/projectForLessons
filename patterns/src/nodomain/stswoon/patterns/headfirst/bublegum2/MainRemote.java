package nodomain.stswoon.patterns.headfirst.bublegum2;

import nodomain.stswoon.patterns.headfirst.bublegum2.machine.GumballMachine2;
import nodomain.stswoon.patterns.headfirst.bublegum2.machine.GumballMachineRemote;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;

public class MainRemote {
    public static void main(String[] args) {
        //http://javatutor.net/books/tiej/rmi
        try {
            LocateRegistry.createRegistry(2005); //or say in cmd "start rmiregistry"
        } catch (RemoteException e) {
            e.printStackTrace();
        }

        try {
            GumballMachineRemote gumballMachineRemote = new GumballMachine2("samara", 5);
            Naming.rebind("//localhost:2005/gumballmachine", gumballMachineRemote);
        } catch (RemoteException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }
}
