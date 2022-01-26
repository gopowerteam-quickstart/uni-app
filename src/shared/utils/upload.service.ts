import { nanoid } from 'nanoid/non-secure'
import { appConfig } from '@/config/app.config'

export type StorageType = 'image' | 'video'

export type ChooseFilesResult =
    | UniApp.ChooseImageSuccessCallbackResultFile
    | UniApp.ChooseImageSuccessCallbackResultFile[]
    | File
    | File[]

type ChooseFileResult = UniApp.ChooseImageSuccessCallbackResultFile | File

interface IStorageService {
    putObject(uploadTask: UploadTask): void
}

function generateFileKey(fileObject: ChooseFileResult) {
    const key = nanoid()

    if ('name' in fileObject && 'type' in fileObject) {
        // 保存文件中后缀信息
        const [suffix, ..._] = fileObject.name.split('.').reverse()
        return `${key}${_ && _.length && '.' + suffix}`
    } else {
        return key
    }
}

export class UploadTask {
    private readonly abortListeners: ((key: string) => void)[] = []
    private readonly completeListeners: ((key: string) => void)[] = []

    public key: string
    public url: string
    public file: File | { path: string; size: number }
    public path: string
    public progress = ref(0)
    public completed = ref(false)
    public totalBytesSent = ref(0)
    public totalBytesExpectedToSend = ref(0)
    public meta: any

    public get localUrl() {
        return this.path ?? URL.createObjectURL(this.file as File)
    }

    constructor(
        key: string,
        file: File | UniApp.ChooseImageSuccessCallbackResultFile
    ) {
        this.key = key
        this.file = file
        this.path = file['path']
    }

    public updateProgress({
        progress,
        totalBytesSent,
        totalBytesExpectedToSend
    }) {
        this.progress.value = progress
        this.totalBytesSent.value = totalBytesSent
        this.totalBytesExpectedToSend.value = totalBytesExpectedToSend
    }

    public onAbort(callback: (key: string) => void) {
        this.abortListeners.push(callback)
        return this
    }

    public onComplete(callback: (key: string) => void) {
        this.completeListeners.push(callback)
        return this
    }

    public abort() {
        this.abortListeners.forEach(callback => callback(this.key))
    }

    public done(url: string, meta?) {
        this.url = url
        this.meta = meta
        this.completed.value = true
        this.completeListeners.forEach(callback => callback(this.key))
    }
}

/**
 * 公共函数
 */
export class QiniuStorageService implements IStorageService {
    private store = useStore(store => store.app)

    private readonly name: string
    private token: string

    // TODO: 修正域名操作
    private readonly domain: string = this.store.basis.conf.temp_domain
    private readonly uploadUrl: string = this.store.basis.conf.upload_domain

    constructor(name) {
        this.name = name
        this.requestToken()
    }

    private requestToken() {
        // TODO: 获取七牛上传Token
    }

    /**
     * 文件上传
     * @param fileObject
     */
    public putObject(uploadTask: UploadTask) {
        const logger = useLogger()

        uni.uploadFile({
            url: this.uploadUrl,
            name: 'file',
            // #ifdef H5
            file: uploadTask.file as File,
            // #endif
            // #ifdef MP-WEIXIN || APP-PLUS
            filePath: uploadTask.path,
            // #endif
            formData: {
                token: this.token,
                key: uploadTask.key
            },
            success: ({ data }) => {
                const result = JSON.parse(data)
                const error = result?.error

                if (!error) {
                    uploadTask.done(`${this.domain}/${uploadTask.key}`, result)
                } else {
                    logger.error('上传失败', error)
                    uploadTask.abort()
                }
            },
            fail: error => {
                logger.error('上传失败', error)
            }
        }).onProgressUpdate(res => uploadTask.updateProgress(res))
    }
}

/**
 * 文件服务
 */
export class UploaderService {
    private readonly name: StorageType

    private static storages: {
        [key: string]: IStorageService
    } = {}

    private getStorage() {
        return UploaderService.storages[this.name]
    }

    constructor(name: StorageType) {
        this.name = name

        if (!UploaderService.storages[name]) {
            this.createStroageService(name)
        }
    }

    /**
     * 上传文件
     */
    upload(files: ChooseFilesResult) {
        const logger = useLogger()
        const storage = this.getStorage()

        // 进行数组统一处理
        const fileList = Array.isArray(files) ? files : [files]

        // 检测存储服务状态
        if (!storage) {
            logger.error('未发现存储服务')
            return []
        }

        // 检查待上传文件列表
        if (fileList.length === 0) {
            logger.error('未发现待上传文件')
            return []
        }

        // 生成上传任务
        return fileList.map(file => {
            // 创建上传文件Key
            const key = generateFileKey(file)
            // 创建上传任务
            const task = new UploadTask(key, file)
            // 上传操作
            storage.putObject(task)

            return task
        })
    }

    /**
     * 创建注册存储服务
     * @param name
     */
    private createStroageService(name: string) {
        // 使用七牛作为存储服务
        UploaderService.storages[name] = new QiniuStorageService(name)
    }
}
