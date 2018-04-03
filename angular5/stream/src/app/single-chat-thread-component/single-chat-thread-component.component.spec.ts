import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SingleChatThreadComponentComponent } from "./single-chat-thread-component.component";

describe("SingleChatThreadComponentComponent", () => {
  let component: SingleChatThreadComponentComponent;
  let fixture: ComponentFixture<SingleChatThreadComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChatThreadComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChatThreadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
