import React from 'react';
import ColorEnum from "../utils/ColorEnum";

const NumberButton = ({
        value,
        status,
        onClick
    }) => {
    return (
        <button
            className="number"
            style={{ backgroundColor: ColorEnum[status] }}
            onClick={ () =>onClick(value, status)}
        >
            {value}
        </button>
    );
};

export default NumberButton;
