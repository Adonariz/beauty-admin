import { useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	wrapperId?: string;
}

/**
 * Функция создания обертки и добавления в body
 */
function createWrapperAndAppendToBody(wrapperId: string) {
	const wrapperEllement = document.createElement('div');

	wrapperEllement.setAttribute('id', wrapperId);
	document.body.append(wrapperEllement);

	return wrapperEllement;
}

/**
 * Компонент портала для модальных окон
 */
function Portal({ children, wrapperId = 'portal-wrapper' }: PortalProps) {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		let created = false;

		if (!element) {
			created = true;
			element = createWrapperAndAppendToBody(wrapperId);
		}

		setWrapperElement(element);

		return () => {
			if (created) {
				element?.remove();
			}
		};
	}, [wrapperId]);

	if (wrapperElement === null) {
		return null;
	}

	return createPortal(children, wrapperElement);
}

export default Portal;
