import { ReactNode } from "react";
import "./card.scss";

export function Card({children, className}: {children: ReactNode, className?: string}) {
    return <div className={`card ${className}`}>
        {children}
    </div>
};

export function ErrorCard({children, className}: {children: ReactNode, className?: string}) {
    return <div className={`card special-card error-card ${className}`}>
        {children}
    </div>
};

export function InfoCard({children, className}: {children: ReactNode, className?: string}) {
    return <div className={`card special-card info-card ${className}`}>
        {children}
    </div>
};