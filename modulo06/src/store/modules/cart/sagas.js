import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

// put = para disparar uma action
/* * = generators, async/await quando convertidos ficam neste formato, vamos utilizar
dessa forma pois é mais potente, conseguimos fazer mais coisas com ele do que
async e await */
function* addToCart({ id }) {
  // Responsável em acessar a API e obter informações mais especializadas
  // yield = como se fosse o await
  // call para poder fazer a chamada, precisa ser assim!
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

/*
all => cadastrar varios listeners que vai ficar ouvindo quando
        a action for disparada para disparar essa ação.
takeLatest => Caso usuário clicar mais de uma vez antes do saga terminar a primeira
        requisição, ele vai ouvir somente a última */
export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
