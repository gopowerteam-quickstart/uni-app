import { StorageType, UploaderService } from '../utils/upload.service'

export const useUploader = (name: StorageType) =>
    useInstance(UploaderService, name)
