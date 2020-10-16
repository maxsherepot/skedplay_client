import React from "react";

import {AnimationBackground, Modal, Logo, ArrowBack, LangSelector} from "UI";
import {ForgotBox} from "components/forgot";
import {useTranslation} from "react-i18next";

function Forgot() {

    const {t, i18n} = useTranslation();

    return (
        <>
            <AnimationBackground/>
            <Modal
                logo={<Logo/>}
                title={t('forgot.password_recovery')}
                left={<ArrowBack href="/login"/>}
                right={<LangSelector/>}
            >
                <ForgotBox/>
            </Modal>
        </>
    );
}

Forgot.getLayout = page => page;

export default Forgot;
