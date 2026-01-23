// src/kit/navbar.tsx
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';
    import { Container, type ContainerGap, type ContainerJustify } from '@cruxkit/container';
    import { Icon, IconName } from '@cruxkit/icon';
    import { Divider } from '@cruxkit/divider';
    import type { NavProps, NavItem, NavSpacing, NavItemAlign } from '../types';
    import { Sidemenu } from './sidemenu';
    import { push } from '@cruxjs/client';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    function resolveNavGap(gap: NavSpacing): ContainerGap {
        if (gap === 'sm') return 2;
        if (gap === 'lg') return 6;
        return 4;
    }

    function resolveItemGap(gap?: NavSpacing | ContainerGap): ContainerGap | undefined {
        if (gap === undefined) return undefined;
        if (typeof gap === 'number') return gap;
        return resolveNavGap(gap);
    }

    function resolveJustify(align?: NavItemAlign): ContainerJustify | undefined {
        if (align === 'flex-start') return 'start';
        if (align === 'center') return 'center';
        if (align === 'flex-end') return 'end';
        return undefined;
    }

    function resolveContent(content: NavItem['content']): JSXElement | JSXElement[] | undefined {
        if (!content) return undefined;
        if (typeof content === 'function') return content();
        return content;
    }

    function getMobileVisibilityClass(item: NavItem): string {
        if (item.type === 'logo') return '';
        if (item.keepOnMobile) return '';
        return 'hidden md:flex';
    }

    function renderNavItem(item: NavItem, navProps?: NavProps): JSXElement {
        const itemConfig = navProps?.config?.[item.type];
        const gap = resolveItemGap(itemConfig?.gap);

        if (item.type === 'logo') {
            return (
                <Container
                    display="flex"
                    align="center"
                    gap={gap ?? 2}
                    className="navbar-item navbar-logo cursor-pointer"
                    onClick={() => push('/')}
                >
                    {resolveContent(item.content)}
                </Container>
            );
        }

        if (item.type === 'links') {
            return (
                <Container
                    as="ul"
                    display="flex"
                    align="center"
                    gap={gap ?? 1}
                    h="full"
                    className="navbar-item navbar-links"
                >
                    {resolveContent(item.content)}
                </Container>
            );
        }

        if (item.type === 'actions') {
            return (
                <Container
                    display="flex"
                    align="center"
                    gap={gap ?? 2}
                    h="full"
                    className="navbar-item navbar-actions"
                >
                    {resolveContent(item.content)}
                </Container>
            );
        }

        if (item.type === 'search') {
            return (
                <Container
                    display="flex"
                    align="center"
                    gap={gap ?? 2}
                    h="full"
                    className="navbar-item navbar-search"
                >
                    {resolveContent(item.content)}
                </Container>
            );
        }

        if (item.type === 'divider') {
            const resolved = resolveContent(item.content);
            
            if (resolved) {
                return (
                    <Container
                        display="flex"
                        align="center"
                        w="auto"
                        h="full"
                        px={2}
                        className="navbar-item navbar-divider"
                    >
                        {resolved}
                    </Container>
                );
            }

            return (
                <Container
                    display="flex"
                    align="center"
                    w="auto"
                    h="full"
                    px={2}
                    className="navbar-item navbar-divider"
                >
                    <Divider
                        orientation="vertical"
                        thickness={navProps?.dividerThickness || "super-thin"}
                        spacing={navProps?.dividerSpacing ?? 2}
                        opacity={navProps?.dividerOpacity ?? 50}
                        variant={navProps?.dividerVariant}
                        color={navProps?.dividerColor}
                        max={navProps?.dividerMax ?? 60}
                    />
                </Container>
            );
        }

        return (
            <Container
                display="flex"
                align="center"
                h="full"
                className="navbar-item navbar-custom"
            >
                {resolveContent(item.content)}
            </Container>
        );
    }

    function shouldShowDividerAfter(
        item: NavItem,
        index: number,
        items: NavItem[]
    ): boolean {
        if (item.type === 'divider') return false;
        if (item.divider === true) return true;
        if (item.divider === false) return false;
        return false;
    }

    function renderDivider(item: NavItem, navProps: NavProps, orientation: 'horizontal' | 'vertical') {
        const mobileOption = item.dividerMainOnMobile;

        const dividerProps = {
            thickness: navProps.dividerThickness || "super-thin",
            spacing: navProps.dividerSpacing ?? 2,
            opacity: navProps.dividerOpacity ?? 50,
            variant: navProps.dividerVariant,
            color: navProps.dividerColor,
            max: navProps.dividerMax ?? 60,
        };

        if (!mobileOption) {
            return (
                <Divider
                    orientation={orientation}
                    {...dividerProps}
                />
            );
        }

        if (mobileOption === 'hidden') {
            return (
                <Container
                    h={orientation === 'vertical' ? 'full' : undefined}
                    w={orientation === 'vertical' ? undefined : 'full'}
                    className="hidden md:flex items-center"
                >
                    <Divider
                        orientation={orientation}
                        {...dividerProps}
                    />
                </Container>
            );
        }

        if (mobileOption === 'visible') {
            return (
                <Divider
                    orientation={orientation}
                    {...dividerProps}
                />
            );
        }

        if (mobileOption === 'horizontal') {
            if (orientation === 'vertical') {
                return (
                    <>
                        <Container w="full" className="md:hidden flex items-center">
                            <Divider orientation="horizontal" {...dividerProps} />
                        </Container>
                        <Container h="full" className="hidden md:flex items-center">
                            <Divider orientation="vertical" {...dividerProps} />
                        </Container>
                    </>
                );
            }
            return <Divider orientation="horizontal" {...dividerProps} />;
        }

        if (mobileOption === 'vertical') {
            if (orientation === 'horizontal') {
                return (
                    <>
                        <Container h="full" className="flex md:hidden items-center">
                            <Divider orientation="vertical" {...dividerProps} />
                        </Container>
                        <Container w="full" className="hidden md:flex items-center">
                            <Divider orientation="horizontal" {...dividerProps} />
                        </Container>
                    </>
                );
            }
            return <Divider orientation="vertical" {...dividerProps} />;
        }

        return null;
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
    export function Navbar(props: NavProps): JSXElement {
        const mode = props.mode || 'horizontal';
        const gap = props.gap || 'md';
        const hasSidemenu = !!props.sidemenu;

        const itemsWithPosition = props.items.map(item => {
            const position = item.position
                || props.config?.[item.type]?.position
                || 'start';
            return { item, position };
        });

        const itemsByPosition = {
            start       : itemsWithPosition.filter(e => e.position === 'start').map(e => e.item),
            centerStart : itemsWithPosition.filter(e => e.position === 'center-start').map(e => e.item),
            center      : itemsWithPosition.filter(e => e.position === 'center').map(e => e.item),
            centerEnd   : itemsWithPosition.filter(e => e.position === 'center-end').map(e => e.item),
            end         : itemsWithPosition.filter(e => e.position === 'end').map(e => e.item)
        };

        const gapValue = resolveNavGap(gap);

        const modeClasses =
            mode === 'vertical'
                ? {
                    direction: 'column' as const,
                    sectionDirection: 'column' as const
                }
                : {
                    direction: 'row' as const,
                    sectionDirection: 'row' as const
                };

        const stickyClass = props.sticky ? 'sticky top-0 z-40' : '';

        return (
            <>
                <Container
                    as="nav"
                    display="flex"
                    direction={modeClasses.direction}
                    gap={gapValue}
                    bg="surface"
                    className={`
                        navbar
                        ${mode === 'horizontal' ? 'border-b' : 'border-e'}
                        border-1
                        ${stickyClass}
                        ${props.className || ''}
                    `}
                >
                    {itemsByPosition.start.length > 0 && (
                        <Container
                            display="flex"
                            direction={modeClasses.sectionDirection}
                            gap={gapValue}
                            align="center"
                            h="full"
                            className="navbar-section navbar-section--start"
                        >
                            {itemsByPosition.start.map((item, index, arr) => (
                                <>
                                    <Container
                                        display="flex"
                                        align="center"
                                        justify={item.type !== 'divider' ? resolveJustify(item.align) : undefined}
                                        h="full"
                                        className={`
                                            navbar-item-wrapper
                                            ${getMobileVisibilityClass(item)}
                                        `}
                                    >
                                        {renderNavItem(item, props)}
                                    </Container>
                                    {shouldShowDividerAfter(item, index, arr) && (
                                        <Container
                                            display="flex"
                                            align="center"
                                            h={mode === 'horizontal' ? 'full' : undefined}
                                            w={mode === 'horizontal' ? undefined : 'full'}
                                        >
                                            {renderDivider(item, props, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                        </Container>
                                    )}
                                </>
                            ))}
                        </Container>
                    )}

                    {(itemsByPosition.center.length > 0 || itemsByPosition.centerStart.length > 0 || itemsByPosition.centerEnd.length > 0) && (
                        <Container
                            display="flex"
                            direction={modeClasses.sectionDirection}
                            gap={gapValue}
                            align="center"
                            justify="between"
                            h="full"
                            className="navbar-section navbar-section--center flex-1"
                        >
                            {itemsByPosition.centerStart.length > 0 && (
                                <Container
                                    display="flex"
                                    align="center"
                                    justify="start"
                                    h="full"
                                    className="flex-1"
                                >
                                    {itemsByPosition.centerStart.map((item, index, arr) => (
                                        <>
                                            <Container
                                                display="flex"
                                                align="center"
                                                justify={item.type !== 'divider' ? resolveJustify(item.align) : undefined}
                                                h="full"
                                                className={`navbar-item-wrapper ${getMobileVisibilityClass(item)}`}
                                            >
                                                {renderNavItem(item, props)}
                                            </Container>
                                            {shouldShowDividerAfter(item, index, arr) && (
                                                <Container
                                                    display="flex"
                                                    align="center"
                                                    h={mode === 'horizontal' ? 'full' : undefined}
                                                    w={mode === 'horizontal' ? undefined : 'full'}
                                                >
                                                    {renderDivider(item, props, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                                </Container>
                                            )}
                                        </>
                                    ))}
                                </Container>
                            )}

                            {itemsByPosition.center.length > 0 && (
                                <Container
                                    display="flex"
                                    align="center"
                                    justify="center"
                                    h="full"
                                    className="flex-0"
                                >
                                    {itemsByPosition.center.map((item, index, arr) => (
                                        <>
                                            <Container
                                                display="flex"
                                                align="center"
                                                justify={item.type !== 'divider' ? resolveJustify(item.align) : undefined}
                                                h="full"
                                                className={`navbar-item-wrapper ${getMobileVisibilityClass(item)}`}
                                            >
                                                {renderNavItem(item, props)}
                                            </Container>
                                            {shouldShowDividerAfter(item, index, arr) && (
                                                <Container
                                                    display="flex"
                                                    align="center"
                                                    h={mode === 'horizontal' ? 'full' : undefined}
                                                    w={mode === 'horizontal' ? undefined : 'full'}
                                                >
                                                    {renderDivider(item, props, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                                </Container>
                                            )}
                                        </>
                                    ))}
                                </Container>
                            )}

                            {itemsByPosition.centerEnd.length > 0 && (
                                <Container
                                    display="flex"
                                    align="center"
                                    justify="end"
                                    h="full"
                                    className="flex-1"
                                >
                                    {itemsByPosition.centerEnd.map((item, index, arr) => (
                                        <>
                                            <Container
                                                display="flex"
                                                align="center"
                                                justify={item.type !== 'divider' ? resolveJustify(item.align) : undefined}
                                                h="full"
                                                className={`navbar-item-wrapper ${getMobileVisibilityClass(item)}`}
                                            >
                                                {renderNavItem(item, props)}
                                            </Container>
                                            {shouldShowDividerAfter(item, index, arr) && (
                                                <Container
                                                    display="flex"
                                                    align="center"
                                                    h={mode === 'horizontal' ? 'full' : undefined}
                                                    w={mode === 'horizontal' ? undefined : 'full'}
                                                >
                                                    {renderDivider(item, props, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                                </Container>
                                            )}
                                        </>
                                    ))}
                                </Container>
                            )}
                        </Container>
                    )}

                    {itemsByPosition.end.length > 0 && (
                        <Container
                            display="flex"
                            direction={modeClasses.sectionDirection}
                            gap={gapValue}
                            align="center"
                            h="full"
                            className="navbar-section navbar-section--end justify-end"
                        >
                            {itemsByPosition.end.map((item, index, arr) => (
                                <>
                                    <Container
                                        display="flex"
                                        align="center"
                                        justify={item.type !== 'divider' ? resolveJustify(item.align) : undefined}
                                        h="full"
                                        className={`navbar-item-wrapper ${getMobileVisibilityClass(item)}`}
                                    >
                                        {renderNavItem(item, props)}
                                    </Container>
                                    {shouldShowDividerAfter(item, index, arr) && (
                                        <Container
                                            display="flex"
                                            align="center"
                                            h={mode === 'horizontal' ? 'full' : undefined}
                                            w={mode === 'horizontal' ? undefined : 'full'}
                                        >
                                            {renderDivider(item, props, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                        </Container>
                                    )}
                                </>
                            ))}

                            {hasSidemenu && props.sidemenu!.showToggle !== false && (
                                <Container
                                    display="flex"
                                    align="center"
                                    className={`navbar-sidemenu-toggle ms-4 md:hidden ${props.sidemenu!.toggleClassName || ''}`}
                                >
                                    <label
                                        htmlFor={props.sidemenu!.id}
                                        tabIndex={0}
                                        role="button"
                                        aria-label="Toggle sidemenu"
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            size-10
                                            border-1
                                            rounded-md
                                            bg-surface
                                            transition-transform
                                            duration-200
                                            ease-out
                                            hover:bg-brand-subtle
                                            cursor-pointer
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-brand
                                        "
                                        onKeyDown={(e: KeyboardEvent) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                (e.target as HTMLLabelElement).click();
                                            }
                                        }}
                                    >
                                        <Icon
                                            name={(props.sidemenu!.toggleIcon || 'bars') as IconName}
                                            size="md"
                                        />
                                    </label>
                                </Container>
                            )}
                        </Container>
                    )}
                </Container>

                {hasSidemenu && <Sidemenu {...props.sidemenu!} />}
            </>
        );
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝