'use client'
import { useSession } from "next-auth/react";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

function Sidebar() {
    const { data: session } = useSession();
    const [showMailComponent, setShowMailComponent] = useState(false);
    const [loadedComponent, setLoadedComponent] = useState<ReactNode | null>(null);

    useEffect(() => {
        if (showMailComponent) {
            // Precargar el componente de la página de contacto
            import("@/app/contact/page").then((module) => {
                setLoadedComponent(module.default);
            });
        } else {
            setLoadedComponent(null);
        }
    }, [showMailComponent]);

    const handleMailClick = () => {
        setShowMailComponent(true);
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {loadedComponent ? (
                    <div className="sidebar-loaded-content">
                        {loadedComponent}
                    </div>
                ) : (
                    <div>Componente por defecto</div>
                )}

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                        {/* Al hacer clic, se mostrará el componente de enviar mail */}
                        <a onClick={handleMailClick}>
                            Enviar Mail
                        </a>
                    </li>
                    <li>
                        {/* Enlaces a otras opciones */}
                        <a>Recibir solicitudes</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
