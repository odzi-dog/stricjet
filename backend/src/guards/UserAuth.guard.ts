import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/Auth/services';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IRequest } from '@app/shared';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) {}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // Getting HTTP context from GraphQL context
    const ctx = GqlExecutionContext.create(context).getContext()
    const { req } = ctx;

    // Validating user token from session object
    ctx.user = await this.validateToken(req);
    if (!ctx.user) {
      throw new HttpException('Invalid or missing Profile Token', HttpStatus.UNAUTHORIZED);
    };
    return true;
  };

  private async validateToken(req: IRequest) {
    return await this.authService.authorize(req.session.token);
  };
}
