export function getImageData(image: HTMLImageElement) {
  const canvas = new OffscreenCanvas(image.width, image.height)
  const ctx = (canvas.getContext("2d") as any) as CanvasRenderingContext2D

  ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, image.width, image.height)
}