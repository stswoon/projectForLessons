package nodomain.stswoon.patterns.internet.abstractfactory;

import nodomain.stswoon.patterns.internet.factory.Shape;

public class ColorFactory extends AbstractFactory {
    enum Type {RED, GREEN, BLUE}

    @Override
    Color getColor(String color) {
        Type type = Type.valueOf(color);
        switch (type) {
            case RED:
                return new Red();
            case GREEN:
                return new Green();
            case BLUE:
                return new Blue();
        }
        throw new IllegalStateException();
    }

    @Override
    Shape getShape(String shape) {
        return null;
    }
}
