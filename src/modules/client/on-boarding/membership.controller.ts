import { Controller } from '@nestjs/common';
import { membershipService } from './membership.service';

@Controller('marketing')
export class MemberShipController {
  constructor(private readonly membershipService: membershipService) {}
}
