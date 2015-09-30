package nodomain.stswoon.patterns.headfirst.dj.view;

import nodomain.stswoon.patterns.headfirst.dj.controller.Controller;
import nodomain.stswoon.patterns.headfirst.dj.model.BeatModel;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class DjView implements ActionListener, BeatObserver, BmpObserver {
    BeatModel model;
    Controller controller;

    JFrame viewFramel;
    JPanel viewPanel;
    JProgressBar beatBar;
    JLabel bmpOutputLabel;
    JFrame controlFrame;
    JPanel controlPanel;
    JLabel bmpLabel;
    JTextField bmpTextField;
    JButton setBmpButton;
    JButton increaseBmpButton;
    JButton decreaseBmpButton;

    JMenuBar menuBar;
    JMenu menu;
    JMenuItem startMenuItem;
    JMenuItem stopMenuItem;

    public DjView(Controller controller, BeatModel model) {
        this.model = model;
        this.controller = controller;
        model.registerObserver((BeatObserver)this);
        model.registerObserver((BmpObserver)this);
    }

    public void createView() {
        viewPanel = new JPanel(new GridLayout(1,2));
        viewFramel = new JFrame("View");
        viewFramel.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        viewFramel.setSize(new Dimension(100, 80));
        bmpOutputLabel = new JLabel("offline", SwingConstants.CENTER);
        beatBar = new JProgressBar();
        beatBar.setValue(0);
        JPanel bmpPanel = new JPanel(new GridLayout(2,1));
        bmpPanel.add(beatBar);
        bmpPanel.add(bmpOutputLabel);
        viewPanel.add(bmpPanel);
        viewFramel.getContentPane().add(viewPanel, BorderLayout.CENTER);
        viewFramel.pack();
        viewFramel.setVisible(true);
    }

    public void createControls() {
        JFrame.setDefaultLookAndFeelDecorated(true);
        controlFrame = new JFrame("Control");
        controlFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        controlFrame.setSize(new Dimension(100, 80));
        controlPanel = new JPanel(new GridLayout(1,2));

        menuBar = new JMenuBar();
        menu = new JMenu("DJ Control");
        startMenuItem = new JMenuItem("Start");
        menu.add(startMenuItem);
        startMenuItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                controller.start();
            }
        });
        stopMenuItem = new JMenuItem("Stop");
        menu.add(stopMenuItem);
        stopMenuItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                controller.stop();
            }
        });
        JMenuItem exit = new JMenuItem("Quit");
        exit.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
        menu.add(exit);
        menuBar.add(menu);
        controlFrame.setJMenuBar(menuBar);

        bmpTextField = new JTextField(2);
        bmpLabel = new JLabel("Enter BPM:", SwingConstants.RIGHT);
        setBmpButton = new JButton("Set");
        setBmpButton.setSize(new Dimension(10,40));
        increaseBmpButton = new JButton(">>");
        decreaseBmpButton = new JButton("<<");
        setBmpButton.addActionListener(this);
        increaseBmpButton.addActionListener(this);
        decreaseBmpButton.addActionListener(this);

        JPanel buttonPanel = new JPanel(new GridLayout(1,2));

        buttonPanel.add(decreaseBmpButton);
        buttonPanel.add(increaseBmpButton);

        JPanel enterPanel = new JPanel(new GridLayout(1,2));
        enterPanel.add(bmpLabel);
        enterPanel.add(bmpTextField);
        JPanel insideControlPanel = new JPanel(new GridLayout(3,1));
        insideControlPanel.add(enterPanel);
        insideControlPanel.add(setBmpButton);
        insideControlPanel.add(buttonPanel);
        controlPanel.add(insideControlPanel);

        bmpLabel.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));
        bmpOutputLabel.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));

        controlFrame.getRootPane().setDefaultButton(setBmpButton);
        controlFrame.getContentPane().add(controlPanel, BorderLayout.CENTER);

        controlFrame.pack();
        controlFrame.setVisible(true);
    }

    public void updateBMP() {
        int bmp = model.getBmp();
        if (bmp == 0) {
            bmpOutputLabel.setText("offline");
        } else {
            bmpOutputLabel.setText("Current BPM: " + model.getBmp());
        }
    }

    public void updateBeat() {
        beatBar.setValue(100);
    }

    public void enableStopMenuItem() {
        stopMenuItem.setEnabled(true);
    }

    public void disableStopMenuItem() {
        stopMenuItem.setEnabled(false);
    }

    public void enableStartMenuItem() {
        startMenuItem.setEnabled(true);
    }

    public void disableStartMenuItem() {
        startMenuItem.setEnabled(false);
    }

    public void actionPerformed(ActionEvent event) {
        if (event.getSource() == setBmpButton) {
            int bmp = Integer.parseInt(bmpTextField.getText());
            controller.setBmp(bmp);
        } else if (event.getSource() == increaseBmpButton) {
            controller.increaseBmp();
        } else if (event.getSource() == decreaseBmpButton) {
            controller.decreaseBmp();
        }
    }

    @Override
    public void updateBmp() {
        int bpm = model.getBmp();
        if (bpm == 0) {
            bmpOutputLabel.setText("offline");
        } else {
            bmpOutputLabel.setText("Current BPM: " + bpm);
        }
    }
}
