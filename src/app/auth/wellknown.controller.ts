import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('.well-known')
@Controller('.wellknown')
export class WellKnownController {
  // !* this endpoint only for certbot SSL verification
  @Get('/acme-challenge/inJyQ1Xgr93V_QGgvIaJjmyE-AzAOF0ffP_8SDBuj8g')
  @Header('content-type', 'text/html')
  async certbotAcmeChallenge(@Query() query: any): Promise<any> {
    return 'inJyQ1Xgr93V_QGgvIaJjmyE-AzAOF0ffP_8SDBuj8g.s2B09Sc4-eE5gL3NHeyWuY5ogmUczTv5sfuVWxI2t1A';
  }
}
