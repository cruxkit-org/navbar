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
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
