import { memo, useEffect, useRef, useState } from "react";
import "./geogebra.scss";

function loadScript(id: string) {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.crossOrigin = "";
        script.id = `geogebra-script-${id}`;
        script.src = "/GeoGebra/deployggb.js";
        let ready = false;
        script.onload = () => {
            if (!ready) {
                ready = true;
                resolve();
            }
        }
        script.onerror = (msg) => {
            reject(new Error('Error loading script.'));
        };

        script.onabort = (msg) => {
            reject(new Error('Script loading aborted.'));
        };

        const tag = document.getElementsByTagName('script')[0];
        tag.parentNode.insertBefore(script, tag);
    })
}


function removeScript(id: string) {
    const script = document.getElementById(`geogebra-script-${id}`);
    if (script) {
        script.remove();
    }
};

export default memo(function GeoGebra({ src, id = "ggb-element" }: { src: string, id: string }) {
    const geoRef = useRef();
    const [deployggbLoaded, setDeployggbLoaded] = useState(false);

    const params = {
        "appName": "graphing",
        filename: `/GeoGebra/applets/${src}.ggb`,
        allowStyleBar: false,
        showResetIcon: true,
        useBrowserForJS: false,
        playButton: false,
        showFullScreenButton: true,
        width: 500,
        height: 300,
        editorBackgroundColor: "#000000"
    }
    useEffect(() => {
        // @ts-ignore
        if (!deployggbLoaded && !window.GGBApplet) {
            loadScript(id).then(() => {
                setDeployggbLoaded(true);
            })
        }
        return () => {
            removeScript(id);
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (deployggbLoaded && window.GGBApplet) {
            // @ts-ignore
            const applet = new GGBApplet(params, true);
            applet.setHTML5Codebase("/GeoGebra/HTML5/5.0/web3d/")
            applet.inject(id);
        }
    }, [deployggbLoaded]);
    return <div className="geogebra" id={id} ref={geoRef}></div>
})