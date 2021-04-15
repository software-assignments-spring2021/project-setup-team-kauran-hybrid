// https://momentjs.com/
import * as moment from "moment";

@Injectable()
export class AuthService {
    
    /**
     * Gives us access to the Angular HTTP client so we can make requests to 
     * our Express app
     */
    constructor(private http: HttpClient) {}
    
    /**
     * Passes the username and password that the user typed into the application
     * and sends a POST request to our Express server login route, which will
     * authenticate the credentials and return a JWT token if they are valid
     * 
     * The `res` object (has our JWT in it) is passed to the setLocalStorage
     * method below
     * 
     * shareReplay() documentation - https://www.learnrxjs.io/operators/multicasting/sharereplay.html
     */
    login(email:string, password:string ) {
        return this.http.post<User>('/users/login', {email, password})
            .do(res => this.setLocalStorage) 
            .shareReplay();
    }
    
    private setLocalStorage(authResult) {
        
        // Takes the JWT expiresIn value and add that number of seconds
        // to the current "moment" in time to get an expiry date
        const expiresAt = moment().add(authResult.expiresIn,'second');
        
        // Stores our JWT token and its expiry date in localStorage
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }
    
    // By removing the token from localStorage, we have essentially "lost" our
    // JWT in space and will need to re-authenticate with the Express app to get
    // another one.
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }
    
    // Returns true as long as the current time is less than the expiry date
    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }
    
    isLoggedOut() {
        return !this.isLoggedIn();
    }
    
    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}

// Note: We will eventually incorporate this into our app.module.ts so that it
// automatically works on all HTTP requests
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("id_token");
        
        if (idToken) {
            
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });
            
            return next.handle(cloned);
            
        } else {
            return next.handle(req);
        }
        
    }
}