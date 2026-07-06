import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

interface MenuItem {
    name: string;
    path: string;
    icon: IconName;
}

interface IconProps {
    iconName: IconName;
    color?: string;
    size?: number;
    className?: string;
}

export function GenIcon({ iconName, color, size, className }: IconProps) {
    const IconComponent = <DynamicIcon className={className} name={iconName} color={color} size={size} />
    if (!IconComponent) {
        return null; // or return a default icon
    }
    return IconComponent;
}

export const menuItems: MenuItem[] = [
    { name: "Home", path: "/", icon: "home" },
    { name: "Services", path: "/services", icon: "user" },
    { name: "About", path: "/about", icon: "info" },
    { name: "Contact", path: "/contact", icon: "contact" },
];
