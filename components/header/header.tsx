import { memo } from "react";
import Logo from "../logo/logo";
import "./header.scss";
import Link from "next/link";

export default memo(function Header() {
    return <div id="header">
        <Link href={"https://codelix.de"} about=""><Logo /></Link>
        <span className="header-line"></span>
        <Link href={"/"} about="" style={{color: "white"}}><h1>Blog</h1></Link>
        <span className="header-line"></span>
        <h1 id="header-heart">♥</h1>
    </div>
})