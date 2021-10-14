module.exports = function (Homework) {

    function promisify(fn) {
        return function (...args) {
            return new Promise((resolve) => {
                fn(...args, (data) => resolve(data))
            });
        };
    }

    return async (array, fn, initialValue, cb) => {
        const fnAsync = promisify(fn);

        const getArraySizeAsync = promisify(array.length);
        const getArrayElAsync = promisify(array.get);
        const addArrayElAsync = promisify(Homework.add);
        const isLessArrayElAsync = promisify(Homework.less);

        const arrayLength = await getArraySizeAsync();

        let i = 0;
        let acc = initialValue;

        while (await isLessArrayElAsync(i, arrayLength)) {
            let el = await getArrayElAsync(i);
            acc = await fnAsync(acc, el, i, array);
            i = await addArrayElAsync(i, 1);
        }

        return cb(acc);
    }
};
