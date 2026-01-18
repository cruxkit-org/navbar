import { JSXElement } from '@minejs/jsx';

type NavItemPosition = 'start' | 'center' | 'end';
type NavItemAlign = 'flex-start' | 'center' | 'flex-end';
type NavLayoutMode = 'horizontal' | 'vertical';
type NavSpacing = 'sm' | 'md' | 'lg';
type NavItemType = 'logo' | 'links' | 'actions' | 'search' | 'divider' | 'custom';
interface NavItem {
    type: NavItemType;
    content?: JSXElement | JSXElement[];
    position: NavItemPosition;
    align?: NavItemAlign;
    responsive?: Partial<Record<'mobile' | 'tablet' | 'desktop', NavItemPosition>>;
}
interface NavProps {
    items: NavItem[];
    mode?: NavLayoutMode;
    gap?: NavSpacing;
    sticky?: boolean;
    className?: string;
}

/**
 * Renders a responsive navigation bar with support for multiple layouts and item positioning.
 *
 * @param props             - Configuration for the navbar.
 * @param props.items       - Array of navigation items to render, each with a designated position (`start`, `center`, or `end`).
 * @param props.mode        - Layout mode; either `horizontal` (default) or `vertical`.
 * @param props.gap         - Spacing size between items; accepts `sm`, `md` (default), or `lg`.
 * @param props.sticky      - Whether the navbar should stick to the top of the viewport when scrolling.
 * @param props.className   - Additional CSS classes to apply to the navbar root element.
 *
 * @returns A JSX element representing the fully composed navbar.
 */
declare function Navbar(props: NavProps): JSXElement;

export { type NavItem, type NavItemAlign, type NavItemPosition, type NavItemType, type NavLayoutMode, type NavProps, type NavSpacing, Navbar };
