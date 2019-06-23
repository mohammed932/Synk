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

  signUp(params): Observable<any> {
    return this.http.post(`${this.settingService.URL}register`, params);
  }

  signIn(params): Observable<any> {
    return this.http.post(`${this.settingService.URL}login`, params);
  }

  createEvent(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/events`,
      params
    );
  }

  updateUser(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.put(`${this.settingService.URL}users/${userId}`, params);
  }

  updateNotification(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.put(
      `${this.settingService.URL}users/${userId}/notifications/${
        params.notificationId
      }`,
      params
    );
  }

  changePassword(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.put(
      `${this.settingService.URL}users/${userId}/change_password`,
      params
    );
  }

  setDeviceToken(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.put(`${this.settingService.URL}users/${userId}`, params);
  }

  inviteFriendsToEvent(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/events/${
        params.eventId
      }/invitations`,
      params
    );
  }

  createTask(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/events/${
        params.eventId
      }/tasks`,
      params
    );
  }

  countUnseenNotifications(): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${this.settingService.URL}users/${userId}/notifications/count`
    );
  }

  chooseTask(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/events/${
        params.eventId
      }/tasks/${params._id}/choose_task`,
      params
    );
  }

  makeGoing(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/events/${params._id}/goings`,
      params
    );
  }

  inviteFriendsForEvent(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/events/${
        params.eventId
      }/invitations`,
      params
    );
  }

  getUserContacts(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/friends/add_friends`,
      params
    );
  }

  inviteFriend(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/friends/invite_friends_sms`,
      params
    );
  }

  friendRequest(friendId): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${this.settingService.URL}users/${userId}/friend_requests/${friendId}`,
      {}
    );
  }

  acceptRequest(requestId): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${
        this.settingService.URL
      }users/${userId}/friend_requests/accept/${requestId}`,
      {}
    );
  }

  getEventTasks(eventId): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${this.settingService.URL}users/${userId}/events/${eventId}`
    );
  }

  getEvents(page, limit): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${
        this.settingService.URL
      }users/${userId}/events?page=${page}&limit=${limit}`
    );
  }

  getFriendRequests(): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${this.settingService.URL}users/${userId}/friend_requests`
    );
  }

  getSynkedEvents(): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${this.settingService.URL}users/${userId}/synced_events`
    );
  }
  userProfile(): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(`${this.settingService.URL}users/${userId}`);
  }

  userSpecificProfile(userId): Observable<any> {
    return this.http.get(`${this.settingService.URL}users/${userId}`);
  }

  suggestionFriends(): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${this.settingService.URL}users/${userId}/suggested_friends`
    );
  }

  updateEvent(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.put(
      `${this.settingService.URL}users/${userId}/events/${params._id}`,
      params
    );
  }

  eventGoings(eventId): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${this.settingService.URL}users/${userId}/events/${eventId}/goings`
    );
  }

  searchFriends(search): Observable<any> {
    return this.http.get(`${this.settingService.URL}users/find/${search}`);
  }

  getUserNotifications(page, limit): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${
        this.settingService.URL
      }users/${userId}/notifications?page=${page}&limit=${limit}`
    );
  }

  unSync(eventId): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(
      `${
        this.settingService.URL
      }users/${userId}/events/${eventId}/goings/cancel`,
      {}
    );
  }

  forgetPassword(params): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.post(`${this.settingService.URL}forget_password`, params);
  }

  searchEvents(title): Observable<any> {
    let userId = localStorage.getItem("userId");
    return this.http.get(
      `${this.settingService.URL}users/${userId}/events?title=${title}`
    );
  }
}
