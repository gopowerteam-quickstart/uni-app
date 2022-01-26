import PageContainer from '@/shared/components/page-container/page-container.vue'
import UploadGallery from '@/shared/components/upload-gallery.vue'
import UploadProgress from '@/shared/components/upload-progress.vue'
import SvgIcon from '@/shared/components/svg-icon.vue'

declare module 'vue' {
    export interface GlobalComponents {
        PageContainer: typeof PageContainer
        UploadGallery: typeof UploadGallery
        UploadProgress: typeof UploadProgress
        SvgIcon: typeof SvgIcon
    }
}
