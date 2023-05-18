import PageContainer from '@/shared/components/page-container/page-container.vue'
import MediaGallery from '@/shared/components/media-gallery.vue'
import UploadProgress from '@/shared/components/upload-progress.vue'
import SvgIcon from '@/shared/components/svg-icon.vue'
import ImagePreview from '@/shared/components/image-preview.vue'
import SafeAreaBottom from '@/shared/components/safe-area-bottom.vue'

declare module 'vue' {
    export interface GlobalComponents {
        PageContainer: typeof PageContainer
        MediaGallery: typeof MediaGallery
        UploadProgress: typeof UploadProgress
        SvgIcon: typeof SvgIcon
        ImagePreview: typeof ImagePreview
        SafeAreaBottom: typeof SafeAreaBottom
    }
}
