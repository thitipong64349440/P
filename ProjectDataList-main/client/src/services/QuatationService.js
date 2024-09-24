import Api from '@/services/Api'
export default {
    index(quatation) {
        return Api().get('quatations')
    },
    show(quatationId) {
        return Api().get('quatation/' + quatationId)
    },
    post(quatation) {
        return Api().post('quatation', quatation)
    },
    put(quatation) {
        return Api().put('quatation/' + quatation.id, quatation)
    },
    delete(quatation) {
        return Api().delete('quatation/' + quatation.id, quatation)
    },
}