"use client"

import "./code.scss";
import "./style.scss";
import "./math.css";
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import {Card, InfoCard, ErrorCard} from "@components/card/card"
import Image, { ImageProps } from "next/image";

export default function Post({code}) {

    const Component = useMemo(() => getMDXComponent(code), [code]);

    return <div id="post"><Component components={{
        Card, InfoCard, ErrorCard,
        img: (props) => (
            <Image
                width={800}
                height={500}
                style={{width: "100%", height: "auto"}}
                {...(props as ImageProps)}
            />
        ),
        a: (props) => (
            <a {...props} target="_blank"></a>
        )
    }} /></div>;

}