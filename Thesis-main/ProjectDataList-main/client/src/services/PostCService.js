import Api from '@/services/Api'
export default {
    index(postC) {
        return Api().get('postCs')
    },
    show(postCId) {
        return Api().get('postC/' + postCId)
    },
    post(postC) {
        return Api().post('postC', postC)
    },
    put(postC) {
        return Api().put('postC/' + postC.id, postC)
    },
    delete(postC) {
        return Api().delete('postC/' + postC.id, postC)
    },
}