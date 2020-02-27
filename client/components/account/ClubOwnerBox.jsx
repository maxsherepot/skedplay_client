import React from "react";
import {useTranslation} from "react-i18next";

const PrivateBox = ({ user }) => {
    const {t, i18n} = useTranslation();

    return (
        <div>
            {t('layout.you_have')} {user.clubs && user.clubs.length || 0} {t('layout.clubs')}.
        </div>
    );
}

export default PrivateBox;
