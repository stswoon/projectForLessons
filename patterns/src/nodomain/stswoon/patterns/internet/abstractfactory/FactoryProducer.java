package nodomain.stswoon.patterns.internet.abstractfactory;

public class FactoryProducer {
    enum Type {SHAPE, COLOR}

    public static AbstractFactory getFactory(String choice){
        Type type = Type.valueOf(choice);
        switch (type) {
            case SHAPE:
                return new ShapeFactoryDelegate();
            case COLOR:
                return new ColorFactory();
        }
        return null;
    }
}
