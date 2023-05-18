import { all } from 'redux-saga/effects';
import * as CategorySaga from './sagaActions/CategorySaga';
import * as StaffSaga from './sagaActions/StaffSaga';
import * as ProductSaga from './sagaActions/ProductSaga';
import * as AuthSaga from './sagaActions/AuthSaga';

export default function* rootSaga() {
  yield all([
    //Category
    CategorySaga.followActGetListCategories(),
    //Staff
    StaffSaga.followActPostStaff(),
    StaffSaga.followActGetListStaffs(),
    StaffSaga.followActDeleteStaff(),
    StaffSaga.followActGetStaffById(),
    StaffSaga.followActPutStaff(),
    //Product
    ProductSaga.followActGetListProducts(),
    ProductSaga.followActGetProductById(),
    AuthSaga.followActLogin(),
  ]);
}
