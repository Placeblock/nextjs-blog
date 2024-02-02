import { memo, useEffect, useRef } from "react";
import "./geogebra.scss";

export default memo(function GeoGebra({src, id="ggb-element"}: {src: string, id: string}) {
    const geoRef = useRef();
    const params = {
        "appName": "graphing",
        "material_id": src,
        "scaleContainerClass": "geogebra-container",
        "showFullscreenButton": true,
        "showZoomButtons": true,
        "showToolBar": false,
        "scale": 1
    }
    useEffect(() => {
        // @ts-ignore
        const applet = new GGBApplet(params, true);
        applet.inject(id);
    }, []);
    return <div className="geogebra-container">
        <div className="geogebra" id={id} ref={geoRef}></div>
    </div>
})