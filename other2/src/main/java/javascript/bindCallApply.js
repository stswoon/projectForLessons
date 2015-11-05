var context = {
    foo: "bar"
};

function returnFoo() {
    return this.foo;
}
console.log(returnFoo());

var bound = returnFoo.bind(context);
console.log(bound());
console.log(returnFoo.call(context));
console.log(returnFoo.apply(context));

context.returnFoo = returnFoo;
console.log(context.returnFoo());