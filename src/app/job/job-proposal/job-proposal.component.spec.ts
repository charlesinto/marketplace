import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProposalComponent } from './job-proposal.component';

describe('JobProposalComponent', () => {
  let component: JobProposalComponent;
  let fixture: ComponentFixture<JobProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
