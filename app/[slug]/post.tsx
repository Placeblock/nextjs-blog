"use client"

import "./style.scss";
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

export default function Post({code}) {

    const Component = useMemo(() => getMDXComponent(code), [code]);

    return <Component />;

}