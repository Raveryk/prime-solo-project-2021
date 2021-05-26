import axios from 'axios';
import { put } from 'redux-saga/effects';



import { takeLatest } from 'redux-saga/effects';

function* getBrowser() {
    try {
        const response = yield axios.get('/api/browse');
        console.log('Got from server for browser:', response.data)
        yield put({ type: 'SET_BROWSER', payload: response.data })
    } catch (error) {
        console.log('GET Browser request failed in saga:', error)
    }
}

function* getDetails(action) {
    try{
        const response = yield axios.get(`/api/browse/detail/${action.payload}`);
        console.log('Get all details:', response.data);
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log('GET details request failed in saga:', error)
    }
}

function* browserSaga() {
    yield takeLatest('FETCH_BROWSER', getBrowser);
    yield takeLatest('FETCH_DETAILS', getDetails);
}

export default browserSaga;