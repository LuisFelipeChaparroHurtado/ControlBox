import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from '../services/auth.service';

describe('TokenInterceptor', () => {
  let tokenInterceptor: TokenInterceptor;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    tokenInterceptor = TestBed.inject(TokenInterceptor);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(tokenInterceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const mockToken = 'mock-token';
    authService.getToken.and.returnValue(mockToken);

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jasmine.createSpy('handle').and.returnValue(of({} as HttpEvent<any>))
    };

    tokenInterceptor.intercept(req, next).subscribe();

    expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({
      headers: jasmine.objectContaining({ Authorization: `Bearer ${mockToken}` })
    }));
  });

  it('should not add an Authorization header if no token is present', () => {
    authService.getToken.and.returnValue(null);

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jasmine.createSpy('handle').and.returnValue(of({} as HttpEvent<any>))
    };

    tokenInterceptor.intercept(req, next).subscribe();

    expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({
      headers: req.headers
    }));
  });
});
