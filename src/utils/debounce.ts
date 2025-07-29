export function debounce(func: Function, delay = 300) {
    let timer: number
    return (...args: any[]) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}
