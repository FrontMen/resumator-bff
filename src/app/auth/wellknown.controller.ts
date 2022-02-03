import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('.well-known')
@Controller('.well-known')
export class WellKnownController {
  // !* this endpoint only for certbot ACME challenge
  @Get('/acme-challenge/L2ocJ1-B1TwoRhchf46RcrVDllmUdvtvMp2q3Ut_29E')
  @Header('content-type', 'text/html')
  async certbotAcmeChallenge(@Query() query: any): Promise<any> {
    return 'L2ocJ1-B1TwoRhchf46RcrVDllmUdvtvMp2q3Ut_29E.s2B09Sc4-eE5gL3NHeyWuY5ogmUczTv5sfuVWxI2t1A';
  }
}
