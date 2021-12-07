import { RequestParams } from '@/http/core'
import { lastValueFrom } from 'rxjs'

const wechatApiList = [
    'chooseImage',
    'agentConfig',
    'shareToExternalMoments'
] as const

export class WechatService {
    private static sites: string[] = []

    private wechatConfig(config) {
        return new Promise<void>((resolve, reject) => {
            wx.ready(resolve)
            wx.error(reject)

            wx.config({
                beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                ...config,
                jsApiList: wechatApiList // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
            })
        })
    }

    private async configSite() {
        const url = location.href

        if (WechatService.sites.includes(url)) {
            return Promise.resolve()
        }

        // TODO: 获取JSSDK配置信息
        const config = {}
        // const { config, agentConfig } = await lastValueFrom(
        //     this.appService.jsConfig(
        //         new RequestParams({
        //             data: { url },
        //             append: { app: 'material' }
        //         })
        //     )
        // )

        await this.wechatConfig(config)

        WechatService.sites.push(url)
    }

    /**
     * 检测API
     */
    private async checkJsApi(api) {
        return new Promise<void>((resolve, reject) => {
            wx.checkJsApi({
                jsApiList: [api], // 需要检测的JS接口列表
                success: ({ checkResult }) => {
                    if (!checkResult[api]) {
                        return reject('API 无法调用')
                    }

                    resolve()
                },
                fail: () => {
                    reject('checkJsApi失败')
                }
            })
        })
    }

    /**
     * 执行api
     * @param api
     * @param config
     * @returns
     */
    private async invoke(api: typeof wechatApiList[number], config) {
        // 配置检查
        await this.configSite()
        // api检查
        await this.checkJsApi(api)

        return new Promise((resolve, reject) => {
            wx.invoke(api, config, res => {
                resolve(res)
            })
        })
    }

    public shareToExternalMoments(config: any) {
        return this.invoke('shareToExternalMoments', config)
    }
}
