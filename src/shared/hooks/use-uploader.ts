import { appConfig } from '@/config/app.config'
import { UploaderService } from '../utils/upload.service'

export const useUploader = (name: keyof typeof appConfig.storage) =>
    useInstance(UploaderService, name)
