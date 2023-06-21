const initErrorState = {}

export default (state, { type, payload }) => {
    const regex = /_fail/i;

    if (regex.test(type)) {
        // Action type contains "_FAIL"
        console.log("Action failed!");
    }
}