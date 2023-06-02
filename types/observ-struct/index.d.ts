// Type definitions for observ-struct 6.0
// Project: https://github.com/Raynos/observ-struct
// Definitions by: Ben O'Sullivan <https://github.com/beno-coviu>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { ObservableValue } from 'observ';

type DeepResolveStruct<T extends Record<string, any>> = {
    [key in keyof T]: T[key] extends ObservableValue<infer U>
        ? U extends Record<string, any>
            ? DeepResolveStruct<U>
            : U
        : T[key] extends Record<string, any>
        ? DeepResolveStruct<T[key]>
        : T[key];
};

declare namespace ObservStruct {
    type StructObservable<T extends Record<string, any>> = T & ObservableValue<DeepResolveStruct<T>>;
}

declare function ObservStruct<T extends Record<string, any>>(struct: T): ObservStruct.StructObservable<T>;

export = ObservStruct;
