import { RGBColor } from "react-color"
// @ts-ignore
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any

function grayscaleImage(imageData: ImageData) {
  const { data } = imageData

  let maxValue = 0
  let minValue = 255

  for (let i = 0; i < data.length; i += 4) {
    // Fetch maximum and minimum pixel values
    if (data[i] > maxValue) {
      maxValue = data[i]
    }

    if (data[i] < minValue) {
      minValue = data[i]
    }
    // Grayscale by averaging RGB values
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const value = 0.3333 * r + 0.3333 * g + 0.3333 * b
    data[i] = data[i + 1] = data[i + 2] = value
  }

  for (let i = 0; i < data.length; i += 4) {
    // Normalize each pixel to scale 0-255
    const value = ((data[i] - minValue) * 255) / (maxValue - minValue)
    data[i] = data[i + 1] = data[i + 2] = value
  }

  return imageData
}

function gradientMap(shadowColor: RGBColor, highlightColor: RGBColor) {
  const gradient: number[] = []

  for (let i = 0; i < 256 * 4; i += 4) {
    gradient[i] = ((256 - i / 4) * shadowColor.r + (i / 4) * highlightColor.r) / 256
    gradient[i + 1] = ((256 - i / 4) * shadowColor.g + (i / 4) * highlightColor.g) / 256
    gradient[i + 2] = ((256 - i / 4) * shadowColor.b + (i / 4) * highlightColor.b) / 256
    gradient[i + 3] = 255
  }

  return gradient
}

function createDuotoneImage(
  imageData: ImageData,
  shadowColor: RGBColor,
  highlightColor: RGBColor
) {
  const duotoneImageData = grayscaleImage(imageData)
  const gradient = gradientMap(shadowColor, highlightColor)
  const { data } = duotoneImageData

  for (var i = 0; i < data.length; i += 4) {
    data[i] = gradient[data[i] * 4]
    data[i + 1] = gradient[data[i + 1] * 4 + 1]
    data[i + 2] = gradient[data[i + 2] * 4 + 2]
  }

  return duotoneImageData
}

let canvas: HTMLCanvasElement | undefined = undefined

const handlers: Record<string, (data: any) => any> = {
  initialize: data => {
    canvas = data.canvas
  },

  drawDuotoneImage: data => {
    const { imageData, shadowColor, highlightColor } = data
    const duotoneImageData = createDuotoneImage(imageData, shadowColor, highlightColor)
    const ctx = (canvas as HTMLCanvasElement).getContext("2d")!
    ctx.putImageData(duotoneImageData, 0, 0)
  }
}

ctx.addEventListener("message", event => {
  handlers[event.data.type](event.data)
})
