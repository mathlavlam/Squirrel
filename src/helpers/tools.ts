export function toCurrency(x: number, language: string = 'en'): string {
	return x.toLocaleString(`${ language }-CA`, { style: 'currency', currency: 'CAD' });
}

export function pluralize(count: number, singular: string, plural: string): string {
	return count <= 1 ? singular : plural;
}

export function generateRdmString({length = 8, chars = 'ABCDEFabcdef0123456789'} = {}): string {
	let out: string = '';

	for (let i: number = 0; i < length; i++) {
		let rdm = ~~(Math.random() * chars.length);
		out += chars.charAt(rdm);
	}

	return out;
}