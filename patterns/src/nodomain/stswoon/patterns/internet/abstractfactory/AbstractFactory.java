package nodomain.stswoon.patterns.internet.abstractfactory;

import nodomain.stswoon.patterns.internet.factory.Shape;

public abstract class AbstractFactory {
    abstract Color getColor(String color);
    abstract Shape getShape(String shape);
}
