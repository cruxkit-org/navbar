<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="logo" style="" height="60" />
    </p>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/v-0.1.5-black"/>
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


    - ### Usage

        > a complete real example

        ```tsx
        import { render, type JSXElement }                          from '@minejs/jsx';
        import { toggleTheme, getCurrentTheme }                     from '@cruxext/theme';
        import { setLang, t, visit, reload }                        from '@cruxjs/client';
        import { Navbar as NavbarKit, type NavItem, type NavProps } from '@cruxkit/navbar';
        import { Button }                                           from '@cruxkit/button';
        import { Dropdown }                                         from '@cruxkit/dropdown';
        import { Container }                                        from '@cruxkit/container';
        import { effect, Signal, signal }                           from '@minejs/signals';
        import { Icon }                                             from '@cruxkit/icon';
        import { toast }                                            from '@cruxext/toast';
        import { Text }                                             from '@cruxkit/text';
        import { Divider }                                          from '@cruxkit/divider';

        let isDark: undefined | Signal<boolean> = undefined;
        ```

        ```tsx
        const items: NavItem[] = [
            // Logo
            {
                type: 'logo',
                position: 'start',
                divider: true,
                content: (
                    <img
                        src="/static/dist/img/logo.svg"
                        alt="logo"
                        className="h-6 w-auto object-contain"
                    />
                )
            },

            // Links
            {
                type: 'links',
                position: 'center-start',
                divider: true,
                dividerMainOnMobile: 'hidden',
                content: () => (
                    <Button variant="ghost" color="neutral">
                        {t("common.home")!}
                    </Button>
                )
            },
            {
                type: 'links',
                position: 'center-start',
                content: () => (
                    <Dropdown
                        trigger={t("common.docs")!}
                        triggerDisplay="label-only"
                        options={[
                            { label: 'Core', value: 'core' },
                            { label: 'Text', value: 'text' }
                        ]}
                        styleMode='classic'
                        autoDivider={true}
                        labelArrow
                    />
                )
            },

            // Actions
            {
                type: 'actions',
                position: 'end',
                divider: true,
                dividerMainOnMobile: 'hidden',
                content: () => (
                    <Dropdown
                        trigger="Language"
                        triggerIcon={'language'}
                        triggerDisplay="icon-only"
                        options={[
                            { label: 'العربية', value: 'ar' },
                            { label: 'English', value: 'en' }
                        ]}
                        styleMode='classic'
                        autoDivider={true}
                        labelArrow
                        onSelect={
                            v => {
                            setLang(v as string, true, false, true);
                            reload();
                            toast().info(t("toast.lang_toggled")!);
                        }}
                    />
                )
            },
            {
                type: 'actions',
                position: 'end',
                content: () => (
                    <Button
                        id="theme_button"
                        variant='ghost'
                        color="brand"
                        onMount={() => {
                            console.log('onMount');
                        }}
                        onLoad={(el) => {
                            console.log('onLoad');
                            isDark = signal(getCurrentTheme() === 'dark');

                            effect(() => {
                                console.log('onEffect');
                                if (typeof document === 'undefined') return;
                                const svg = isDark && isDark() ? Icon('sun')! : Icon('moon')!;

                                render(svg, '#theme_button span > svg')
                                const btn = document.querySelector('#theme_button span > svg')
                                if(btn) render(svg, btn as HTMLElement)
                            });
                        }}
                        onClick={() => {
                            console.log('onClick');
                            if (isDark === undefined) return;

                            const _isDark = isDark();
                            const next = !_isDark;
                            isDark.set(next);

                            toggleTheme();
                            toast().info(t("toast.theme_toggled")!);
                        }}
                    >
                        <Icon name={getCurrentTheme() == 'light' ? 'sun' : 'moon'}></Icon>
                    </Button>
                )
            },
        ];
        ```

        ```tsx
        const navProps: NavProps = {
            mode: 'horizontal',
            gap: 'md',
            sticky: true,
            items,
            config: {
                logo: {
                    position: 'start',
                    gap: 'md',
                },
                links: {
                    position: 'center-start',
                    gap: 'md',
                },
                actions: {
                    position: 'end',
                    gap: 'sm',
                },
            },

            className: 'px-4 h-12',

            dividerMax: 30,
            dividerOpacity: 50,
            dividerSpacing: 0,

            // Sidemenu Integration
            sidemenu: {
                id: 'app-sidemenu',
                component: SidemenuContent,
                position: 'start',
                width: 'md',
                backdrop: true,
                closeOnBackdrop: true,
                closeOnEscape: true,
                transition: 'slide',
                duration: 300,
                zIndex: 50,
                showToggle: true,
                toggleIcon: 'bars',
                toggleMargin: false,
                alwaysShowToggle: true,
            }
        };
        ```

        ```tsx
        const SidemenuContent = (): JSXElement => (
            <Container display="flex" direction="column" h="full">
                <Container px={4} className="h-12 border-b border-1" h={'full'}>
                    <Container display="flex" justify="between" align="center" h={'full'}>
                        <Container display="flex" justify="between" align="center" h={'full'} gap={4}>
                            <label
                                htmlFor="app-sidemenu"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    size-8
                                    rounded-md
                                    cursor-pointer
                                    hover:bg-brand-subtle
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-brand
                                "
                                tabIndex={0}
                                role="button"
                                aria-label="Close sidemenu"
                                onKeyDown={(e: KeyboardEvent) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        (e.target as HTMLLabelElement).click();
                                    }
                                }}
                            >
                                <Icon name="bars" size="md" />
                            </label>
                            <img
                                src="/static/dist/img/logo.svg"
                                alt="logo"
                                className="h-6 w-auto object-contain"
                            />
                            <Divider max={30} orientation='vertical' thickness='super-thin' className='my-auto' />
                            <Text size='lg' weight='bold'>{t("app.name")!}</Text>
                        </Container>
                        <label
                            htmlFor="app-sidemenu"
                            className="
                                flex
                                items-center
                                justify-center
                                size-8
                                rounded-md
                                cursor-pointer
                                hover:bg-brand-subtle
                                focus:outline-none
                                focus:ring-2
                                focus:ring-brand
                            "
                            tabIndex={0}
                            role="button"
                            aria-label="Close sidemenu"
                            onKeyDown={(e: KeyboardEvent) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    (e.target as HTMLLabelElement).click();
                                }
                            }}
                        >
                            <Icon name="x" size="sm" />
                        </label>
                    </Container>
                </Container>

                {/* Sidemenu Body */}
                <Container display="flex" direction="column" gap={2} p={4} className="flex-1 overflow-y-auto">
                    <Button variant="outline" color="neutral" className="justify-start w-full gap-4" leftIcon={{name: 'home', size: 'sm', class: 'opacity-50'}}>
                        {t("common.home")!}
                    </Button>

                    <Dropdown
                        variant='outline'
                        color="neutral"
                        className="justify-start w-full"
                        gap={4}
                        trigger={t("common.docs")!}
                        triggerIcon={{name: 'book-open', size: 'sm', class: 'opacity-50'}}
                        triggerDisplay="label-icon"
                        options={[
                            { label: 'Core', value: 'core' },
                            { label: 'Text', value: 'text' }
                        ]}
                        styleMode='classic'
                        autoDivider={true}
                        labelArrow
                    />

                    <Divider max={30} orientation='horizontal' thickness='super-thin' className='mx-auto my-2' />

                    <Dropdown
                        variant='outline'
                        color="neutral"
                        className="justify-start w-full"
                        gap={4}
                        trigger={t("common.lang")!}
                        triggerIcon={{name: 'language', size: 'sm', class: 'opacity-50'}}
                        triggerDisplay="label-icon"
                        options={[
                            { label: 'العربية', value: 'ar' },
                            { label: 'English', value: 'en' }
                        ]}
                        styleMode='classic'
                        autoDivider={true}
                        labelArrow
                        onSelect={v => {
                                setLang(v as string, true, false, true);
                                reload();
                                toast().info(t("toast.lang_toggled")!);
                            }}
                    />

                    <Button
                        variant="outline"
                        color="neutral"
                        className="justify-start w-full gap-4"
                        onClick={() => {
                            toggleTheme();
                            toast().info(t("toast.theme_toggled")!);
                        }}
                        leftIcon={{name: getCurrentTheme() === 'light' ? 'sun' : 'moon', size: 'sm', class: 'opacity-50'}}
                    >
                        {t("common.theme")!}
                    </Button>
                </Container>

                {/* Sidemenu Footer */}
                <Container p={4} className="border-t border-1">
                    <Button variant="solid" color="brand" className="w-full bg-brand-gt" rightIcon={{name: 'github', color: getCurrentTheme() == 'dark' ? '#fff' : '#000', class: 'opacity-50'}}
                    onClick={() => visit('https://github.com/maysara-elshewehy', true)}>
                        {t("common.follow_me")!}
                    </Button>
                </Container>
            </Container>
        );
        ```

        ```tsx
        export const Navbar = (): JSXElement => {
            return NavbarKit(navProps);
        };
        ```

    <br>
    <br>

- ## Documentation 📑


    - ### API ⛓️

        - #### Functions

            ```tsx
            // Renders a responsive navigation bar with configurable sections and items.
            export function Navbar(props: NavProps): JSXElement

            // Renders a responsive, animated sidemenu drawer.
            export function Sidemenu(props: SidemenuProps): JSXElement
            ```

        - #### Types

            ```tsx
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
