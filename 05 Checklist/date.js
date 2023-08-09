exports.date = function () {
    var date = new Date();
    const options ={
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return date.toLocaleDateString("en-US",options);
};

exports.day = function () {
    var date = new Date();
    const options ={
        weekday: "long",
    };

    return date.toLocaleDateString("en-US",options);
};