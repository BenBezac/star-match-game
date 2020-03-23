import React from 'react';
import MathUtils from "../utils/MathUtils";

function StarsDisplay({count}) {
    return (
        <>
            { MathUtils.range(1, count).map(starId =>
                <div key={starId} className="star" />
            ) }
        </>
    );
}

export default StarsDisplay;
