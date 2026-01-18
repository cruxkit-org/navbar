// src/kit/navbar.tsx
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';
    import { Container, type ContainerGap } from '@cruxkit/container';
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

    function renderNavItem(item: NavItem): JSXElement {
        if (item.type === 'logo') {
            return (
                <Container
                    display="flex"
                    align="center"
                    gap={2}
                    className="navbar-item navbar-logo"
                >
                    {item.content}
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
                    {item.content}
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
                    {item.content}
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
                    {item.content}
                </Container>
            );
        }

        if (item.type === 'divider') {
            return (
                <Container
                    w="auto"
                    h="full"
                    px={2}
                    className="navbar-item navbar-divider flex items-center"
                >
                    {item.content}
                </Container>
            );
        }

        return (
            <Container
                display="flex"
                align="center"
                className="navbar-item navbar-custom"
            >
                {item.content}
            </Container>
        );
    }

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
    export function Navbar(props: NavProps): JSXElement {
        const mode = props.mode || 'horizontal';
        const gap = props.gap || 'md';

        const itemsByPosition = {
            start: props.items.filter(item => item.position === 'start'),
            center: props.items.filter(item => item.position === 'center'),
            end: props.items.filter(item => item.position === 'end')
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
            <Container
                as="nav"
                display="flex"
                direction={modeClasses.direction}
                gap={gapValue}
                w="full"
                bg="surface"
                border={1}
                className={`
                    navbar
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
                        {itemsByPosition.start.map(item => (
                            <Container
                                display="flex"
                                align="center"
                                className={`
                                    navbar-item-wrapper
                                    flex
                                    items-center
                                    ${
                                        item.type !== 'divider'
                                            ? getAlignClass(item.align)
                                            : ''
                                    }
                                `}
                            >
                                {renderNavItem(item)}
                            </Container>
                        ))}
                    </Container>
                )}

                {itemsByPosition.center.length > 0 && (
                    <Container
                        display="flex"
                        direction={modeClasses.sectionDirection}
                        gap={gapValue}
                        align="center"
                        className="navbar-section navbar-section--center flex-1 justify-center"
                    >
                        {itemsByPosition.center.map(item => (
                            <Container
                                display="flex"
                                align="center"
                                className={`
                                    navbar-item-wrapper
                                    flex
                                    items-center
                                    ${
                                        item.type !== 'divider'
                                            ? getAlignClass(item.align)
                                            : ''
                                    }
                                `}
                            >
                                {renderNavItem(item)}
                            </Container>
                        ))}
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
                        {itemsByPosition.end.map(item => (
                            <Container
                                display="flex"
                                align="center"
                                className={`
                                    navbar-item-wrapper
                                    flex
                                    items-center
                                    ${
                                        item.type !== 'divider'
                                            ? getAlignClass(item.align)
                                            : ''
                                    }
                                `}
                            >
                                {renderNavItem(item)}
                            </Container>
                        ))}
                    </Container>
                )}
            </Container>
        );
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
