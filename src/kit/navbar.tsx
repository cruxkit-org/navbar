// src/kit/navbar.tsx
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';
    import { Container, type ContainerGap } from '@cruxkit/container';
    import { Icon } from '@cruxkit/icon';
    import { Divider } from '@cruxkit/divider';
    import type { NavProps, NavItem, NavSpacing, NavItemAlign } from '../types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    function resolveNavGap(gap: NavSpacing): ContainerGap {
        if (gap === 'sm') return 2;
        if (gap === 'lg') return 6;
        return 4;
    }

    function getAlignClass(align?: NavItemAlign): string {
        if (align === 'flex-start') return 'justify-start';
        if (align === 'center') return 'justify-center';
        if (align === 'flex-end') return 'justify-end';
        return '';
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
        if (item.type === 'logo') {
            return (
                <Container
                    display="flex"
                    align="center"
                    gap={2}
                    className="navbar-item navbar-logo"
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
                    gap={1}
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
                    gap={2}
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
                    gap={2}
                    className="navbar-item navbar-search"
                >
                    {resolveContent(item.content)}
                </Container>
            );
        }

        if (item.type === 'divider') {
            const resolved = resolveContent(item.content);
            
            // If user provided content (custom divider), use it wrapped in container
            if (resolved) {
                return (
                    <Container
                        w="auto"
                        h="full"
                        px={2}
                        className="navbar-item navbar-divider flex items-center"
                    >
                        {resolved}
                    </Container>
                );
            }

            // Otherwise, render a clean default Divider directly
            // Note: In most navbar cases (horizontal), we want a vertical divider.
            return (
                <Container
                    w="auto"
                    h="full"
                    px={2}
                    className="navbar-item navbar-divider flex items-center"
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
                className="navbar-item navbar-custom"
            >
                {resolveContent(item.content)}
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
        const isLast = index === items.length - 1;
        
        // Don't show divider after last item
        if (isLast) return false;

        if (item.divider === true) return true;
        if (item.divider === false) return false;
        return !!autoDivider;
    }

    export function Navbar(props: NavProps): JSXElement {
        const mode = props.mode || 'horizontal';
        const gap = props.gap || 'md';

        const renderDivider = (item: NavItem, defaultOrientation: 'horizontal' | 'vertical') => {
            const mobileOption = item.dividerOnMobile || props.dividerOnMobile;

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
                        className={`hidden md:block ${defaultOrientation === 'vertical' ? 'h-full' : 'w-full'}`}
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
                            <Container className="md:hidden w-full">
                                <Divider
                                    orientation="horizontal"
                                    {...dividerProps}
                                />
                            </Container>
                            <Container className="hidden md:block h-full">
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
                            <Container className="md:hidden h-full">
                                <Divider
                                    orientation="vertical"
                                    {...dividerProps}
                                />
                            </Container>
                            <Container className="hidden md:block w-full">
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
            const position = item.position || props.positionMap?.[item.type] || 'start';
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
                w="full"
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
                        className="navbar-section navbar-section--start"
                    >
                        {itemsByPosition.start.map((item, index, arr) => (
                            <>
                                <Container
                                    display="flex"
                                    align="center"
                                    className={`
                                        navbar-item-wrapper
                                        ${
                                            item.type !== 'divider'
                                                ? getAlignClass(item.align)
                                                : ''
                                        }
                                        ${getMobileVisibilityClass(item)}
                                    `}
                                >
                                    {renderNavItem(item, props)}
                                </Container>
                                {shouldShowDividerAfter(
                                    item,
                                    index,
                                    arr,
                                    props.autoDividerBetweenItems
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

                {(itemsByPosition.center.length > 0 || itemsByPosition.centerStart.length > 0 || itemsByPosition.centerEnd.length > 0) && (
                    <Container
                        display="flex"
                        direction={modeClasses.sectionDirection}
                        gap={gapValue}
                        align="center"
                        className="navbar-section navbar-section--center flex-1 justify-between"
                    >
                         {/* Center Start Section */}
                         {itemsByPosition.centerStart.length > 0 && (
                            <Container className="flex items-center justify-start flex-1">
                                {itemsByPosition.centerStart.map((item, index, arr) => (
                                    <>
                                        <Container
                                            display="flex"
                                            align="center"
                                            className={`
                                                navbar-item-wrapper
                                                ${
                                                    item.type !== 'divider'
                                                        ? getAlignClass(item.align)
                                                        : ''
                                                }
                                                ${getMobileVisibilityClass(item)}
                                            `}
                                        >
                                            {renderNavItem(item, props)}
                                        </Container>
                                        {shouldShowDividerAfter(
                                            item,
                                            index,
                                            arr,
                                            props.autoDividerBetweenItems
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

                         {/* Center Section */}
                         {itemsByPosition.center.length > 0 && (
                            <Container className="flex items-center justify-center flex-0">
                                {itemsByPosition.center.map((item, index, arr) => (
                                    <>
                                        <Container
                                            display="flex"
                                            align="center"
                                            className={`
                                                navbar-item-wrapper
                                                ${
                                                    item.type !== 'divider'
                                                        ? getAlignClass(item.align)
                                                        : ''
                                                }
                                                ${getMobileVisibilityClass(item)}
                                            `}
                                        >
                                            {renderNavItem(item, props)}
                                        </Container>
                                        {shouldShowDividerAfter(
                                            item,
                                            index,
                                            arr,
                                            props.autoDividerBetweenItems
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

                         {/* Center End Section */}
                         {itemsByPosition.centerEnd.length > 0 && (
                            <Container className="flex items-center justify-end flex-1">
                                {itemsByPosition.centerEnd.map((item, index, arr) => (
                                    <>
                                        <Container
                                            display="flex"
                                            align="center"
                                            className={`
                                                navbar-item-wrapper
                                                ${
                                                    item.type !== 'divider'
                                                        ? getAlignClass(item.align)
                                                        : ''
                                                }
                                                ${getMobileVisibilityClass(item)}
                                            `}
                                        >
                                            {renderNavItem(item, props)}
                                        </Container>
                                        {shouldShowDividerAfter(
                                            item,
                                            index,
                                            arr,
                                            props.autoDividerBetweenItems
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
                        className="navbar-section navbar-section--end justify-end"
                    >
                        {itemsByPosition.end.map((item, index, arr) => (
                            <>
                                <Container
                                    display="flex"
                                    align="center"
                                    className={`
                                        navbar-item-wrapper
                                        ${
                                            item.type !== 'divider'
                                                ? getAlignClass(item.align)
                                                : ''
                                        }
                                        ${getMobileVisibilityClass(item)}
                                    `}
                                >
                                    {renderNavItem(item, props)}
                                </Container>
                                {shouldShowDividerAfter(
                                    item,
                                    index,
                                    arr,
                                    props.autoDividerBetweenItems
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
                                        className="p-4"
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

                                        {collapsedItems.map(item => (
                                            <Container
                                                display="flex"
                                                align="center"
                                                className="navbar-item-wrapper"
                                            >
                                                {renderNavItem(item, props)}
                                            </Container>
                                        ))}
                                    </Container>
                                </Container>
                            </Container>
                        )}
                    </Container>
                )}
            </Container>
        );
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝