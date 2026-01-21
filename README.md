<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="logo" style="" height="60" />
    </p>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/v-0.0.6-black"/>
    <a href="https://github.com/cruxkit-org"><img src="https://img.shields.io/badge/🔥-@cruxkit-black"/></a>
    <br>
    <img src="https://img.shields.io/badge/coverage-94.35%25-brightgreen" alt="Test Coverage" />
    <img src="https://img.shields.io/github/issues/cruxkit-org/navbar?style=flat" alt="Github Repo Issues" />
    <img src="https://img.shields.io/github/stars/cruxkit-org/navbar?style=social" alt="GitHub Repo stars" />
</div>
<br>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ DOC ══════════════════════════════╗ -->

- ## Overview 👀
    - #### Why ?
        > To compose navbars from small layout primitives instead of hand‑rolled flex code.

    - #### When ?
        > When you need a layout for logo, links, search and actions that stays consistent across pages.

    <br>
    <br>

- ## Quick Start 🔥

    > install [`hmm`](https://github.com/minejs-org/hmm) first.

    ```bash
    # in your terminal
    hmm i @cruxkit/navbar
    ```

    ```ts
    // in your ts files
    import { Navbar } from `@cruxkit/navbar`;
    ```

    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> </div>
    <br>


    - ### Basic usage

        ```tsx
        import { Navbar, type NavItem } from '@cruxkit/navbar';

        const items: NavItem[] = [
            {
                type: 'logo',
                content: <img src="/logo.svg" alt="Logo" />,
                position: 'start'
            },
            {
                type: 'links',
                position: 'center',
                content: (
                    <>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </>
                )
            },
            {
                type: 'actions',
                position: 'end',
                content: <button>Login</button>
            }
        ];

        export const MyNavbar = () => <Navbar items={items} />;
        ```

    - ### With options

        ```tsx
        import { Navbar, type NavItem } from '@cruxkit/navbar';

        const items: NavItem[] = [
            {
                type: 'logo',
                content: <span>CruxKit</span>,
                keepOnMobile: true
            },
            {
                type: 'links',
                content: (
                    <>
                        <li>Features</li>
                        <li>Pricing</li>
                    </>
                )
            },
            {
                type: 'search',
                content: <input placeholder="Search..." />
            },
            {
                type: 'actions',
                content: <button>Sign Up</button>
            }
        ];

        export const AppNavbar = () => (
            <Navbar 
                items={items}
                sticky={true}
                gap="lg"
                autoDividerBetweenItems={true}
                dividerMainOnMobile="hidden"
                className="shadow-sm"
                positionMap={{
                    logo: 'start',
                    links: 'center',
                    search: 'end',
                    actions: 'end'
                }}
            />
        );
        ```

    <br>
    <br>

- ## Documentation 📑


    - ### API ⛓️

        - #### Functions

            ```tsx
            // Renders a responsive navigation bar with support for multiple layouts and item positioning.
            export function Navbar(props: NavProps): JSXElement
            ```

        - #### Types

            ```tsx
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

            export interface NavProps {
                items                       : NavItem[];
                mode?                       : NavLayoutMode;
                gap?                        : NavSpacing;
                sticky?                     : boolean;
                positionMap?                : NavItemPositionMap;
                className?                  : string;
                autoDividerBetweenItems?    : boolean;
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
            }
            ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> </div>
        <br>

    - ### Related 🔗

        - ##### [@minejs/jsx](https://github.com/minejs-org/jsx)

        - ##### [@mineui/utils](https://github.com/mineui-org/utils)

        - ##### [@cruxkit/container](https://github.com/cruxkit-org/container)

        - ##### [@cruxkit/..](https://github.com/cruxkit-org)


<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ END ══════════════════════════════╗ -->

<br>
<br>

---

<div align="center">
    <a href="https://github.com/maysara-elshewehy"><img src="https://img.shields.io/badge/by-Maysara-black"/></a>
</div>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->
