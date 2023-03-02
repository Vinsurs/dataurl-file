/**
 * Convert dataUrl to a file
 * @param dataurl a string indicates dataUrl resource
 * @param filename file name to be set to converted file, default `file`
 * @returns file instance
 */
export function dataurl2file(dataurl: string, filename = "file"): File {
    const reg = /^data:(.*?);base64,([^'"]+)$/;
    const match = dataurl.match(reg)
    if (!match) {
        throw new TypeError(`the parameter 'dataurl' should be a dataurl`)
    }
    const mime = match[1]
    const base64 = match[2]
    const bin = atob(base64)
    const ab = new ArrayBuffer(bin.length)
    const abView = new Uint8Array(ab)
    for (let i = 0; i < bin.length; i++) {
        abView[i] = bin.charCodeAt(i)
    }
    return new File([ab], filename + '.' + mime.split('/')[1], { type: mime })
}