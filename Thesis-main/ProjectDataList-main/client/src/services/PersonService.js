import Api from '@/services/Api'
export default {
    index(person) {
        return Api().get('persons')
    },
    show(personId) {
        return Api().get('person/' + personId)
    },
    post(person) {
        return Api().post('person', person)
    },
    put(person) {
        return Api().put('person/' + person.id, person)
    },
    delete(person) {
        return Api().delete('person/' + person.id, person)
    },
}