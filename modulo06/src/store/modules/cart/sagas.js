import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmount } from './actions';

// select => Buscar informações dentro do estado
// put = para disparar uma action
/* * = generators, async/await quando convertidos ficam neste formato, vamos utilizar
dessa forma pois é mais potente, conseguimos fazer mais coisas com ele do que
async e await */
function* addToCart({ id }) {
  // Responsável em acessar a API e obter informações mais especializadas
  // yield = como se fosse o await
  // call para poder fazer a chamada, precisa ser assim!
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quatidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormated: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

/*
all => cadastrar varios listeners que vai ficar ouvindo quando
        a action for disparada para disparar essa ação.
takeLatest => Caso usuário clicar mais de uma vez antes do saga terminar a primeira
        requisição, ele vai ouvir somente a última */
export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
