import { ResultModel } from '~/lib/common/dto/response/ResultModel';
import { ResponseModel } from '~/lib/common/dto/response/ResponseModel';
import { isSuccess } from '~/lib/common/dto/response/ErrorModel';
import { TableHeaderType } from '~/lib/common/dto/table/TableHeaderType';
import { getMypageCancelDetail } from '../useCases/getMypageCancelDetail';
import { getMypageCancelInfo } from '../useCases/getMypageCancelInfo';
import { useCodeStore } from '~/lib/common/stores/codes/useCodeStore';
import { LabelValueType } from '~/lib/common/dto/codes/LabelValueType';
import { CancelListInfoDetailType } from '../dto/CancelListInfoDetailType';
import { CancelListInfoType } from '../dto/CancelListInfoType';

/**
 * 스토어 정의 - 마이페이지 > 주문내역 상세
 */
export const useMypageCancelInfoStore = defineStore('useMypageCancelInfoStore', () => {


  /* #region 공용 코드 api 호출 */
  const codeStore = useCodeStore();
  const {
    getOrdDtlStatus, //  주문 상세 내용 상태
    getPayType, //  결제 수단
  } = codeStore;
  const codeOptions = {
    orderDtlStatus: [] as LabelValueType[],
    payType: [] as LabelValueType[],
  };
  const setCodeOptions = async () => {
    codeOptions.orderDtlStatus = await getOrdDtlStatus();
    codeOptions.payType = await getPayType();
  };
  /* #endregion */



  /* #region 취소 내역(제품) 상세 내역 api 호출  */
  const cancelDetailState: Ref<ResponseModel<ResultModel<CancelListInfoDetailType[]>>> = ref({
    loading: false,
    success: false,
    result: {
      error: null,
      resultCode: null,
      data: null,
      message: '',
    },
  });

  const setCancelDetailState = async (): Promise<void> => {
    cancelDetailState.value.success = false;
    cancelDetailState.value.loading = true;

    const route = await useRoute();
    const { id: ordId } = route.params;
    const { error, resultCode, data, message } = await getMypageCancelDetail(ordId);

    cancelDetailState.value.result.error = error;
    cancelDetailState.value.result.resultCode = resultCode;
    cancelDetailState.value.result.data = data;
    cancelDetailState.value.result.message = message;
    cancelDetailState.value.success = isSuccess(error);
    cancelDetailState.value.loading = false;
  };
  /* #endregion */






  /* #region 취소 내역(신청 정보) 상세 api 호출  */
  const cancelInfoState: Ref<ResponseModel<ResultModel<CancelListInfoType>>> = ref({
    loading: false,
    success: false,
    result: {
      error: null,
      resultCode: null,
      data: null,
      message: '',
    },
  });
  const setCancelInfoState = async (): Promise<void> => {
    cancelInfoState.value.success = false;
    cancelInfoState.value.loading = true;

    const route = await useRoute();
    const { id: ordId } = route.params;
    const { error, resultCode, data, message } = await getMypageCancelInfo(ordId);

    cancelInfoState.value.result.error = error;
    cancelInfoState.value.result.resultCode = resultCode;
    cancelInfoState.value.result.data = data;
    cancelInfoState.value.result.message = message;
    cancelInfoState.value.success = isSuccess(error);
    cancelInfoState.value.loading = false;
  };
  /* #endregion */




  /* #region 취소 내역(제품) 테이블 */
  interface ordProdList {
    prodName: string;
    orgLicense: string;
    licenseStartdate: string;
    licenseEnddate: string;
    buyQty: number;
    availDate: string;
    buyQtyCalcYn: string;
    price: number;
    statusName: string;
  }
  const cancelDetailInit = () => {
    return {
      ordId: '',
      ordDtm: '',
      updDtm: '',
      ordProdList: [] as ordProdList[],
    };
  };
  const cancelDetail = ref(cancelDetailInit());
  const setCancelDetail = () => {
    if (cancelDetailState.value.result.data) {
      const cancelDetailData = cancelDetailState.value.result.data;
      const { ordId, ordDtm, updDtm } = cancelDetailData[0];

      cancelDetail.value.ordId = ordId;
      cancelDetail.value.ordDtm = ordDtm.slice(0, -9).replaceAll('-', '.');
      cancelDetail.value.updDtm = updDtm.slice(0, -9).replaceAll('-', '.');
      cancelDetail.value.ordProdList = cancelDetailData.map(ordProd => {
        const {
          prodName,
          orgLicense,
          licenseStartdate,
          licenseEnddate,
          buyQty,
          saleCost,
          saleTax,
          status,
          availDate,
          buyQtyCalcYn,
        } = ordProd;
        const result = {
          prodName,
          orgLicense,
          licenseStartdate: licenseStartdate.slice(0, -9).replaceAll('-', '.'),
          licenseEnddate: licenseEnddate.slice(0, -9).replaceAll('-', '.'),
          // price: (saleCost + saleTax) * buyQty,
          buyQty,
          buyQtyCalcYn,
          price: buyQtyCalcYn === 'Y' ? (saleCost + saleTax) * buyQty : saleCost + saleTax,
          statusName: codeOptions.orderDtlStatus.find(code => code.value === status)?.label,
          availDate:
            availDate === '30' ? '월 구독' : availDate === '365' ? '1년 구독' : availDate === '730' ? '2년 구독' : '',
        };
        return result;
      });
    }
  };
  const cannelTableHeads: TableHeaderType[] = [
    { key: 'prodName', name: '제품 정보' },
    { key: 'prodName', name: '사용 기간', width: '240px' },
    { key: 'buyQty', name: '수량', width: '100px' },
    { key: 'saleCost', name: '제품 금액', width: '170px' },
    { key: 'lastStat', name: '진행 상태', width: '110px' },
  ];
  /* #endregion */
  


  /* #region 취소 내역(신청 정보) 테이블 */
  const cancelInfoInit = () => {
    return {
      custName: '',
      email: '',
      payType: '',
      tel: '',
      totCncCost: 0,
      totCost: 0,
    };
  };
  const cancelInfo = ref(cancelInfoInit());
  const setCancelInfo = () => {
    if (cancelInfoState.value.result.data) {
      const cancelInfoData = cancelInfoState.value.result.data;
      const { custName, email, payType, tel, totCncCost, totCost } = cancelInfoData;

      cancelInfo.value.custName = custName;
      cancelInfo.value.email = email;
      cancelInfo.value.payType = codeOptions.payType.find(code => code.value === payType)?.label;
      cancelInfo.value.tel = tel.replace(/\D/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      cancelInfo.value.totCost = totCost;
      cancelInfo.value.totCncCost = totCncCost;
    }
  };
  /* #endregion */




  /* #region 화면 진입 시 초기화 및 실행 */
  const handleBeforeMountInit = () => {
    cancelDetail.value = cancelDetailInit();
    cancelInfo.value = cancelInfoInit();
  };
  const handleBeforeMount = async (): Promise<void> => {
    handleBeforeMountInit();
    await setCodeOptions();
    await setCancelDetailState();
    await setCancelInfoState();
    setCancelDetail();
    setCancelInfo();
  };
  /* #endregion */




  
  return {
    cannelTableHeads,
    handleBeforeMount,
    cancelDetail,
    cancelInfo,
  };
});
