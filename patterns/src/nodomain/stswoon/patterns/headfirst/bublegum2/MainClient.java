package nodomain.stswoon.patterns.headfirst.bublegum2;

import nodomain.stswoon.patterns.headfirst.bublegum2.log.GumballMonitor;
import nodomain.stswoon.patterns.headfirst.bublegum2.machine.GumballMachineRemote;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;

//start MainRemote first
public class MainClient {
    public static void main(String[] args) {
        GumballMachineRemote gumballMachineRemote = null;
        try {
            gumballMachineRemote = (GumballMachineRemote) Naming.lookup("//localhost:2005/gumballmachine");
        } catch (RemoteException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (NotBoundException e) {
            e.printStackTrace();
        }

        if (gumballMachineRemote == null) {
            System.out.println("ERROR");
        } else {
            GumballMonitor gumballMonitor = new GumballMonitor(gumballMachineRemote);
            gumballMonitor.report();
        }
    }
}
