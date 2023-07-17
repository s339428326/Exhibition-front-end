import req from '@/utils/api.js'

export const getExhibitionData = () => {
    return req('get', '/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
}
