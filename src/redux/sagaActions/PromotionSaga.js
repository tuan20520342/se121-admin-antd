import { call, put, takeLatest } from 'redux-saga/effects';
import { promotionActions } from '../reducer/PromotionReducer';
import { PromotionService } from '~/services/api/PromotionAPI';
import { modalActions } from '../reducer/ModalReducer';
import AlertCustom from '~/components/UI/Notification/Alert';
import * as SagaActionTypes from '~/redux/constants';

function* actGetPromos() {
  try {
    yield put(promotionActions.getPromosLoading());

    const res = yield call(() => PromotionService.getPromotionsList());
    const { status, data } = res;
    if (status === 200) {
      yield put(promotionActions.getPromosSuccess({ promos: data.promotions }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actCreatePromo(action) {
  try {
    const { newPromo } = action;

    const res = yield call(() => PromotionService.createPromotion(newPromo));
    const { status, data } = res;
    console.log(res);
    if (status === 201) {
      AlertCustom({ type: 'success', title: data.message });
      yield put(modalActions.hideModal());
      yield put({ type: SagaActionTypes.GET_PROMOS_SAGA });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actUpdatePromo(action) {
  try {
    const { editPromo } = action;

    const res = yield call(() => PromotionService.updatePromotion(editPromo));
    const { status, data } = res;
    if (status === 200) {
      AlertCustom({ type: 'success', title: data.message });
      yield put(modalActions.hideModal());
      yield put({ type: SagaActionTypes.GET_PROMOS_SAGA });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actRemovePromo(action) {
  try {
    const { promoId } = action;
    const res = yield call(() => PromotionService.deletePromotionById(promoId));
    const { status, data } = res;

    if (status === 200) {
      yield put(modalActions.hideModal());
      AlertCustom({ type: 'success', title: data.message });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  } finally {
    yield put({ type: SagaActionTypes.GET_PROMOS_SAGA });
  }
}

export function* followActGetPromos() {
  yield takeLatest(SagaActionTypes.GET_PROMOS_SAGA, actGetPromos);
}

export function* followActCreatePromo() {
  yield takeLatest(SagaActionTypes.CREATE_PROMO_SAGA, actCreatePromo);
}

export function* followActRemovePromo() {
  yield takeLatest(SagaActionTypes.DELETE_PROMO_SAGA, actRemovePromo);
}

export function* followActUpdatePromo() {
  yield takeLatest(SagaActionTypes.UPDATE_PROMO_SAGA, actUpdatePromo);
}
