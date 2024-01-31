"use client"

import "./code.scss";
import "./style.scss";
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import {Card, PrimaryCard, ErrorCard} from "@components/card/card"

export default function Post({code}) {

    const Component = useMemo(() => getMDXComponent(code), [code]);

    return <div id="post"><Component components={{Card, PrimaryCard, ErrorCard}} /></div>;

}