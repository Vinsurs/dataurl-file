/// <reference path="../global.d.ts" />
const triggerFilePresets = {
    json: {
      accept: {
        'application/json': ['.json', '.json5'],
      },
      description: 'Json',
    },
    image: {
      accept: {
        'image/*': ['.png', '.gif', '.webp', '.jpeg', '.jpg'],
      },
      description: 'Image',
    },
    video: {
      accept: {
        'video/*': ['.mp4', '.webm', '.ogg'],
      },
      description: 'Video',
    },
  }
  export function triggerFile(
    type: keyof typeof triggerFilePresets | null,
    multipleOrOpts?: boolean | ShowOpenFilePickerOptions,
    fallback?: boolean
  ) {
    return new Promise<File[]>((resolve, reject) => {
      const opts: ShowOpenFilePickerOptions = {}
      if (type && triggerFilePresets[type]) {
        opts.types = [triggerFilePresets[type]]
      }
      if (typeof multipleOrOpts === 'boolean') {
        opts.multiple = multipleOrOpts
      } else if (typeof multipleOrOpts === 'object') {
        Object.assign(opts, multipleOrOpts)
      }
      if (typeof window.showOpenFilePicker === 'function') {
        window
          .showOpenFilePicker(opts)
          .then(async (fileHandles) => {
            const files: File[] = []
            for (const fileHandle of fileHandles) {
              files.push(await fileHandle.getFile())
            }
            resolve(files)
          })
          .catch(reject)
      }
      else if (fallback) {
        const el = document.createElement('input')
        el.type = 'file'
        el.hidden = true
        if ((opts.types && opts.types.length > 0)) {
          el.accept =  Array.from(opts.types.reduce((prev, next) => {
            if (next.accept) {
              Object.keys(next.accept).forEach(mime => {
                prev.add(mime)
              })
            }
            return prev
          }, new Set<string>())).join(', ')
        }
        el.multiple = opts.multiple ?? false
        attach()
        if ('showPicker' in HTMLInputElement.prototype) {
            el.showPicker()
        } else {
            el.click()
        }
        function receiveFile() {
            resolve(Array.from(el.files??[]))
            detach()
        }
        function cancelFile() {
            detach()
            const message = 'Cancelled'
            reject(new Error(message))
        }
        function attach() {
            el.addEventListener('change', receiveFile)
            el.addEventListener('cancel', cancelFile)
            document.body.appendChild(el)
        }
        function detach() {
            el.removeEventListener('change', receiveFile)
            el.removeEventListener('cancel', cancelFile)
            document.body.removeChild(el)
        }
      } else {
        const message = 'Not Supported'
        reject(new Error(message))
      }
    })
  }
  
  export function sizeLimit(fileSize: number, limit: number) {
    return fileSize / 1024 / 1024 < limit
  }