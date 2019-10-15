import { usePanelState } from "@bumaga/tabs";

export default ({ children }) => {
    const isActive = usePanelState();

    return isActive ? <div className="px-8 py-12">{children}</div> : null;
};
