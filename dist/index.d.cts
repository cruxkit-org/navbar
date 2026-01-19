import { JSXElement } from '@minejs/jsx';

type NavItemPosition = 'start' | 'center' | 'center-start' | 'center-end' | 'end';
type NavItemAlign = 'flex-start' | 'center' | 'flex-end';
type NavLayoutMode = 'horizontal' | 'vertical';
type NavSpacing = 'sm' | 'md' | 'lg';
type NavItemType = 'logo' | 'links' | 'actions' | 'search' | 'divider' | 'custom';
type NavItemPositionMap = Partial<Record<NavItemType, NavItemPosition>>;
type NavDividerOnMobile = 'hidden' | 'visible' | 'horizontal' | 'vertical';
type NavItemContent = JSXElement | JSXElement[] | (() => JSXElement | JSXElement[]);
interface NavItem {
    type: NavItemType;
    content?: NavItemContent;
    position?: NavItemPosition;
    align?: NavItemAlign;
    responsive?: Partial<Record<'mobile' | 'tablet' | 'desktop', NavItemPosition>>;
    keepOnMobile?: boolean;
    divider?: boolean;
    dividerOnMobile?: NavDividerOnMobile;
}
interface NavProps {
    items: NavItem[];
    mode?: NavLayoutMode;
    gap?: NavSpacing;
    sticky?: boolean;
    positionMap?: NavItemPositionMap;
    className?: string;
    autoDividerBetweenItems?: boolean;
    dividerOnMobile?: NavDividerOnMobile;
    dividerVariant?: 'solid' | 'dashed' | 'dotted';
    dividerThickness?: 'super-thin' | 'thin' | 'medium' | 'thick';
    dividerColor?: '1' | '2' | '3' | 'brand' | 'current';
    dividerSpacing?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;
    dividerOpacity?: 0 | 5 | 10 | 20 | 40 | 50 | 60 | 25 | 30 | 70 | 75 | 80 | 90 | 95 | 100;
    dividerMax?: number;
}

declare function Navbar(props: NavProps): JSXElement;

export { type NavDividerOnMobile, type NavItem, type NavItemAlign, type NavItemContent, type NavItemPosition, type NavItemPositionMap, type NavItemType, type NavLayoutMode, type NavProps, type NavSpacing, Navbar };
