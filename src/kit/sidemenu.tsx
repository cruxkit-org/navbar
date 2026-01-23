// src/kit/sidemenu.tsx
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement } from '@minejs/jsx';
    import { Container } from '@cruxkit/container';
    import type { SidemenuConfig } from '../types';
import { Overlay } from '@cruxkit/overlay';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    function resolveWidth(width?: SidemenuConfig['width']): string {
        if (!width || width === 'md') return 'w-64';
        if (width === 'sm') return 'w-48';
        if (width === 'lg') return 'w-80';
        if (width === 'xl') return 'w-96';
        if (width === 'full') return 'w-full';
        if (typeof width === 'number') return `w-[${width}px]`;
        return width;
    }

    function getTranslateClass(position: SidemenuConfig['position']): string {
        if (typeof document === 'undefined') return 'translate-x-full';
        
        const dir = document.documentElement.getAttribute('dir');
        const isRTL = dir === 'rtl';
        const isStart = position === 'start';
        
        if (isStart) {
            return isRTL ? 'translate-x-full' : '-translate-x-full';
        } else {
            return isRTL ? '-translate-x-full' : 'translate-x-full';
        }
    }

    function getDurationClass(duration?: number): string {
        const ms = duration || 300;
        if (ms <= 100) return 'duration-75';
        if (ms <= 150) return 'duration-150';
        if (ms <= 200) return 'duration-200';
        if (ms <= 300) return 'duration-300';
        if (ms <= 500) return 'duration-500';
        return 'duration-700';
    }

    export interface SidemenuProps extends SidemenuConfig {
        open?                       : boolean;
    }

    /**
     * Renders a responsive, animated sidemenu drawer.
     *
     * @param props.id - Unique identifier for the sidemenu toggle checkbox.
     * @param props.position - Sidemenu position: 'start' or 'end'.
     * @param props.width - Sidemenu width preset ('sm'|'md'|'lg'|'xl'|'full'), pixel number, or arbitrary CSS class.
     * @param props.backdrop - Whether to render a semi-transparent backdrop.
     * @param props.closeOnBackdrop - Whether clicking the backdrop closes the sidemenu.
     * @param props.closeOnEscape - Whether pressing Escape closes the sidemenu.
     * @param props.zIndex - Z-index for the sidemenu container.
     * @param props.transition - Animation type: 'slide' or 'fade'.
     * @param props.duration - Transition duration in milliseconds.
     * @param props.component - Sidemenu content (JSX or function returning JSX).
     * @param props.className - Additional CSS classes.
     * @param props.open - Controlled open state (checked state of the internal checkbox).
     * @returns A complete sidemenu component with optional backdrop, keyboard, and click-outside behaviors.
     */
    export function Sidemenu(props: SidemenuProps): JSXElement {
        const position = props.position || 'start';
        const width = resolveWidth(props.width);
        const backdrop = props.backdrop ?? true;
        const closeOnBackdrop = props.closeOnBackdrop ?? true;
        const closeOnEscape = props.closeOnEscape ?? true;
        const zIndex = props.zIndex || 50;
        const transition = props.transition || 'slide';
        const durationClass = getDurationClass(props.duration);
        
        const translateClass = getTranslateClass(position);
        const positionClass = position === 'start' ? 'start-0' : 'end-0';
        const borderClass = position === 'start' ? 'border-e' : 'border-s';

        const content = typeof props.component === 'function' 
            ? props.component() 
            : props.component;

        return (
            <>
                {/* Hidden checkbox */}
                <input
                    id={props.id}
                    type="checkbox"
                    className="peer sr-only"
                    aria-label="Toggle sidemenu"
                    checked={props.open}
                />

                {/* Backdrop */}
                {backdrop && (
                    <Overlay
                        htmlFor={closeOnBackdrop ? props.id : undefined}
                        backdrop={true}
                        zIndex={zIndex - 1}
                        className={`
                            fixed
                            hidden
                            peer-checked:block
                            transition-opacity
                            ${durationClass}
                        `}
                        aria-hidden="true"
                        onClick={closeOnBackdrop ? undefined : (e: MouseEvent) => e.preventDefault()}
                    />
                )}

                {/* Sidemenu */}
                <Container
                    display="flex"
                    direction="column"
                    className={`
                        sidemenu-drawer
                        fixed
                        inset-y-0
                        ${positionClass}
                        ${width}
                        max-w-full
                        bg-surface
                        ${borderClass}
                        border-1
                        shadow-lg
                        ${transition === 'slide' ? translateClass : 'opacity-0'}
                        ${transition === 'slide' ? 'transition-transform' : 'transition-opacity'}
                        ${durationClass}
                        ease-out
                        ${transition === 'slide' ? 'peer-checked:translate-x-0' : 'peer-checked:opacity-100'}
                        ${props.className || ''}
                        z-${zIndex}
                    `}
                    onKeyDown={closeOnEscape ? (e: KeyboardEvent) => {
                        if (e.key === 'Escape') {
                            const checkbox = document.getElementById(props.id) as HTMLInputElement;
                            if (checkbox) checkbox.checked = false;
                        }
                    } : undefined}
                    data-tabIndex={closeOnEscape ? 0 : undefined}
                >
                    {content}
                </Container>
            </>
        );
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝