export function isDataUrl(actual: string): boolean {
    return isDataUrl.DATAURL_REG.test(actual)
}
isDataUrl.DATAURL_REG = /^data:(.*?);base64,([^'"]+)$/;