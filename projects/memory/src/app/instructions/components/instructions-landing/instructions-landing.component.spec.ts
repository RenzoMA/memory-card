import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsLandingComponent } from './instructions-landing.component';

describe('InstructionsLandingComponent', () => {
	let component: InstructionsLandingComponent;
	let fixture: ComponentFixture<InstructionsLandingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InstructionsLandingComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(InstructionsLandingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
