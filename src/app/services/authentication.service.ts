
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { UtilService } from '../services/util.service';

var log = console.log

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private util: UtilService
    ) { }

    login(email: string, password: string) {
        return this.http.post('/api/auth', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }



    PassportTokenLogin(token: string) {


        log('http.post(/api/auth/pasport_token, { token: token })')
        return this.http.post('/api/auth/passport_token', { token: token })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                log( 'Service get: ',  response)
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
