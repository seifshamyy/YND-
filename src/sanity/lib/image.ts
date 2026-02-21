import urlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const imageBuilder = urlBuilder({
    projectId: projectId || '',
    dataset: dataset || '',
})

export const urlForImage = (source: any) => {
    return imageBuilder?.image(source)
}
