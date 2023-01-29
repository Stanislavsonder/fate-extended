import { onBeforeUnmount } from 'vue'

const update = (event: Event) => {
	const element = event.target as HTMLTextAreaElement
	element.style.height = '5px'
	element.style.height = element.scrollHeight + 'px'
}

const autoUpdateHeight = (element: HTMLTextAreaElement) => {
	element.style.height = element.scrollHeight + 'px'
	element.addEventListener('input', update)

	onBeforeUnmount(() => {
		element.removeEventListener('input', update)
	})
}

export const useAutoHeight = () => {
	return {
		autoUpdateHeight,
	}
}
