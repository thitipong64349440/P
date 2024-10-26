import Api from '@/services/Api'
export default {
    index(message) {
        return Api().get('messages')
    },
    shop(message) {
        return Api().get('message/shop/' + message.shopId)
    },
    person(message) {
        return Api().get('message/person/' + message.personId)
    },
    show(messageId) {
        return Api().get('message/' + messageId)
    },
    post(message) {
        return Api().post('message', message)
    },
    put(message) {
        return Api().put('message/' + message.id, message)
    },
    delete(message) {
        return Api().delete('message/' + message.id, message)
    },
}