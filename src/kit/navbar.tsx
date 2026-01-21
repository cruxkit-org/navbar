// src/kit/navbar.tsx
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';
    import { Container, type ContainerGap, type ContainerJustify } from '@cruxkit/container';
    import { Icon } from '@cruxkit/icon';
    import { Divider } from '@cruxkit/divider';
    import type { NavProps, NavItem, NavSpacing, NavItemAlign } from '../types';
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

    function resolveContent(content: NavItem['content'], clone?: boolean): JSXElement | JSXElement[] | undefined {
        if (!content) return undefined;
        if (typeof content === 'function') return content();
        
        if (clone) {
            if (content instanceof Node) {
                return content.cloneNode(true) as JSXElement;
            }
            if (Array.isArray(content)) {
                return content.map(c => (c instanceof Node ? c.cloneNode(true) : c)) as JSXElement[];
            }
        }
        
        return content;
    }

    function getMobileVisibilityClass(item: NavItem): string {
        if (item.type === 'logo') return '';
        if (item.keepOnMobile) return '';
        return 'hidden md:flex';
    }

    function renderNavItem(item: NavItem, navProps?: NavProps, clone?: boolean): JSXElement {
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
                    {resolveContent(item.content, clone)}
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
                    {resolveContent(item.content, clone)}
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
                    {resolveContent(item.content, clone)}
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
                    {resolveContent(item.content, clone)}
                </Container>
            );
        }

        if (item.type === 'divider') {
            const resolved = resolveContent(item.content, clone);
            
            // If user provided content (custom divider), use it wrapped in container
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

            // Otherwise, render a clean default Divider directly
            // Note: In most navbar cases (horizontal), we want a vertical divider.
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
                {resolveContent(item.content, clone)}
            </Container>
        );
    }

    function shouldShowDividerAfter(
        item: NavItem,
        index: number,
        items: NavItem[],
        autoDivider?: boolean
    ): boolean {
        if (item.type === 'divider') return false;
        if (item.divider === true) return true;
        if (item.divider === false) return false;
        return !!autoDivider;
    }

    export function Navbar(props: NavProps): JSXElement {
        const mode = props.mode || 'horizontal';
        const gap = props.gap || 'md';

        const renderDivider = (item: NavItem, defaultOrientation: 'horizontal' | 'vertical') => {
            const mobileOption = item.dividerMainOnMobile || props.dividerMainOnMobile;

            // Common props for Divider
            const dividerProps = {
                thickness: props.dividerThickness || "super-thin",
                spacing: props.dividerSpacing ?? 2,
                opacity: props.dividerOpacity ?? 50,
                variant: props.dividerVariant,
                color: props.dividerColor,
                max: props.dividerMax ?? 60,
            };

            // Default behavior (no option specified)
            if (!mobileOption) {
                return (
                    <Divider
                        orientation={defaultOrientation}
                        {...dividerProps}
                    />
                );
            }

            // Hidden on mobile
            if (mobileOption === 'hidden') {
                return (
                    <Container
                        h={defaultOrientation === 'vertical' ? 'full' : undefined}
                        w={defaultOrientation === 'vertical' ? undefined : 'full'}
                        className="hidden md:flex items-center"
                    >
                        <Divider
                            orientation={defaultOrientation}
                            {...dividerProps}
                        />
                    </Container>
                );
            }

            // Visible on mobile (standard behavior, but explicit)
            if (mobileOption === 'visible') {
                return (
                    <Divider
                        orientation={defaultOrientation}
                        {...dividerProps}
                    />
                );
            }

            // Force horizontal on mobile
            if (mobileOption === 'horizontal') {
                if (defaultOrientation === 'vertical') {
                    // Mobile: Horizontal, Desktop: Vertical
                    return (
                        <>
                            <Container w="full" className="md:hidden flex items-center">
                                <Divider
                                    orientation="horizontal"
                                    {...dividerProps}
                                />
                            </Container>
                            <Container h="full" className="hidden md:flex items-center">
                                <Divider
                                    orientation="vertical"
                                    {...dividerProps}
                                />
                            </Container>
                        </>
                    );
                }
                // Desktop is also horizontal
                return (
                    <Divider
                        orientation="horizontal"
                        {...dividerProps}
                    />
                );
            }

            // Force vertical on mobile
            if (mobileOption === 'vertical') {
                if (defaultOrientation === 'horizontal') {
                    // Mobile: Vertical, Desktop: Horizontal
                    return (
                        <>
                            <Container h="full" className="flex md:hidden items-center">
                                <Divider
                                    orientation="vertical"
                                    {...dividerProps}
                                />
                            </Container>
                            <Container w="full" className="hidden md:flex items-center">
                                <Divider
                                    orientation="horizontal"
                                    {...dividerProps}
                                />
                            </Container>
                        </>
                    );
                }
                // Desktop is also vertical
                return (
                    <Divider
                        orientation="vertical"
                        {...dividerProps}
                    />
                );
            }

            return null;
        };

        const itemsWithPosition = props.items.map(item => {
            const position = item.position
                || props.config?.[item.type]?.position
                || 'start';
            return { item, position };
        });

        const itemsByPosition = {
            start       : itemsWithPosition.filter(entry => entry.position === 'start').map(entry => entry.item),
            centerStart : itemsWithPosition.filter(entry => entry.position === 'center-start').map(entry => entry.item),
            center      : itemsWithPosition.filter(entry => entry.position === 'center').map(entry => entry.item),
            centerEnd   : itemsWithPosition.filter(entry => entry.position === 'center-end').map(entry => entry.item),
            end         : itemsWithPosition.filter(entry => entry.position === 'end').map(entry => entry.item)
        };

        const collapsedItems = props.items.filter(
            item => item.type !== 'logo' && !item.keepOnMobile
        );

        const mobileActionsPosition = props.mobileActionsPosition || 'top';
        const mobileItemsLayout = props.mobileItemsLayout || 'vertical';

        const mobileTopItems = mobileActionsPosition === 'bottom'
            ? collapsedItems.filter(item => item.type !== 'actions')
            : collapsedItems;

        const mobileBottomItems = mobileActionsPosition === 'bottom'
            ? collapsedItems.filter(item => item.type === 'actions')
            : [];

        const hasCollapsedItems = collapsedItems.length > 0;

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
                                {shouldShowDividerAfter(
                                    item,
                                    index,
                                    arr,
                                ) && (
                                    <Container
                                        display="flex"
                                        align="center"
                                        h={mode === 'horizontal' ? 'full' : undefined}
                                        w={mode === 'horizontal' ? undefined : 'full'}
                                    >
                                        {renderDivider(item, mode === 'horizontal' ? 'vertical' : 'horizontal')}
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
                         {/* Center Start Section */}
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
                                            className={`
                                                navbar-item-wrapper
                                                ${getMobileVisibilityClass(item)}
                                            `}
                                        >
                                            {renderNavItem(item, props)}
                                        </Container>
                                        {shouldShowDividerAfter(
                                            item,
                                            index,
                                            arr,
                                        ) && (
                                            <Container
                                                display="flex"
                                                align="center"
                                                h={mode === 'horizontal' ? 'full' : undefined}
                                                w={mode === 'horizontal' ? undefined : 'full'}
                                            >
                                                {renderDivider(item, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                            </Container>
                                        )}
                                    </>
                                ))}
                            </Container>
                         )}

                         {/* Center Section */}
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
                                            className={`
                                                navbar-item-wrapper
                                                ${getMobileVisibilityClass(item)}
                                            `}
                                        >
                                            {renderNavItem(item, props)}
                                        </Container>
                                        {shouldShowDividerAfter(
                                            item,
                                            index,
                                            arr,
                                        ) && (
                                            <Container
                                                display="flex"
                                                align="center"
                                                h={mode === 'horizontal' ? 'full' : undefined}
                                                w={mode === 'horizontal' ? undefined : 'full'}
                                            >
                                                {renderDivider(item, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                            </Container>
                                        )}
                                    </>
                                ))}
                            </Container>
                         )}

                         {/* Center End Section */}
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
                                            className={`
                                                navbar-item-wrapper
                                                ${getMobileVisibilityClass(item)}
                                            `}
                                        >
                                            {renderNavItem(item, props)}
                                        </Container>
                                        {shouldShowDividerAfter(
                                            item,
                                            index,
                                            arr,
                                        ) && (
                                            <Container
                                                display="flex"
                                                align="center"
                                                className={mode === 'horizontal' ? 'h-full' : 'w-full'}
                                            >
                                                {renderDivider(item, mode === 'horizontal' ? 'vertical' : 'horizontal')}
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
                                    className={`
                                        navbar-item-wrapper
                                        ${getMobileVisibilityClass(item)}
                                    `}
                                >
                                    {renderNavItem(item, props)}
                                </Container>
                                {shouldShowDividerAfter(
                                    item,
                                    index,
                                    arr,
                                ) && (
                                    <Container
                                        display="flex"
                                        align="center"
                                        className={mode === 'horizontal' ? 'h-full' : 'w-full'}
                                    >
                                        {renderDivider(item, mode === 'horizontal' ? 'vertical' : 'horizontal')}
                                    </Container>
                                )}
                            </>
                        ))}

                        {hasCollapsedItems && (
                            <Container
                                display="flex"
                                align="center"
                                className="navbar-mobile-toggle ms-4 md:hidden"
                            >
                                <input
                                    id="navbar-mobile-toggle"
                                    type="checkbox"
                                    className="peer sr-only"
                                    aria-label="Toggle navigation menu"
                                />

                                <label
                                    htmlFor="navbar-mobile-toggle"
                                    tabIndex={0}
                                    role="button"
                                    aria-expanded="false"
                                    className="
                                        flex
                                        items-center
                                        size-10
                                        border-1
                                        rounded-md
                                        bg-surface
                                        items-center
                                        justify-center
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
                                        svg="<path d='M4 7h16v2H4z'/><path d='M4 11h16v2H4z'/><path d='M4 15h16v2H4z'/>"
                                        viewBox="0 0 24 24"
                                        size="md"
                                    />
                                </label>

                                <label
                                    htmlFor="navbar-mobile-toggle"
                                    className="
                                        fixed
                                        inset-0
                                        hidden
                                        md:hidden
                                        peer-checked:block
                                        bg-black
                                        bg-opacity-50
                                        z-40
                                    "
                                    aria-hidden="true"
                                />

                                <Container
                                    display="flex"
                                    direction="column"
                                    className="
                                        navbar-mobile-drawer
                                        fixed
                                        inset-y-0
                                        end-0
                                        z-50
                                        w-64
                                        max-w-full
                                        bg-surface
                                        border-s
                                        border-1
                                        shadow-lg
                                        md:hidden
                                        translate-x-full
                                        transition-transform
                                        duration-300
                                        ease-out
                                        peer-checked:translate-x-0
                                    "
                                >
                                    <Container
                                        display="flex"
                                        direction="column"
                                        gap={gapValue}
                                        className="p-4 flex-1 overflow-y-auto"
                                    >
                                        <Container
                                            display="flex"
                                            justify="end"
                                        >
                                            <label
                                                htmlFor="navbar-mobile-toggle"
                                                tabIndex={0}
                                                role="button"
                                                aria-label="Close navigation menu"
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
                                                onKeyDown={(e: KeyboardEvent) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        (e.target as HTMLLabelElement).click();
                                                    }
                                                }}
                                            >
                                                <Icon
                                                    svg="<path d='M6 6l12 12M6 18L18 6' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>"
                                                    viewBox="0 0 24 24"
                                                    size="md"
                                                />
                                            </label>
                                        </Container>

                                        <Container
                                            display="flex"
                                            direction="column"
                                            gap={gapValue}
                                            w="full"
                                        >
                                            {mobileTopItems.map((item, index, arr) => (
                                                <>
                                                    <Container
                                                        display="flex"
                                                        align="center"
                                                        justify="center"
                                                        w="full"
                                                        className="navbar-item-wrapper"
                                                    >
                                                        {renderNavItem(item, props, true)}
                                                    </Container>
                                                    {shouldShowDividerAfter(item, index, arr) && (
                                                        <Container
                                                            w="full"
                                                        >
                                                            <Divider
                                                                orientation="horizontal"
                                                                thickness={props.sidebarDividerThickness || props.dividerThickness || "super-thin"}
                                                                spacing={props.sidebarDividerSpacing ?? props.dividerSpacing ?? 2}
                                                                opacity={props.sidebarDividerOpacity ?? props.dividerOpacity ?? 50}
                                                                variant={props.sidebarDividerVariant || props.dividerVariant}
                                                                color={props.sidebarDividerColor || props.dividerColor}
                                                                max={props.sidebarDividerMax ?? props.dividerMax ?? 60}
                                                            />
                                                        </Container>
                                                    )}
                                                </>
                                            ))}
                                        </Container>
                                    </Container>

                                    {mobileBottomItems.length > 0 && (
                                        <Container
                                            display="flex"
                                            direction={mobileItemsLayout === 'horizontal' ? 'row' : 'column'}
                                            wrap={mobileItemsLayout === 'horizontal' ? true : undefined}
                                            gap={gapValue}
                                            align={mobileItemsLayout === 'horizontal' ? 'center' : undefined}
                                            justify={mobileItemsLayout === 'horizontal' ? 'center' : undefined}
                                            w="full"
                                            className="p-4 border-t border-1"
                                        >
                                            {mobileBottomItems.map((item, index, arr) => (
                                                <>
                                                    <Container
                                                        display="flex"
                                                        align="center"
                                                        justify="center"
                                                        w={mobileItemsLayout === 'horizontal' ? undefined : 'full'}
                                                        className="navbar-item-wrapper"
                                                    >
                                                        {renderNavItem(item, props, true)}
                                                    </Container>
                                                    {shouldShowDividerAfter(item, index, arr) && (
                                                        <Container
                                                            w={mobileItemsLayout === 'horizontal' ? undefined : 'full'}
                                                            h={mobileItemsLayout === 'horizontal' ? 'full' : undefined}
                                                            px={mobileItemsLayout === 'horizontal' ? 2 : undefined}
                                                        >
                                                            <Divider
                                                                orientation={mobileItemsLayout === 'horizontal' ? 'vertical' : 'horizontal'}
                                                                thickness={props.sidebarDividerThickness || props.dividerThickness || "super-thin"}
                                                                spacing={props.sidebarDividerSpacing ?? props.dividerSpacing ?? 2}
                                                                opacity={props.sidebarDividerOpacity ?? props.dividerOpacity ?? 50}
                                                                variant={props.sidebarDividerVariant || props.dividerVariant}
                                                                color={props.sidebarDividerColor || props.dividerColor}
                                                                max={props.sidebarDividerMax ?? props.dividerMax ?? 60}
                                                            />
                                                        </Container>
                                                    )}
                                                </>
                                            ))}
                                        </Container>
                                    )}
                                </Container>
                            </Container>
                        )}
                    </Container>
                )}
            </Container>
        );
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝