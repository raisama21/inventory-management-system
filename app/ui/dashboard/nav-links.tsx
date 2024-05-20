"use client";

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    ShoppingBagIcon,
    Squares2X2Icon,
    SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    {
        name: "Products",
        href: "/dashboard/products",
        icon: ShoppingBagIcon,
        subLinks: [
            {
                name: "Categories",
                href: "/dashboard/products/categories",
                icon: Squares2X2Icon,
            },
            {
                name: "Add Categories",
                href: "/dashboard/products/categories/add",
                icon: SquaresPlusIcon,
            },
        ],
    },
    {
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: DocumentDuplicateIcon,
    },
    { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    const [showSubLink, setShowSubLink] = useState("");

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;

                return (
                    <div key={link.name}>
                        <Link
                            href={link.href}
                            onClick={() => setShowSubLink(link.name)}
                            className={clsx(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    "bg-blue-100 text-blue-600":
                                        pathname === link.href,
                                }
                            )}
                        >
                            <LinkIcon className="w-6" />
                            <p className="hidden md:block">{link.name}</p>
                        </Link>

                        {showSubLink === link.name && (
                            <div>
                                {link.subLinks?.map((subLink) => {
                                    const SubLinkIcon = subLink.icon;

                                    return (
                                        <Link
                                            key={subLink.name}
                                            href={subLink.href}
                                            className={clsx(
                                                "mb-2 ml-4 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                                {
                                                    "bg-blue-100 text-blue-600":
                                                        pathname ===
                                                        subLink.href,
                                                }
                                            )}
                                        >
                                            <SubLinkIcon className="w-6" />
                                            <p className="hidden md:block">
                                                {subLink.name}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}
