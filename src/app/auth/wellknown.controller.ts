import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('.well-known')
@Controller('.well-known')
export class WellKnownController {
  // !* this endpoint only for certbot ACME challenge
  @Get('/acme-challenge/CHALLENGE-STRING')
  @Header('content-type', 'text/html')
  async certbotAcmeChallenge(@Query() query: any): Promise<any> {
    return 'RESPONSE-STRING';
  }
}
