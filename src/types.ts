// src/types.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗
    
    export type NavItemPosition     = 'start'       | 'center'      | 'end';
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

    export interface NavItem {
        type                        : NavItemType;
        content?                    : JSXElement | JSXElement[];
        position                    : NavItemPosition;
        align?                      : NavItemAlign;
        responsive?                 : Partial<Record<'mobile' | 'tablet' | 'desktop', NavItemPosition>>;
    }

    export interface NavProps {
        items                       : NavItem[];
        mode?                       : NavLayoutMode;
        gap?                        : NavSpacing;
        sticky?                     : boolean;
        className?                  : string;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
