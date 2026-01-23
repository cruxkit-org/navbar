import { JSXElement } from '@minejs/jsx';
import { ContainerGap } from '@cruxkit/container';

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
    dividerMainOnMobile?: NavDividerOnMobile;
}
interface NavTypeConfig {
    position?: NavItemPosition;
    gap?: NavSpacing | ContainerGap;
}
type NavConfigMap = Partial<Record<NavItemType, NavTypeConfig>>;
type SidemenuPosition = 'start' | 'end';
type SidemenuWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | string | number;
interface SidemenuConfig {
    id: string;
    component: JSXElement | (() => JSXElement);
    position?: SidemenuPosition;
    width?: SidemenuWidth;
    backdrop?: boolean;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    transition?: 'slide' | 'fade' | 'none';
    duration?: number;
    className?: string;
    zIndex?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
    toggleIcon?: string;
    toggleClassName?: string;
    showToggle?: boolean;
    alwaysShowToggle?: boolean;
}
interface NavProps {
    items: NavItem[];
    mode?: NavLayoutMode;
    gap?: NavSpacing;
    sticky?: boolean;
    config?: NavConfigMap;
    sidemenu?: SidemenuConfig;
    className?: string;
    dividerVariant?: 'solid' | 'dashed' | 'dotted';
    dividerThickness?: 'super-thin' | 'thin' | 'medium' | 'thick';
    dividerColor?: '1' | '2' | '3' | 'brand' | 'current';
    dividerSpacing?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;
    dividerOpacity?: 0 | 5 | 10 | 20 | 40 | 50 | 60 | 25 | 30 | 70 | 75 | 80 | 90 | 95 | 100;
    dividerMax?: number;
}

/**
 * Renders a responsive navigation bar with configurable sections and items.
 *
 * @param {NavProps} props - The configuration object for the navbar.
 * @param {NavItem[]} props.items - Array of navigation items to render.
 * @param {'horizontal' | 'vertical'} [props.mode='horizontal'] - Layout direction of the navbar.
 * @param {NavSpacing} [props.gap='md'] - Spacing between navbar sections.
 * @param {boolean} [props.sticky] - Whether the navbar should stick to the top of the viewport.
 * @param {string} [props.className] - Additional CSS classes to apply to the navbar.
 * @param {NavConfig} [props.config] - Per-item-type configuration overrides.
 * @param {string} [props.dividerThickness] - Thickness of divider lines.
 * @param {number} [props.dividerSpacing] - Spacing around divider lines.
 * @param {number} [props.dividerOpacity] - Opacity of divider lines.
 * @param {string} [props.dividerVariant] - Visual variant of divider lines.
 * @param {string} [props.dividerColor] - Color of divider lines.
 * @param {number} [props.dividerMax] - Maximum length of divider lines.
 * @param {SidemenuProps} [props.sidemenu] - Configuration for an optional sidemenu toggle.
 * @returns {JSXElement} The rendered navbar component.
 */
declare function Navbar(props: NavProps): JSXElement;

interface SidemenuProps extends SidemenuConfig {
    open?: boolean;
}
/**
 * Renders a responsive, animated sidemenu drawer.
 *
 * @param props.id - Unique identifier for the sidemenu toggle checkbox.
 * @param props.position - Sidemenu position: 'start' or 'end'.
 * @param props.width - Sidemenu width preset ('sm'|'md'|'lg'|'xl'|'full'), pixel number, or arbitrary CSS class.
 * @param props.backdrop - Whether to render a semi-transparent backdrop.
 * @param props.closeOnBackdrop - Whether clicking the backdrop closes the sidemenu.
 * @param props.closeOnEscape - Whether pressing Escape closes the sidemenu.
 * @param props.zIndex - Z-index for the sidemenu container.
 * @param props.transition - Animation type: 'slide' or 'fade'.
 * @param props.duration - Transition duration in milliseconds.
 * @param props.component - Sidemenu content (JSX or function returning JSX).
 * @param props.className - Additional CSS classes.
 * @param props.open - Controlled open state (checked state of the internal checkbox).
 * @returns A complete sidemenu component with optional backdrop, keyboard, and click-outside behaviors.
 */
declare function Sidemenu(props: SidemenuProps): JSXElement;

export { type NavConfigMap, type NavDividerOnMobile, type NavItem, type NavItemAlign, type NavItemContent, type NavItemPosition, type NavItemPositionMap, type NavItemType, type NavLayoutMode, type NavProps, type NavSpacing, type NavTypeConfig, Navbar, Sidemenu, type SidemenuConfig, type SidemenuPosition, type SidemenuProps, type SidemenuWidth };
