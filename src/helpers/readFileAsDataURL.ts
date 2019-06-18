export function readFileAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = error => reject(error)
    reader.onabort = error => reject(error)
    reader.onload = () => resolve(reader.result as string)

    reader.readAsDataURL(file)
  })
}
