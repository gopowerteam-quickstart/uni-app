import { appConfig } from '@/config/app.config'
import { interval, Observable, zip } from 'rxjs'
import { retryWhen } from 'rxjs/operators'
import { nanoid } from 'nanoid/non-secure'
import { QiniuService } from '@/http/services/qiniu.service'
// TODO: 处理多平台兼容问题
import * as qiniuWeapp from '../sdk/qiniu/qiniu-uploader'
import * as qiniuJS from 'qiniu-js'

const qiniuService = new QiniuService()

export type StorageType = 'image' | 'video'

type UploadResult = {
    url: string
    key: string
    filename: string
    filetype: string
}

type ChooseFilesResult =
    | UniApp.ChooseImageSuccessCallbackResultFile
    | UniApp.ChooseImageSuccessCallbackResultFile[]
    | File
    | File[]

type ChooseFileResult = UniApp.ChooseImageSuccessCallbackResultFile | File

interface IStorageService {
    pubObject(
        file: File | { path: string; size: number },
        options?: any
    ): Promise<any>
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
/**
 * 公共函数
 */
export class QiniuStorageService implements IStorageService {
    private readonly region!: string
    private readonly token: string
    private readonly domain: string
    private readonly uploadDomain: string

    private readonly config = {
        FileParallelLimit: 5, // 文件并发数
        ChunkParallelLimit: 8, // 同一个上传文件的分块并发数
        ChunkSize: 1024 * 1024 * 8 // 分块上传时，每块的字节数大小
    }

    constructor({ domain, region, uploadDomain }, token: string) {
        this.region = region
        this.token = token
        this.domain = domain
        this.uploadDomain = uploadDomain
    }

    /**
     * 文件上传
     * @param fileObject
     */
    public pubObject(
        file: File | { path: string; size: number },
        options: { progress: (res) => void }
    ) {
        return new Promise<any>((reslove, rejcet) => {
            const key = generateFileKey(file)

            // #ifdef MP-WEIXIN || APP-PLUS
            this.putObjectByUni(file, key, options, { reslove, rejcet })
            // #endif

            // #ifdef H5
            this.publicObjectByJSSDk(file, key, options, { reslove, rejcet })
            // #endif
        })
    }

    /**
     * 小程序文件上传
     * @param file
     * @param options
     * @param param2
     */
    putObjectByUni(file, key, options, { reslove, rejcet }) {
        qiniuWeapp.upload({
            filePath: file.path,
            success: res => {
                reslove(res)
            },
            fail: res => {
                rejcet(res)
            },
            options: {
                key,
                region: this.region as qiniuWeapp.RegionCode,
                uptoken: this.token,
                domain: this.domain
            },
            progress: (res: any) => {},
            cancelTask: () => {},
            before: () => {},
            complete: (res: any) => {}
        })
    }

    /**
     * H5 & App 文件上传
     * @param file
     * @param options
     * @param param2
     */
    publicObjectByJSSDk(file, key, options, { reslove, rejcet }) {
        qiniuJS.upload(file, key, this.token).subscribe({
            next: res => {},
            error: res => {
                rejcet(res)
            },
            complete: ({ data, meta }) => {
                reslove(
                    Object.assign({}, data, meta, {
                        url: `${this.domain}/${data.key}`
                    })
                )
            }
        })
    }
}

/**
 * 文件服务
 */
export class UploaderService {
    private readonly name: string

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
     * TODO: 添加自动分片支持
     */
    upload(files: ChooseFilesResult) {
        const storage = this.getStorage()

        const fileList = Array.isArray(files) ? files : [files]

        return new Observable<UploadResult>(subscribe => {
            if (!storage) {
                subscribe.error('未发现存储服务')
                return
            }

            if (fileList.length === 0) {
                subscribe.error('未发现待上传文件')
                return subscribe.complete()
            }

            Promise.all(
                fileList.map(async file => {
                    const result = await storage.pubObject(file)
                    subscribe.next(result)
                })
            ).finally(() => {
                subscribe.complete()
            })
        }).pipe(retryWhen(errors => errors.pipe(() => interval(1000))))
    }

    /**
     * 创建注册存储服务
     * @param name
     */
    private createStroageService(storage: StorageType) {
        const store = useStore(store => store.app)
        // 获取存储服务Token
        const getUploadTokenAction = () => {
            switch (storage) {
                case 'image':
                    return qiniuService.uptokenImg
                case 'video':
                    return qiniuService.uptokenVideo
            }
        }

        const getUploadToken = getUploadTokenAction()

        const config = {
            domain: store.basis.conf.temp_domain,
            uploadDomain: store.basis.conf.upload_domain,
            region: 'SCN'
        }

        getUploadToken().subscribe(({ data: { uptoken } }) => {
            UploaderService.storages[this.name] = new QiniuStorageService(
                { ...config },
                uptoken
            )
        })
        // 记录存储实例
    }
}
