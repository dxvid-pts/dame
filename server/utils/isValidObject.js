module.exports = (object, props) => {
    return (
        typeof object === "object" &&
        props.every((p) => object.hasOwnProperty(p))
    );
};
