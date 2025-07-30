import { get, getById } from "../../pages/api/fetching";

// Local fallback data
const localServices = [
  {
    id: '1',
    name: 'الفحص الشامل',
    title: 'فحص طبي شامل',
    description: 'فحص طبي شامل لجميع أعضاء الجسم',
    longDescription:
      'يقدم مركزنا فحص طبي شامل يشمل جميع أعضاء الجسم مع تحاليل الدم الشاملة وصور الأشعة اللازمة لتقييم الحالة الصحية العامة.',
    image: '/services/comprehensive-checkup.jpg',
    capabilities: [
      'فحص القلب والأوعية الدموية',
      'فحص الجهاز التنفسي',
      'فحص الجهاز الهضمي',
      'فحص الغدد الصماء',
    ],
    capabilitiesDescription: 'نقدم مجموعة متكاملة من الفحوصات لتقييم صحتك العامة',
    approach: 'نتبع نهجًا شاملاً يركز على الوقاية والتشخيص المبكر للأمراض',
    icon: 'flaticon-health-check',
  },
  {
    id: '2',
    name: 'علاج الأسنان',
    title: 'حزمة العناية بالأسنان',
    description: 'علاج وتجميل الأسنان بأحدث التقنيات',
    longDescription:
      'يقدم قسم الأسنان لدينا جميع خدمات علاج وتجميل الأسنان باستخدام أحدث الأجهزة والتقنيات العالمية.',
    image: '/services/dental-care.jpg',
    capabilities: [
      'حشوات تجميلية',
      'تبييض الأسنان',
      'تركيبات ثابتة ومتحركة',
      'علاج الجذور',
    ],
    capabilitiesDescription: 'جميع علاجات الأسنان بجودة عالية وضمان طويل المدى',
    approach: 'نهتم براحة المريض ونستخدم أحدث التقنيات الخالية من الألم',
    icon: 'flaticon-dental-care',
  },
  {
    id: '3',
    name: 'جراحة العظام',
    title: 'جراحات العظام والمفاصل',
    description: 'علاج إصابات وجراحات العظام والمفاصل',
    longDescription:
      'يقدم فريقنا المتخصص أحدث جراحات العظام والمفاصل بما في ذلك جراحات المناظير واستبدال المفاصل.',
    image: '/services/orthopedic.jpg',
    capabilities: [
      'جراحات المناظير',
      'استبدال المفاصل',
      'علاج كسور العظام',
      'جراحات العمود الفقري',
    ],
    capabilitiesDescription: 'حلول متكاملة لجميع مشاكل العظام والمفاصل',
    approach: 'نستخدم أحدث التقنيات الجراحية لضمان الشفاء السريع',
    icon: 'flaticon-bone',
  },
];

// Utils
const parseJsonField = (field) => {
  try {
    if (typeof field === "string") return JSON.parse(field);
    return Array.isArray(field) ? field : [];
  } catch {
    return [];
  }
};

const normalizeService = (service) => ({
  ...service,
  capabilities: parseJsonField(service.capabilities),
  doctors_ids: parseJsonField(service.doctors_ids),
  branches: parseJsonField(service.branches),
});

// Initial state
const initialState = {
  services: [],
  selectedService: null,
  loading: false,
  error: null,
};

// Action Types
const FETCH_SERVICES_START = "services/fetch_start";
const FETCH_SERVICES_SUCCESS = "services/fetch_success";
const FETCH_SERVICES_ERROR = "services/fetch_error";

const FETCH_SERVICE_BY_ID_START = "services/fetch_by_id_start";
const FETCH_SERVICE_BY_ID_SUCCESS = "services/fetch_by_id_success";
const FETCH_SERVICE_BY_ID_ERROR = "services/fetch_by_id_error";

// Reducer
const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_START:
    case FETCH_SERVICE_BY_ID_START:
      return { ...state, loading: true, error: null };

    case FETCH_SERVICES_SUCCESS:
      return { ...state, loading: false, services: action.payload };

    case FETCH_SERVICE_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedService: action.payload };

    case FETCH_SERVICES_ERROR:
    case FETCH_SERVICE_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default serviceReducer;

// ✅ Thunk: Fetch all services
export const fetchServices = () => async (dispatch) => {
  dispatch({ type: FETCH_SERVICES_START });

  try {
    const data = await get("/services/active");
console.log(data);

    const normalized = Array.isArray(data)
      ? data.map(normalizeService)
      : [];

    dispatch({
      type: FETCH_SERVICES_SUCCESS,
      payload: normalized.length ? normalized : localServices,
    });
  } catch (error) {
    console.error("fetchServices error:", error);
    dispatch({ type: FETCH_SERVICES_SUCCESS, payload: localServices }); // fallback
  }
};

export const fetchServiceById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SERVICE_BY_ID_START });

  try {
    const data = await getById("/services", id);
    console.log("Fetched service:", data);

    const finalData = data && data.id
      ? normalizeService(data)
      : localServices.find((s) => String(s.id) === String(id));

    if (!finalData) throw new Error("Service not found");

    dispatch({ type: FETCH_SERVICE_BY_ID_SUCCESS, payload: finalData });
    return finalData;
  } catch (error) {
    console.error("fetchServiceById error:", error);

    const localService = localServices.find((s) => String(s.id) === String(id));
    if (localService) {
      dispatch({ type: FETCH_SERVICE_BY_ID_SUCCESS, payload: localService });
      return localService;
    }

    dispatch({ type: FETCH_SERVICE_BY_ID_ERROR, payload: error.message });
    throw error;
  }
};

