import { ReactNode } from "react";
import "./card.scss";

export function Card({children}: {children: ReactNode}) {
    return <div className="card">
        {children}
    </div>
};

export function ErrorCard({children}: {children: ReactNode}) {
    return <div className="card special-card error-card">
        {children}
    </div>
};

export function PrimaryCard({children}: {children: ReactNode}) {
    return <div className="card special-card primary-card">
        {children}
    </div>
};