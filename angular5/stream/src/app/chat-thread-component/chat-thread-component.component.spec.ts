import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChatThreadComponentComponent } from "./chat-thread-component.component";

describe("ChatThreadComponentComponent", () => {
  let component: ChatThreadComponentComponent;
  let fixture: ComponentFixture<ChatThreadComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatThreadComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
