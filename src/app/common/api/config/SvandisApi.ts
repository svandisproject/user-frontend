import {environment} from '../../../../environments/environment';

export class SvandisApi {
    public static readonly API_HOST = environment.production ? '' : 'https://svandis-api.herokuapp.com';
    public static readonly API_VERSION = '';
    public static readonly API_URL = SvandisApi.API_HOST + '/api' + SvandisApi.API_VERSION;
}
