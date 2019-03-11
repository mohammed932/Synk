import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { SettingProvider } from "../setting/setting";

@Injectable()
export class ApiProvider {
  constructor(
    public http: HttpClient,
    private settingService: SettingProvider
  ) {}

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.settingService.URL}events`);
  }

  createEvent(params): Observable<any> {
    params.user_id = 1;
    return this.http.post(`${this.settingService.URL}create_event`, params);
  }

  showEventById(id): Observable<any> {
    return this.http.get(`${this.settingService.URL}show_event/${id}`);
  }
}
