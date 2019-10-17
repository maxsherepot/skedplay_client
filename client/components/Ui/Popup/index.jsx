import React from "react";
import Popup from "reactjs-popup";
import Content from "./Content";

const contentStyle = {
    background: "transparent",
    width: 300,
    padding: 0,
    border: "none",
};

export default ({ trigger, title, children }) => (
    <Popup modal trigger={trigger} contentStyle={contentStyle}>
        {close => <Content title={title} close={close}>{children}</Content>}
    </Popup>
)