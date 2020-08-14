import React from 'react';


function MobileDrawer({isOpen, onClose, children}) {

    const visibleClass = isOpen ? " visible" : "";

    return (
        <div className={"mobile-drawer" + visibleClass}>
            <div className="mobile-drawer-backdrop" onClick={onClose}></div>

            <div className="mobile-drawer-box">
                {children}
            </div>
        </div>
    );
}


export default MobileDrawer;
