import { useState, useCallback } from 'react';

type HTTPRequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface HTTPRequestHeaders {
	[key: string]: string;
}

interface RequestConfig {
	url: string;
	method?: HTTPRequestMethods;
	body?: string | null;
	headers?: HTTPRequestHeaders;
}

export const useHttp = () => {
	const [loadingStatus, setLoadingStatus] = useState<string>('idle');

	const request = useCallback(async ({ url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' } }: RequestConfig) => {
		setLoadingStatus('loading');

		try {
			const response = await fetch(url, { method, body, headers });

			if (!response.ok) {
				throw new Error(`Cloud not fetch ${url}, status: ${response.status}`);
			}

			const data = await response.json();

			setLoadingStatus('idle');

			return data;
		} catch (error) {
			setLoadingStatus('error');
			throw error;
		}
	}, []);

	return { loadingStatus, request };
};
