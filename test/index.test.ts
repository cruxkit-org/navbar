// test/index.test.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { describe, expect, test } from 'bun:test';
    import { JSDOM } from 'jsdom';
    import {
        Navbar,
        type NavItem,
    } from '../src';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    const dom               = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document         = dom.window.document;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.window           = dom.window as any;
    global.HTMLElement      = dom.window.HTMLElement;
    global.Element          = dom.window.Element;
    global.Text             = dom.window.Text;
    global.DocumentFragment = dom.window.DocumentFragment;
    global.Node             = dom.window.Node;

// ╔════════════════════════════════════════ TEST ════════════════════════════════════════╗

    describe('@cruxkit/navbar', () => {
        test('renders horizontal navbar with all item types', () => {
            const items: NavItem[] = [
                {
                    type: 'logo',
                    position: 'start',
                    keepOnMobile: true,
                },
                {
                    type: 'links',
                    position: 'center',
                    align: 'flex-start',
                },
                {
                    type: 'actions',
                    position: 'center',
                    align: 'center',
                    keepOnMobile: true,
                },
                {
                    type: 'search',
                    position: 'center',
                    align: 'flex-end',
                },
                {
                    type: 'divider',
                    position: 'end',
                },
                {
                    type: 'custom',
                    position: 'end',
                },
            ];

            const result = Navbar({
                items,
                sticky: false,
            });

            expect(result).toBeTruthy();
        });

        test('applies vertical layout and sticky mode', () => {
            const items: NavItem[] = [
                {
                    type: 'logo',
                    position: 'start',
                    keepOnMobile: true,
                },
                {
                    type: 'actions',
                    position: 'end',
                },
            ];

            const result = Navbar({
                items,
                mode: 'vertical',
                gap: 'lg',
                sticky: true,
                className: 'custom-navbar',
            });

            expect(result).toBeTruthy();
        });

        test('supports different gaps and responsive positions', () => {
            const items: NavItem[] = [
                {
                    type: 'links',
                    position: 'start',
                    align: 'center',
                    responsive: {
                        mobile: 'center',
                        desktop: 'end',
                    },
                },
            ];

            const resultSm = Navbar({
                items,
                gap: 'sm',
            });

            const resultDefaultGap = Navbar({
                items,
            });

            expect(resultSm).toBeTruthy();
            expect(resultDefaultGap).toBeTruthy();
        });

        test('handles empty items array', () => {
            const items: NavItem[] = [];

            const result = Navbar({
                items,
            });

            expect(result).toBeTruthy();
        });

        test('supports positionMap configuration', () => {
            const items: NavItem[] = [
                {
                    type: 'logo',
                    position: 'start',
                    keepOnMobile: true,
                },
                {
                    type: 'actions',
                    position: 'end',
                },
            ];

            const result = Navbar({
                items,
                positionMap: {
                    actions: 'end',
                },
            });

            expect(result).toBeTruthy();
        });

        test('renders center-start and center-end sections', () => {
            const items: NavItem[] = [
                { type: 'links', position: 'center-start' },
                { type: 'actions', position: 'center-end' },
            ];
            const result = Navbar({ items });
            expect(result).toBeTruthy();
        });

        test('handles function content and custom dividers', () => {
            const items: NavItem[] = [
                { 
                    type: 'custom', 
                    // @ts-ignore
                    content: () => ({ type: 'div', children: 'dynamic' }) 
                },
                { 
                    type: 'divider', 
                    // @ts-ignore
                    content: ({ type: 'span', children: 'custom divider' }) 
                },
            ];
            const result = Navbar({ items });
            expect(result).toBeTruthy();
        });

        test('handles complex divider configurations', () => {
            const items: NavItem[] = [
                { type: 'links', divider: true },
                { type: 'actions', divider: false },
                { type: 'custom' },
                { type: 'search' }
            ];
            
            // Test autoDivider
            Navbar({ items, autoDividerBetweenItems: true });
            
            // Test dividerOnMobile variations using divider: true on items
            // The renderDivider helper is used for dividers *between* items
            const mobileDividerItems: NavItem[] = [
                { type: 'custom', divider: true, dividerOnMobile: 'hidden', position: 'start' },
                { type: 'custom', divider: true, dividerOnMobile: 'visible', position: 'start' },
                { type: 'custom', divider: true, dividerOnMobile: 'horizontal', position: 'start' },
                { type: 'custom', divider: true, dividerOnMobile: 'vertical', position: 'start' },
                { type: 'custom', position: 'start' } // Last item to ensure dividers are rendered before it
            ];

            Navbar({ items: mobileDividerItems, mode: 'horizontal' });
            Navbar({ items: mobileDividerItems, mode: 'vertical' });
        });

        test('handles mobile toggle interactions', () => {
            const items: NavItem[] = [
                { type: 'links', position: 'end' } // Must be in 'end' to trigger toggle container
            ];
            
            const result = Navbar({ items }) as unknown as HTMLElement;
            
            // Find mobile toggle label
            const toggle = result.querySelector('label[for="navbar-mobile-toggle"]') as HTMLElement;
            if (toggle) {
                // Simulate Enter key
                const enterEvent = new (global.window as any).KeyboardEvent('keydown', {
                    key: 'Enter',
                    bubbles: true,
                    cancelable: true,
                });
                toggle.dispatchEvent(enterEvent);

                // Simulate Space key
                const spaceEvent = new (global.window as any).KeyboardEvent('keydown', {
                    key: ' ',
                    bubbles: true,
                    cancelable: true,
                });
                toggle.dispatchEvent(spaceEvent);
            } else {
                throw new Error('Mobile toggle not found');
            }

            // Find close button in drawer
            const closeBtn = result.querySelector('.navbar-mobile-drawer label[role="button"]') as HTMLElement;
            if (closeBtn) {
                 const enterEvent = new (global.window as any).KeyboardEvent('keydown', {
                    key: 'Enter',
                    bubbles: true,
                    cancelable: true,
                });
                closeBtn.dispatchEvent(enterEvent);
            } else {
                throw new Error('Close button not found');
            }
        });
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
