import React, {useState} from 'react';
import Link from 'components/SlashedLink'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LocalBar from '@material-ui/icons/LocalBar';
import Event from '@material-ui/icons/Event';
import Favorite from '@material-ui/icons/Favorite';
import Whatshot from '@material-ui/icons/Whatshot';
import { Lang, MobileDrawer, Button } from "UI";
import {useTranslation} from "react-i18next";

const itemList = [
    {name: "common.girls", icon: <Favorite/>, link: "/girls"},
    //{name: "common.trans", link: "/trans"},
    {name: "common.clubs", icon: <LocalBar/>, link: "/clubs"},
    {name: "common.events", icon: <Event/>, link: "/events"},
    {name: "common.vip", icon: <Whatshot style={{color: "#ff3395"}}/>, link: "/vip-escort"}
];


function MobileDrawerCategory({user, isOpen, onClose}) {
    const { t, i18n } = useTranslation();
    const [isGirlsMenuOpen, setIsGirlsMenuOpen] = useState(null);

    const pathname = (global && global.location && global.location.pathname) || ""
    return (
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
            <div className="mobile-drawer-category">
                <DialogTitle>{t("common.category")}</DialogTitle>
                <Divider/>
                <List>
                    {itemList.map((item, index) => {
                        const selected = pathname.includes(item.link)
                        if (item.name === "common.girls") {
                            return (
                                <ListItem button selected={selected} onClick={(e) => setIsGirlsMenuOpen(e.currentTarget)}>
                                    <ListItemIcon className="">{item.icon}</ListItemIcon>
                                    <ListItemText className="uppercase" primary={t(item.name)} />
                                </ListItem>
                            )
                        }
                        return (
                            <Link key={index} href={item.link}>
                                <ListItem button selected={selected} onClick={onClose}>
                                    <ListItemIcon className="">{item.icon}</ListItemIcon>
                                    <ListItemText className="uppercase" primary={t(item.name)} />
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </div>
            <Menu
              id="girls-menu"
              anchorEl={isGirlsMenuOpen}
              keepMounted
              open={Boolean(isGirlsMenuOpen)}
              onClose={() => setIsGirlsMenuOpen(null)}
            >
                <Link href={"/girls"}>
                    <MenuItem className="uppercase mr-6" onClick={() => {setIsGirlsMenuOpen(null); onClose()}}>
                        <span style={{minWidth: 150}}>{t("common.girls")}</span>
                    </MenuItem>
                </Link>
                <Link href={"/trans"}>
                    <MenuItem className="uppercase mr-6" onClick={() => {setIsGirlsMenuOpen(null); onClose()}}>
                        <span style={{minWidth: 150}}>{t("common.trans")}</span>
                    </MenuItem>
                </Link>
            </Menu>

        </MobileDrawer>
    );
}


export default MobileDrawerCategory;
