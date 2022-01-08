declare module 'virtual:http-request' {
    import { AccountService } from '@/http/services/account.service'
    import { AdvertService } from '@/http/services/advert.service'
    import { AppService } from '@/http/services/app.service'
    import { ArticleService } from '@/http/services/article.service'
    import { AssetService } from '@/http/services/asset.service'
    import { CommentService } from '@/http/services/comment.service'
    import { GroupService } from '@/http/services/group.service'
    import { MessageService } from '@/http/services/message.service'
    import { MineService } from '@/http/services/mine.service'
    import { OperateService } from '@/http/services/operate.service'
    import { QiniuService } from '@/http/services/qiniu.service'
    import { SpaceService } from '@/http/services/space.service'
    import { TestService } from '@/http/services/test.service'

    const serviceMap = {
        AccountService,
        AdvertService,
        AppService,
        ArticleService,
        AssetService,
        CommentService,
        GroupService,
        MessageService,
        MineService,
        OperateService,
        QiniuService,
        SpaceService,
        TestService
    }

    export function useRequest<T>(
        select: (services: typeof serviceMap) => { new (): T }
    ): T
}
