declare interface Window {
    /**
     * Available only in secure contexts.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker)
     */
    showOpenFilePicker: (
        options: ShowOpenFilePickerOptions,
    ) => Promise<Array<FileSystemFileHandle>>
}
interface ShowOpenFilePickerOptions {
    /** @default `false` */
    excludeAcceptAllOption?: boolean
    id?: number | string
    /** @default `false` */
    multiple?: boolean
    startIn?:
    | 'desktop'
    | 'documents'
    | 'downloads'
    | 'music'
    | 'pictures'
    | 'videos'
    | FileSystemHandle
    types?: Array<{
        accept?: {
            [mimeType: string]: Array<string>
        }
        description?: string
    }>
}