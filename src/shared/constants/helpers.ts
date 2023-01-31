export function copy<T>(object: T): T {
	return JSON.parse(JSON.stringify(object))
}

export const capitalize = (string: string): string => {
	return string[0].toUpperCase() + string.slice(1, string.length - 1)
}
