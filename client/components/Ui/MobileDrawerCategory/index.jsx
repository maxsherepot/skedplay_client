import React from 'react';
import Link from 'components/SlashedLink'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Lang, MobileDrawer, Button } from "UI";
import {useTranslation} from "react-i18next";

const itemList = [
    {name: "common.girls", link: "/girls"},
    {name: "common.trans", link: "/trans"},
    {name: "common.clubs", link: "/clubs"},
    {name: "common.events", link: "/events"},
    {name: "common.vip", link: "/vip-escort"}
];


function MobileDrawerCategory({user, isOpen, onClose}) {
    const { t, i18n } = useTranslation();

    return (
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
            <div className="mobile-drawer-category">
                <DialogTitle>{t("common.category")}</DialogTitle>
                <Divider/>
                <List>
                    {itemList.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <ListItem button onClick={onClose}>
                                <ListItemText className="uppercase" primary={t(item.name)} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        </MobileDrawer>
    );
}


export default MobileDrawerCategory;
