export const dynamicGetImg = (name) => {
    try {
        return new URL(`../assets/img/${name}`, import.meta.url).href
    } catch (error) {
        console.log(error)
    }
}