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
    type: keyof typeof triggerFilePresets,
    multiple?: boolean,
    fallback?: boolean
  ) {
    return new Promise<File[]>((resolve, reject) => {
      if (typeof window.showOpenFilePicker === 'function') {
        window
          .showOpenFilePicker({
            types: [triggerFilePresets[type]],
            multiple,
          })
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
        el.accept = Object.keys(triggerFilePresets[type].accept).join(',')
        el.multiple = multiple ?? false
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