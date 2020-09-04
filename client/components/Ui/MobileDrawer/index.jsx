import React from 'react';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";


function MobileDrawer({isOpen, onClose, onOpen, children}) {

    return (
        <SwipeableDrawer open={isOpen}
                         onOpen={() => onOpen && onOpen()}
                         onClose={onClose}>
            {children}
        </SwipeableDrawer>
    )
}






function MobileDrawerCustom({isOpen, onClose, children}) {

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
