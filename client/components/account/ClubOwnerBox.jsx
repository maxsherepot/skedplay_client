import React from "react";

const PrivateBox = ({ user }) => (
    <div>
        You have {user.clubs && user.clubs.length || 0} clubs.
    </div>
);

export default PrivateBox;
