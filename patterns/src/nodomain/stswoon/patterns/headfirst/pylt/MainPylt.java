package nodomain.stswoon.patterns.headfirst.pylt;

import nodomain.stswoon.patterns.headfirst.pylt.commands.*;
import nodomain.stswoon.patterns.headfirst.pylt.objects.Fan;
import nodomain.stswoon.patterns.headfirst.pylt.objects.GarageDoor;
import nodomain.stswoon.patterns.headfirst.pylt.objects.Light;

public class MainPylt {
    public static void main(String[] args) {
        Light livingRoomlight = new Light("Living Room");
        Light kitchenRoomlight = new Light("Kitchen Room");
        GarageDoor garageDoor = new GarageDoor();
        Fan fan = new Fan();

        SimpleRemoteControl remote = new SimpleRemoteControl();
        remote.setCommand(0, new LightOnCommand(livingRoomlight), new LightOffCommand(livingRoomlight));
        remote.setCommand(1, new LightOnCommand(kitchenRoomlight), new LightOffCommand(kitchenRoomlight));
        remote.setCommand(2, new GarageDoorUpCommand(garageDoor), new GarageDoorDownCommand(garageDoor));
        remote.setCommand(3, new FanSpeed5Command(fan), new FanOffCommand(fan));

        for (int i = 0; i <= 4; ++i) {
            remote.onButtonWasPressed(i);
            remote.undoButtonWasPressed();
            remote.offButtonWasPressed(i);
            remote.undoButtonWasPressed();
        }

        MacroCommand partyOn = new MacroCommand(new Command[]{new LightOnCommand(livingRoomlight), new LightOnCommand(kitchenRoomlight), new FanSpeed5Command(fan)});
        MacroCommand partyOff = new MacroCommand(new Command[]{new LightOffCommand(livingRoomlight), new LightOffCommand(kitchenRoomlight), new FanOffCommand(fan)});
        remote.setCommand(6, partyOn, partyOff);
        remote.onButtonWasPressed(6);
        remote.undoButtonWasPressed();
        remote.offButtonWasPressed(6);
        remote.undoButtonWasPressed();
    }
}
