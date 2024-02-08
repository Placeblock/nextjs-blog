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

export default memo(function GeoGebra({ src, id = "ggb-element", type="graphing" }: { src: string, id: string, type:string }) {
    const geoRef = useRef();
    const [deployggbLoaded, setDeployggbLoaded] = useState(false);

    const params = {
        "appName": type,
        filename: `/GeoGebra/applets/${src}.ggb`,
        allowStyleBar: false,
        showResetIcon: true,
        useBrowserForJS: false,
        playButton: false,
        showFullScreenButton: true,
        width: 500,
        height: 300,
        //borderColor: "#000000",
        appletOnLoad: (_) => {}
    }
    useEffect(() => {
        if (!deployggbLoaded) {
        	// @ts-ignore
			if (!window.GGBApplet) {
            	loadScript(id).then(() => {
                	setDeployggbLoaded(true);
            	})	
			} else {
				setDeployggbLoaded(true);
			}
        }
        return () => {
            removeScript(id);
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (deployggbLoaded && window.GGBApplet) {
            params.appletOnLoad = (api) => {
                //api.evalCommand('SetBackgroundColor("#030303")')
            }
            // @ts-ignore
            const applet = new GGBApplet(params, true);
            applet.setHTML5Codebase("/GeoGebra/HTML5/5.0/web3d/")
            applet.inject(id);
        }
    }, [deployggbLoaded]);
    return <div className="geogebra" id={id} ref={geoRef}></div>
})
