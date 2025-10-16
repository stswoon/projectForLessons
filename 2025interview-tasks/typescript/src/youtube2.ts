//https://www.youtube.com/watch?v=lAfbu1Hm5mI


// Задача If: https://clck.ru/3JYnpG
//     Задача Push: https://clck.ru/3JVMCU
//     Задача Concat: https://clck.ru/3JVMNo
//     Задача Unshift: https://clck.ru/3JVMPe
//     Задача Length of Tuple: https://clck.ru/3JVMPu
//     Задача First of Array: https://clck.ru/3JVMQD
//     Задача Readonly: https://clck.ru/3JVMR2
//     Задача Pick: https://clck.ru/3JVMRN
//     Задача Tuple to Object: https://clck.ru/3JVMSL
//     Задача Exclude: https://clck.ru/3JVMSc
//     Задача Includes: https://clck.ru/3JVMSv
//     Задача Awaited: https://clck.ru/3JVMTV
//     Задача Exclude: https://clck.ru/3JVMTi



type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;