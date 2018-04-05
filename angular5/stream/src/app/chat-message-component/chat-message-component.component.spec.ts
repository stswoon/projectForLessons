import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChatMessageComponentComponent } from "./chat-message-component.component";

describe("ChatMessageComponentComponent", () => {
  let component: ChatMessageComponentComponent;
  let fixture: ComponentFixture<ChatMessageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
