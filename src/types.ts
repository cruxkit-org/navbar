// src/types.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';
    import type { ContainerGap } from '@cruxkit/container';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗
    
    // ─────────────────────────────── NAVBAR TYPES ────────────────────────────────

    export type NavItemPosition     = 'start' | 'center' | 'center-start' | 'center-end' | 'end';
    export type NavItemAlign        = 'flex-start' | 'center' | 'flex-end';
    export type NavLayoutMode       = 'horizontal' | 'vertical';
    export type NavSpacing          = 'sm' | 'md' | 'lg';

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


    // ─────────────────────────────── SIDEMENU TYPES ───────────────────────────────

    export type SidemenuPosition     = 'start' | 'end';
    export type SidemenuWidth        = 'sm' | 'md' | 'lg' | 'xl' | 'full' | string | number;

    export interface SidemenuConfig {
        // Core
        id                          : string;
        component                   : JSXElement | (() => JSXElement);
        position?                   : SidemenuPosition;
        width?                      : SidemenuWidth;
        
        // Behavior
        backdrop?                   : boolean;
        closeOnBackdrop?            : boolean;
        closeOnEscape?              : boolean;
        
        // Animation
        transition?                 : 'slide' | 'fade' | 'none';
        duration?                   : number;
        
        // Styling
        className?                  : string;
        zIndex?                     : 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

        // Toggle button customization
        toggleIcon?                 : string;
        toggleClassName?            : string;
        showToggle?                 : boolean;
        alwaysShowToggle?           : boolean;
    }

    // ─────────────────────────────── NAVBAR PROPS ────────────────────────────────

    export interface NavProps {
        // Items
        items                       : NavItem[];
        
        // Layout
        mode?                       : NavLayoutMode;
        gap?                        : NavSpacing;
        sticky?                     : boolean;
        config?                     : NavConfigMap;
        
        // Sidemenu Integration
        sidemenu?                    : SidemenuConfig;
        
        // Styling
        className?                  : string;
        
        // Divider customization (main navbar)
        dividerVariant?             : 'solid' | 'dashed' | 'dotted';
        dividerThickness?           : 'super-thin' | 'thin' | 'medium' | 'thick';
        dividerColor?               : '1' | '2' | '3' | 'brand' | 'current';
        dividerSpacing?             : 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;
        dividerOpacity?             : 0 | 5 | 10 | 20 | 40 | 50 | 60 | 25 | 30 | 70 | 75 | 80 | 90 | 95 | 100;
        dividerMax?                 : number;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝