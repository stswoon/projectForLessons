package nodomain.stswoon.patterns.internet.factory;

public class ShapeFactory {
    enum Type {SQUARE, RECTANGLE, CIRCLE}

    public Shape getShape(String shape) {
        Type type = Type.valueOf(shape);
        switch (type) {
            case SQUARE:
                return new Square();
            case RECTANGLE:
                return new Rectangle();
            case CIRCLE:
                return new Circle();
        }
        throw new IllegalStateException();
    }
}
