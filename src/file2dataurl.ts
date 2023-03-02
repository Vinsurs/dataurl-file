/**
 * Convert a blob object to dataUrl string
 * @param file blob instance
 * @returns dataUrl string
 */
export function file2dataurl(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onerror = reject
        fr.onload = function() {
            resolve(fr.result as string)
        }
        fr.readAsDataURL(file)
    })
}