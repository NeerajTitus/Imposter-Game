import React from 'react';

function Loader({ message = "Loading..." }) {
    return (
        <div className="loader-overlay">
            <div className="spinner"></div>
            <p style={{ color: '#fff', fontSize: '1.2rem', letterSpacing: '1px' }}>{message}</p>
        </div>
    );
}

export default Loader;
