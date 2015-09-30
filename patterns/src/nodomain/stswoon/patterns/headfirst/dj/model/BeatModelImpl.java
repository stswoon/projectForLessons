package nodomain.stswoon.patterns.headfirst.dj.model;

import nodomain.stswoon.patterns.headfirst.dj.view.BeatObserver;
import nodomain.stswoon.patterns.headfirst.dj.view.BmpObserver;

import javax.sound.midi.*;
import java.util.ArrayList;
import java.util.List;

public class BeatModelImpl implements BeatModel, MetaEventListener {
    List<BeatObserver> beatObservers = new ArrayList<>();
    List<BmpObserver> bmpObservers = new ArrayList<>();
    int bmp = 90;

    Sequencer sequencer;
    Track track;
    private Sequence sequence;

    @Override
    public void initialize() {
        setUpMidi();
        buildTrackAndStart();
    }

    private void buildTrackAndStart() {
        int[] trackList = {35, 0, 46, 0};

        sequence.deleteTrack(null);
        track = sequence.createTrack();

        makeTracks(trackList);
        track.add(makeEvent(192, 9, 1, 0, 4));

        try {
            sequencer.setSequence(sequence);
        } catch (InvalidMidiDataException e) {
            e.printStackTrace();
        }
    }

    private void makeTracks(int[] list) {
        for (int i = 0; i < list.length; i++) {
            int key = list[i];
            if (key != 0) {
                track.add(makeEvent(144,9,key,100,i));
                track.add(makeEvent(128,9,key,100,i+1));
            }
        }
    }

    private MidiEvent makeEvent(int comd, int chan, int one, int two, int tick) {
        MidiEvent event = null;
        try {
            ShortMessage a = new ShortMessage();
            a.setMessage(comd, chan, one, two);
            event = new MidiEvent(a, tick);
        } catch (InvalidMidiDataException e) {
            e.printStackTrace();
        }
        return event;
    }

    private void setUpMidi() {
        try {
            sequencer = MidiSystem.getSequencer();
            sequencer.open();
            sequencer.addMetaEventListener(this);
            sequence = new Sequence(Sequence.PPQ, 4);
            track = sequence.createTrack();
            sequencer.setTempoInBPM(getBmp());
        } catch (MidiUnavailableException e) {
            e.printStackTrace();
        } catch (InvalidMidiDataException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void on() {
        sequencer.start();
        setBpm(90);
    }

    @Override
    public void off() {
        setBpm(0);
        sequencer.stop();
    }

    @Override
    public void setBpm(int bpm) {
        this.bmp = bpm;
        sequencer.setTempoInBPM(getBmp());
        notifyBmpObservers();
    }

    @Override
    public int getBmp() {
        return bmp;
    }

    void beatEvent() {
        notifyBeatObservers();
    }

    private void notifyBeatObservers() {
        for (BeatObserver beatObserver : beatObservers) {
            beatObserver.updateBeat();
        }
    }

    private void notifyBmpObservers() {
        for (BmpObserver bmpObserver : bmpObservers) {
            bmpObserver.updateBmp();
        }
    }

    public void meta(MetaMessage metaMessage) {
        if (metaMessage.getType() == 47) {
            beatEvent();
            sequencer.start();
            setBpm(getBmp());
        }
    }

    @Override
    public void registerObserver(BeatObserver beatObserver) {
        beatObservers.add(beatObserver);
    }

    @Override
    public void removeObserver(BeatObserver beatObserver) {
        beatObservers.remove(beatObserver);
    }

    @Override
    public void registerObserver(BmpObserver bmpObserver) {
        bmpObservers.add(bmpObserver);
    }

    @Override
    public void removeObserver(BmpObserver bmpObserver) {
        bmpObservers.remove(bmpObserver);
    }
}
