import { describe, it, expect } from 'vitest';
import hasRequiredFields from './hasRequiredFields';

describe('hasRequiredFields', () => {
	it('should return true when object has all required fields', () => {
		const object = {
			name: 'John Doe',
			age: 30,
			email: 'john@example.com',
		};

		const requiredFields = ['name', 'age', 'email'];

		expect(hasRequiredFields(object, requiredFields)).toBe(true);
	});

	it('should return false when object is missing some required fields', () => {
		const object = {
			name: 'John Doe',
			age: 30,
		};

		const requiredFields = ['name', 'age', 'email'];

		expect(hasRequiredFields(object, requiredFields)).toBe(false);
	});

	it('should return false when object has no required fields', () => {
		const object = {
			name: 'John Doe',
			age: 30,
		};

		const requiredFields = ['email'];

		expect(hasRequiredFields(object, requiredFields)).toBe(false);
	});

	it('should return false when object is empty', () => {
		const object = {};

		const requiredFields = ['name', 'age', 'email'];

		expect(hasRequiredFields(object, requiredFields)).toBe(false);
	});

	it('should return true when required fields are empty', () => {
		const object = {
			name: 'John Doe',
			age: 30,
			email: 'john@example.com',
		};

		const requiredFields: string[] = [];

		expect(hasRequiredFields(object, requiredFields)).toBe(true);
	});
});
