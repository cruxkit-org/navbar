// src/types.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';
    import type { ContainerGap } from '@cruxkit/container';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗
    
    export type NavItemPosition     = 'start'       | 'center'      | 'center-start' | 'center-end' | 'end';
    export type NavItemAlign        = 'flex-start'  | 'center'      | 'flex-end';
    export type NavLayoutMode       = 'horizontal'  | 'vertical';
    export type NavSpacing          = 'sm'          | 'md'          | 'lg';

    export type NavItemType =
        | 'logo'
        | 'links'
        | 'actions'
        | 'search'
        | 'divider'
        | 'custom';

    export type NavItemPositionMap = Partial<Record<NavItemType, NavItemPosition>>;

    export type NavDividerOnMobile = 'hidden' | 'visible' | 'horizontal' | 'vertical';

    export type NavItemContent = JSXElement | JSXElement[] | (() => JSXElement | JSXElement[]);

    export interface NavItem {
        type                        : NavItemType;
        content?                    : NavItemContent;
        position?                   : NavItemPosition;
        align?                      : NavItemAlign;
        responsive?                 : Partial<Record<'mobile' | 'tablet' | 'desktop', NavItemPosition>>;
        keepOnMobile?               : boolean;
        divider?                    : boolean;
        dividerMainOnMobile?        : NavDividerOnMobile;
    }

    export interface NavTypeConfig {
        position?                   : NavItemPosition;
        gap?                        : NavSpacing | ContainerGap;
    }

    export type NavConfigMap = Partial<Record<NavItemType, NavTypeConfig>>;

    export interface NavProps {
        items                       : NavItem[];
        mode?                       : NavLayoutMode;
        gap?                        : NavSpacing;
        sticky?                     : boolean;
        config?                     : NavConfigMap;
        className?                  : string;
        dividerMainOnMobile?        : NavDividerOnMobile;

        // Divider customization
        dividerVariant?             : 'solid' | 'dashed' | 'dotted';
        dividerThickness?           : 'super-thin' | 'thin' | 'medium' | 'thick';
        dividerColor?               : '1' | '2' | '3' | 'brand' | 'current';
        dividerSpacing?             : 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;
        dividerOpacity?             : 0 | 5 | 10 | 20 | 40 | 50 | 60 | 25 | 30 | 70 | 75 | 80 | 90 | 95 | 100;
        dividerMax?                 : number;

        // Sidebar Divider customization
        sidebarDividerVariant?      : 'solid' | 'dashed' | 'dotted';
        sidebarDividerThickness?    : 'super-thin' | 'thin' | 'medium' | 'thick';
        sidebarDividerColor?        : '1' | '2' | '3' | 'brand' | 'current';
        sidebarDividerSpacing?      : 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;
        sidebarDividerOpacity?      : 0 | 5 | 10 | 20 | 40 | 50 | 60 | 25 | 30 | 70 | 75 | 80 | 90 | 95 | 100;
        sidebarDividerMax?          : number;

        // Mobile customization
        mobileActionsPosition?      : 'top' | 'bottom';
        mobileItemsLayout?          : 'vertical' | 'horizontal';
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
