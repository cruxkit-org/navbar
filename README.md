<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="logo" style="" height="60" />
    </p>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/v-0.0.2-black"/>
    <a href="https://github.com/cruxkit-org"><img src="https://img.shields.io/badge/🔥-@cruxkit-black"/></a>
    <br>
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Test Coverage" />
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
    import { Dropdown } from `@cruxkit/navbar`;
    ```

    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> </div>
    <br>


    - ### Basic usage

        ```tsx
        import { Navbar } from '@cruxkit/navbar';

        export function AppNavbar() {
            return (
                <Navbar
                    items={[
                        {
                            type: 'logo',
                            position: 'start',
                        },
                        {
                            type: 'links',
                            position: 'center',
                        },
                        {
                            type: 'actions',
                            position: 'end',
                        },
                    ]}
                />
            );
        }
        ```

    - ### With options

        ```tsx
        import { Navbar, type NavItem } from '@cruxkit/navbar';

        const items: NavItem[] = [
            {
                type: 'logo',
                position: 'start',
            },
            {
                type: 'links',
                position: 'center',
                align: 'center',
            },
            {
                type: 'actions',
                position: 'end',
                responsive: {
                    mobile: 'center',
                    desktop: 'end',
                },
            },
        ];

        export function AppNavbar() {
            return (
                <Navbar
                    items={items}
                    mode="horizontal"
                    gap="sm"
                    sticky
                    className="border-b"
                />
            );
        }
        ```

    <br>
    <br>

- ## Documentation 📑


    - ### API ⛓️

        - #### Functions

            ```tsx
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
            export function Navbar(props: NavProps): JSXElement
            ```

        - #### Types

            ```tsx
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
            ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> </div>
        <br>

    - ### Related 🔗

        - ##### [@minejs/jsx](https://github.com/minejs-org/jsx)

        - ##### [@mineui/utils](https://github.com/mineui-org/utils)

        - ##### [@cruxkit/text](https://github.com/cruxkit-org/text)

        - ##### [@cruxkit/icon](https://github.com/cruxkit-org/icon)

        - ##### [@cruxkit/container](https://github.com/cruxkit-org/container)

        - ##### [@cruxkit/button](https://github.com/cruxkit-org/button)
        
        - ##### [@cruxkit/dropdown](https://github.com/cruxkit-org/dropdown)

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
