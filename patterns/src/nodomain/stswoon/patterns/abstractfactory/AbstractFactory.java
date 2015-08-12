package nodomain.stswoon.patterns.abstractfactory;

import nodomain.stswoon.patterns.factory.Shape;

public abstract class AbstractFactory {
    abstract Color getColor(String color);
    abstract Shape getShape(String shape);
}
