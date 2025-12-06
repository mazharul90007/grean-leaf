const pick = (obj, keys) => {
    // console.log(obj, keys);
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
export default pick;
//# sourceMappingURL=pick.js.map