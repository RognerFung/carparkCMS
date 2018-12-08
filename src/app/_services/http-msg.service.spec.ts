import { TestBed } from '@angular/core/testing';

import { HttpMsgService } from './http-msg.service';

describe('HttpMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpMsgService = TestBed.get(HttpMsgService);
    expect(service).toBeTruthy();
  });
});
