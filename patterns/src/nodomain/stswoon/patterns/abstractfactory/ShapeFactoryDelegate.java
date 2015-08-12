package nodomain.stswoon.patterns.abstractfactory;

import nodomain.stswoon.patterns.factory.*;

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
