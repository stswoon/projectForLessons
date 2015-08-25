package nodomain.stswoon.patterns.internet.abstractfactory;

import nodomain.stswoon.patterns.internet.factory.*;

public class ShapeFactoryDelegate extends AbstractFactory {
    @Override
    Color getColor(String color) {
        return null;
    }

    final ShapeFactory shapeFactory = new ShapeFactory();

    @Override
    Shape getShape(String shape) {
        return shapeFactory.getShape(shape);
    }
}
