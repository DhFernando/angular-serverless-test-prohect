import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs' 
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js'
import { Router } from '@angular/router'; 

const POOL_DATA = {
  UserPoolId:"us-east-2_BaiPls9Kv",
  ClientId:"5b5a7pn7be0kfmdf4hsbkc7nlm"
}


const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private num = new BehaviorSubject<number>(0);
  private authIsLoading = new BehaviorSubject<boolean>(false);


  registeredUser:CognitoUser;

  cast = this.num.asObservable();
  constructor(private router:Router) { }

  changeNum = (newNum: number) => this.num.next(newNum);
  
  signUp = ( username:string , email:string , password:string ) =>{
    this.authIsLoading.next(true)
    const user = {
      username,
      email,
      password:password
    }
    const attrList : CognitoUserAttribute[] = []
    const usernameAttr = {
      Name : 'email',
      Value : user.email
    }

    attrList.push(new CognitoUserAttribute(usernameAttr))
    attrList.push(new CognitoUserAttribute({
      Name : 'name',
      Value : user.username
    }))
    userPool.signUp(user.email , user.password , attrList , null , (err , result)=>{
      if(err){
        console.log(err)
      }
      else{
        this.registeredUser = result.user
        console.log(this.registeredUser)
      }
    })

  }

  confirmUser = (email:string , code:string)  =>{

    const userData = {
      Pool : userPool,
      Username : email
    }

    const cognitUser = new CognitoUser(userData);
    cognitUser.confirmRegistration(code , true , (err, result)=>{
      if(err){ console.log(err) }
      else{
        console.log(result)
        this.router.navigate(['/test/signin'])
      }
    })

  }

  signIn = (email:string , password: string)=>{
    const authData = {
      Username : email,
      Password : password
    }

    const authDeatails = new AuthenticationDetails(authData);
    const userData = {
      Username : email,
      Pool:userPool
    }

    const cognitoUser = new CognitoUser(userData);
  
    cognitoUser.authenticateUser(authDeatails , {
      onSuccess(result : CognitoUserSession){ console.log(result) },
      onFailure(err){console.log(err)}
    })

  }

  getAuthenticatedUser = () => { return userPool.getCurrentUser(); }
  logOutUser = () =>  this.getAuthenticatedUser().signOut()

  isAuthenticated() :Promise<boolean>{
    return new Promise(async resolve => {
      try {
        const user = await this.getAuthenticatedUser()
        if (user) {
          user.getSession((err , session)=>{
            if(err) { 
              console.log(err)
            }else{
              
              if(session.isValid()){  
                console.log(JSON.parse(atob(session.idToken.jwtToken.split('.')[1])).email )
              }
            }
          })
          resolve(true);
        }
      } catch {
        this.router.navigate(['/test/signin'])
        resolve(false);
      }
    });
  }
  
}
