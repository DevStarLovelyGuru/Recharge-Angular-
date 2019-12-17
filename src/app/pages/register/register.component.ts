import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { APIService } from '../../services/api.service';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private apiService: APIService
    ) { }

    ngOnInit() {
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                alert('SUCCESS') //this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                alert(error) //this.alertService.error(error);
                this.loading = false;
            });
    }

}



