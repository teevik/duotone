export function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.onerror = error => reject(error)
    image.onabort = error => reject(error)
    image.onload = () => resolve(image)

    image.src = src
  })
}
