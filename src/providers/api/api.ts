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
    // params.user_id = 1;
    return this.http.post(`${this.settingService.URL}create_event`, params);
  }

  updateEvent(params): Observable<any> {
    return this.http.post(
      `${this.settingService.URL}update_event/${params.id}`,
      params
    );
  }

  registration(params): Observable<any> {
    return this.http.post(`${this.settingService.URL}register`, params);
  }

  login(params): Observable<any> {
    return this.http.post(`${this.settingService.URL}login`, params);
  }

  showEventById(id): Observable<any> {
    return this.http.get(`${this.settingService.URL}show_event/${id}`);
  }
  createTask(params): Observable<any> {
    return this.http.post(`${this.settingService.URL}create_task`, params);
  }

  goingToEvent(params): Observable<any> {
    return this.http.post(`${this.settingService.URL}going_to_event`, params);
  }
}
