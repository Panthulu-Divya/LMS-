"use client"

import { BarChart, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: '/'
    },
    {
        icon: Compass,
        label: "Browse",
        href: '/search'
    },
];

const creatorRoutes = [
    {
        icon: List,
        label: "Courses",
        href: '/creator/courses'
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: '/creator/analytics'
    }, 
]


export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isCreatorPage = pathname?.includes('/creator');

    const routes = isCreatorPage ? creatorRoutes : guestRoutes;

    return(
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href} />
            ))}
        </div>
    )
}