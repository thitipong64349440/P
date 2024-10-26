import Api from '@/services/Api'
export default {
    index(shop) {
        return Api().get('shops')
    },
    show(shopId) {
        return Api().get('shop/' + shopId)
    },
    post(shop) {
        return Api().post('shop', shop)
    },
    put(shop) {
        return Api().put('shop/' + shop.id, shop)
    },
    delete(shop) {
        return Api().delete('shop/' + shop.id, shop)
    },
}