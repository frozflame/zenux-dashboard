import { encodeURL, inferFetchOptions } from "zenux";
import {
    PageData,
    QueryParams,
    translateQueryParams,
    untranslatePageData,
} from "zenux-grid";

export interface APIResponseDict {
    code: number;
    message?: string;
    data?: any;
}

export class Notificator {
    info(content: string) {
        console.log("notificator.info:", content);
    }

    error(content: string) {
        console.log("notificator.error:", content);
    }

    notify(dict: APIResponseDict) {
        console.log(dict.message);
        if (dict.message == null) {
            return;
        }
        if (dict.code) {
            this.error(dict.message);
        } else {
            this.info(dict.message);
        }
    }

    start() {
        return this.notify.bind(this);
    }
}

export interface Userinfo {
    email: string;
    groups: string[];
    nickname: string;
    username: string;
}

export class APIKit {
    notificator: Notificator;

    constructor(notificator: Notificator) {
        this.notificator = notificator;
    }

    getLoginPageURL() {
        const redirect = encodeURL();
        return `/login.html?redirect=${redirect}`;
    }

    checkAPIResponseDict(json: APIResponseDict) {
        this.notificator.notify(json);
        if (json.code === 1 && json.data === "LoginRequired") {
            window.location.replace(this.getLoginPageURL());
        }
        return json;
    }

    async _request(url: string, data?: any): Promise<APIResponseDict> {
        const response = await fetch(url, inferFetchOptions(data));
        if (!response.ok) {
            throw new Error(`failed to fetch from API: ${url}`);
        }
        return await response.json();
    }

    async request(
        url: string,
        data?: any,
        loading?: boolean,
    ): Promise<APIResponseDict> {
        if (!loading) {
            const json = await this._request(url, data);
            return this.checkAPIResponseDict(json);
        }
        const updateNotification = this.notificator.start();
        const json = await this._request(url, data);
        updateNotification(json);
        return json;
    }

    async loadData(url: string, data?: any, loading?: boolean) {
        const json = await this.request(url);
        return json.data;
    }

    async queryPageData(
        subject: string,
        queryParams: QueryParams,
    ): Promise<PageData> {
        const apiQueryParams = translateQueryParams(queryParams);
        const keyword = encodeURIComponent(apiQueryParams.keyword || "");
        const qs = `limit=${apiQueryParams.limit}&skip=${apiQueryParams.skip}&keyword=${keyword}`;
        const url = `/api/search/${subject}?${qs}`;
        return untranslatePageData(
            await this.loadData(url),
            queryParams.pageSize,
        );
    }

    getUserinfoURL() {
        return "/api/userinfo";
    }

    async getUserinfo(
        redirect: boolean = false,
    ): Promise<Userinfo | undefined> {
        const json = await this.request(this.getUserinfoURL());
        if (json.data && json.data.username) {
            return json.data;
        }
        if (redirect) {
            window.location.href = this.getLoginPageURL();
        }
    }
}
