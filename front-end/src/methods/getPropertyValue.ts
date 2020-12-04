export function getPropertyValue(el: HTMLElement, propertyValue: string) {
    return window.getComputedStyle(el).getPropertyValue(propertyValue);
}