import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username:string;
  private password:string;

  constructor(private router:Router, private form:FormsModule, private _userService:UserService) {
  }

  ngOnInit() {
    if(sessionStorage.getItem('user') !== null){
      this.router.navigate(['/home']);
    }
  }

  loginUser(event){
    event.preventDefault();
    console.log(this.username);
    let user = {
      username: this.username,
      password: this.password
    };
    
    this._userService.login(user).subscribe(
      data => { 
        console.log(data);
        if(data != false){
          let temp = JSON.stringify(data);
          sessionStorage.setItem('user', temp);         
          this.router.navigate(['/home']); 
        } else {
          let message = "Your username and password did not match."
          document.getElementById('error').innerHTML = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Oh snap!</strong> '+ message +'</div>';
        }
      },
      error => {
        console.error(error);
      }
    )
  }

}
