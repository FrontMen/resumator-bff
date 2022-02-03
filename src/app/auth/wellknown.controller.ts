import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('.well-known')
@Controller('.wellknown')
export class WellKnownController {
  // !* this endpoint only for certbot SSL verification
  @Get('/acme-challenge/SQ1P6LefGguadKnCbBn4GXetCXb5T-80CArQk6TEdJk')
  @Header('content-type', 'text/html')
  async certbotAcmeChallenge(@Query() query: any): Promise<any> {
    return 'SQ1P6LefGguadKnCbBn4GXetCXb5T-80CArQk6TEdJk.s2B09Sc4-eE5gL3NHeyWuY5ogmUczTv5sfuVWxI2t1A';
  }
}
