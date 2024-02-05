"use client"

import "./code.scss";
import "./style.scss";
import "./math.css";
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import {Card, InfoCard, ErrorCard} from "@components/card/card"
import Details from "@components/details"
import GeoGebra from "@components/geogebra/geogebra"
import Image, { ImageProps } from "next/image";
import Link from "next/link";

export default function Post({code}) {

    const Component = useMemo(() => getMDXComponent(code), [code]);

    return <div id="post" style={{position: "relative"}}><Component components={{
        Card, InfoCard, ErrorCard,
        GeoGebra, Details,
        img: (props) => (
            <Image
                style={{maxWidth: "100%", height: "auto"}}
                {...(props as ImageProps)}
            />
        ),
        a: (props) => {
            const absolute = props.href.startsWith("http://") || props.href.startsWith("https://");
            if (absolute) {
                return <a {...props} target={absolute ? "_blank" : ""}></a>
            } else {
                return <Link href={props.href}>{props.children}</Link>
            }
        }
    }} /></div>;

}