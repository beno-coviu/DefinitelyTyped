import Observable = require('observ');
import Struct = require('observ-struct');

const struct = Struct({
    obj: Struct({
        foo: Observable('bar'),
        baz: 1,
    }),
    barry: Observable(123),
    test: true,
});

const resolvedStruct = struct();
const { obj, barry, test } = resolvedStruct;
const { foo, baz } = obj;

type ExpandRecursively<T> = T extends object
    ? T extends infer O
        ? { [K in keyof O]: ExpandRecursively<O[K]> }
        : never
    : T;

struct.set({
    obj: {
        foo: '',
        baz: 2,
    },
    barry: 5,
    test: false,
});

struct.obj.set({
    foo: 'asdf',
    baz: 0,
});

struct.barry.set(10);
const removeListener = struct(resolved => {
    const { foo: innerFoo, baz: innerBaz } = resolved.obj;
});

removeListener();
