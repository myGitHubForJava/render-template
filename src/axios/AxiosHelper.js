import BaseAxiosHelper from 'vue-human/utils/AxiosHelper'
import env from '../env'
import router from '../router'

export default class AxiosHelper extends BaseAxiosHelper {
  config () {
    return {
      baseURL: env.get('API'),
      headers: {
        Accept: 'application/json'
      }
    }
  }

  error401 (error) {
    super.$error401(error)
    router.push({ name: 'sign-in' })
  }

  error404 (error) {
    super.$error404(error)
  }
}
