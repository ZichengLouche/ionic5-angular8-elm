import { environment } from '../../environments/environment';

/**
 * Andy 2020.3.14 18:18 Oriflame
 */
const localServer = 'http://localhost:5555';
const testServer = 'https://zadvisort.mybluemix.net';
const prodServer = 'http://34.92.79.243';
const proxyServer = 'http://cangdu.org:8001';
const proxyPrefix = '/api';
// const proxyPrefix = '';

const host = environment.apiUrl;

export const Config = {
    SERVICES: {
        BANNER_URL: host + '/assets/data/banner/banner.json',
        ANNUAL_PRODUCTS_URL: host + '/assets/data/product/product.json',
        PRODUCT_DETAIL_URL: host + '/assets/data/product-detail/product-detail.json',
        USERCASES_URL: host + '/assets/data/customer/customer.json',
        OURS_URL: host + '/assets/data/ours/ours.json',
        NEW_PRODUCT_URL: host + '/assets/data/new_products.json',
        HERO_PRODUCT_URL: host + '/assets/data/hero_products.json',
        THEME_URL: host + '/assets/data/theme.json',
        SALES_TOOLS_URL: host + '/assets/data/sales_tools.json',
        CATEGORY_LIST_URL: host + '/assets/data/category/categoryList.json',
        PRODUCT_LIST_URL: host + '/assets/data/category/productList.json',
        SUCCESS_STORY_URL: host + '/assets/data/discover/successStoryList.json',
        KOL_SUGGEST_URL: host + '/assets/data/discover/kolSuggestList.json',
        BEAUTY_TIPS_URL: host + '/assets/data/discover/beautyTipsList.json',
        HEALTH_LIFE_URL: host + '/assets/data/discover/healthLifeList.json',
        H5_INTERACT_URL: host + '/assets/data/discover/h5InteractList.json',
        ORIFLAME_SCHOOL_URL: host + '/assets/data/discover/oriflameSchool.json',
        ABOUT_COMPANY_URL: host + '/assets/data/discover/aboutCompany.json',

        GET_BANNER_LIST: host + '/assets/data/cloud-classroom/banner/banner.json',
        GET_COURSES: host + '/assets/data/cloud-classroom/course/course.json',
        GET_COURSE_INTRODUCTION: host + '/assets/data/cloud-classroom/course/course-introduction.json',
    },
    APIS: {
        GET_CITIES: proxyPrefix + '/v1/cities?type=${type}',
        GET_CITIE_BY_ID: proxyPrefix + '/v1/cities/${id}',
        SEARCH_PLACE: proxyPrefix + '/v1/pois',
        GET_POIS_GEOHASH: proxyPrefix + '/v2/pois/${geohash}',
        GET_MSITE_FOOD_TYPES: proxyPrefix + '/v2/index_entry',
        SEARCH_RESTAURANT: proxyPrefix + '/v4/restaurants',
        GET_SHOP_LIST: proxyPrefix + '/shopping/restaurants',
        GET_CAPTCHAS: proxyPrefix + '/v1/captchas',
        ACCOUNT_LOGIN: proxyPrefix + '/v2/login',
        GET_FOOD_CATEGORY: proxyPrefix + '/shopping/v2/restaurant/category',
        GET_FOOD_DELIVERY: proxyPrefix + '/shopping/v1/restaurants/delivery_modes',
        GET_FOOD_ACTIVITY: proxyPrefix + '/shopping/v1/restaurants/activity_attributes',
        GET_SHOP_DETAILS: proxyPrefix + '/shopping/restaurant/${shopId}',
        GET_FOOD_MENU: proxyPrefix + '/shopping/v2/menu',
        GET_RATING_LIST: proxyPrefix + '/ugc/v2/restaurants/${shopId}/ratings',
        GET_RATING_SCORES: proxyPrefix + '/ugc/v2/restaurants/${shopId}/ratings/scores',
        RATING_TAGS: proxyPrefix + '/ugc/v2/restaurants/${shopId}/ratings/tags',
        GET_REMARK: proxyPrefix + '/v1/carts/${id}/remarks',
        CHECKOUT: proxyPrefix + '/v1/carts/checkout',
        ADDRESS: proxyPrefix + '/v1/users/${userId}/addresses',
        PLACE_ORDERS: proxyPrefix + '/v1/users/${userId}/carts/${cartId}/orders',
        GET_ORDER_LIST: proxyPrefix + '/bos/v2/users/${userId}/orders',
        GET_ORDER_DETAIL: proxyPrefix + '/bos/v1/users/${userId}/orders/${orderId}/snapshot',
        GET_USER_INFO: proxyPrefix + '/v1/user',
        GET_PAY_REQUEST: proxyPrefix + '/payapi/payment/queryOrder',
    }
};
